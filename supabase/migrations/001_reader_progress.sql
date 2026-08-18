create table if not exists public.reader_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  username text,
  book_number integer not null default 1,
  chapter_key text not null default 'Prologue',
  progress_percent integer not null default 0 check (progress_percent between 0 and 100),
  updated_at timestamptz not null default now()
);

alter table public.reader_progress enable row level security;

create policy "Readers can view their own progress"
  on public.reader_progress for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Readers can create their own progress"
  on public.reader_progress for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Readers can update their own progress"
  on public.reader_progress for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

