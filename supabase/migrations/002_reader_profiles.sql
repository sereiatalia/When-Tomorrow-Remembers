-- Keeps the username collected by the archive signup flow alongside auth.users.
-- Run this migration in the Supabase SQL editor after 001_reader_progress.sql.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "Readers can view their own profile" on public.profiles;
create policy "Readers can view their own profile"
  on public.profiles for select
  to authenticated
  using ((select auth.uid()) = id);

drop policy if exists "Readers can update their own profile" on public.profiles;
create policy "Readers can update their own profile"
  on public.profiles for update
  to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

create or replace function public.handle_new_reader()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, username, full_name, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data ->> 'username',
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do update set username = excluded.username;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_reader on auth.users;
create trigger on_auth_user_created_reader
  after insert on auth.users
  for each row execute procedure public.handle_new_reader();

