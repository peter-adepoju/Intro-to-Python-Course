# Setting up Python Atlas

The site works straight away on GitHub Pages with no accounts: lessons, the Python console, X-ray, exercises, quizzes, review and the playground all run in the learner's browser, and progress is saved on their device. This guide switches on the optional parts: **accounts** (progress on every device) and the **AI tutor**. Everything uses free tiers.

## 1. Publish the site (GitHub Pages)

1. In the repository on GitHub: **Settings → Pages**.
2. Source: **Deploy from a branch**, branch `main`, folder `/docs`.
3. The site appears at `https://peter-adepoju.github.io/intro-to-python-course/`.

The workflow in `.github/workflows/build.yml` rebuilds `docs/` whenever anything in `course/` changes, after checking every exercise.

## 2. Accounts with Supabase

1. Create a free project at [supabase.com](https://supabase.com). (You can reuse the MAMBA project, but a separate one keeps the two courses' users apart.)
2. **SQL Editor → New query**: paste all of `supabase/schema.sql` and press **Run**.
3. **Project Settings → API**: copy the **Project URL** and the **anon public** key into `course/static/config.js`:

   ```js
   supabaseUrl: "https://xxxx.supabase.co",
   supabaseAnonKey: "eyJ...",
   ```

   The anon key is designed to be public; the database rules in `schema.sql` make sure each learner can only read and write their own rows.
4. **Authentication → URL Configuration**:
   - Site URL: `https://peter-adepoju.github.io/intro-to-python-course/`
   - Redirect URLs: add `https://peter-adepoju.github.io/intro-to-python-course/**`
5. **Authentication → Providers → Email**: leave on. Confirming email addresses is recommended.
6. **Google sign-in** (optional): in Google Cloud Console create an OAuth client (type: Web application) with the redirect URI that Supabase shows under **Authentication → Providers → Google**, then paste the client ID and secret into Supabase and switch Google on.

Commit `config.js`; the workflow rebuilds the site.

## 3. The AI tutor

The tutor is a Supabase Edge Function (`supabase/functions/tutor`) that calls a free language-model API. Learners must be signed in to use it, and each has a daily limit (40 by default) so a free quota is shared fairly.

1. Get a free API key from [Google AI Studio](https://aistudio.google.com/apikey). Check there which models your key can use for free.
2. In Supabase: **Edge Functions → Deploy a new function → Via editor**, name it `tutor`, paste `supabase/functions/tutor/index.ts`, deploy. (Or with the Supabase CLI: `supabase functions deploy tutor`.)
3. **Edge Functions → Secrets**, add:
   - `GEMINI_API_KEY`: your key
   - `GEMINI_MODEL` (optional): a free model id from AI Studio; the default is `gemini-flash-lite-latest`
   - `DAILY_LIMIT` (optional): questions per learner per day
4. Optional fallback for when Gemini's free quota runs out: any OpenAI-compatible API with a free tier (for example Groq or OpenRouter's free models). Set `FALLBACK_API_URL`, `FALLBACK_API_KEY` and `FALLBACK_MODEL` (a model name from that provider's current list).

Things to know about free tiers:

- Free quotas are small and change often. With many learners, raise the limit by adding a paid key later; nothing else changes.
- Google may use free-tier prompts to improve its products, and its free tier isn't offered for users in the EEA, Switzerland or the UK. The tutor only sends the learner's question, the lesson name and the code/error they chose to share.
- If no tutor is configured, the tutor panel still offers a structured "explain it line by line" routine instead of failing.

## 4. Running it on your own computer

```bash
pip install markdown pyyaml
python course/validate.py     # checks every solution and example
python course/build.py        # writes docs/
python -m http.server -d docs 8000
```

Then open http://localhost:8000.
