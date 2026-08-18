# When Tomorrow Remembers

Interactive story archive for Book 1.

## Run locally

```bash
npm install
npm run dev
```

## Supabase setup

1. Copy `.env.example` to `.env.local`.
2. Add the Supabase publishable key from Project Settings → API.
3. Run `supabase/migrations/001_reader_progress.sql` and `supabase/migrations/002_reader_profiles.sql` in the Supabase SQL editor.
4. Keep email confirmations enabled in Authentication → Providers → Email.

The site uses Supabase Auth for email/password sign-up and confirmation, and the `reader_progress` table for cross-device reading progress. Never place a service-role key in client code.

## Deployment

This project is configured for GitHub Pages. Every push to the `main` branch runs the static build and deploys the website to `https://sereiatalia.github.io/When-Tomorrow-Remembers/`.

## Editing the story

The GitHub repository is the editable source of truth. Story chapters are in `app/storyContent.ts`; update that file and push to `main`. GitHub Pages will rebuild and publish the site automatically. The reader, animations, audio, and Supabase browser authentication work in the static deployment. To enable Supabase sign-in, add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` as repository variables in GitHub Settings → Secrets and variables → Actions.

