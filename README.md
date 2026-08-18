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

This is a Vinext/Cloudflare app. Deploy it through Cloudflare Pages, Cloudflare Workers, or OpenAI Sites. GitHub Pages only serves static files and cannot run the Vinext server or Supabase-backed account flow directly.

## Editing the story

The GitHub repository is the editable source of truth. Story chapters are in `app/storyContent.ts`; update that file, then rebuild and publish the site through the configured Vinext/Cloudflare deployment. The public site is intentionally separate from GitHub Pages so the interactive reader, audio effects, and Supabase account features continue to work.

