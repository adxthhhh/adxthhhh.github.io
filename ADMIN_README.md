Decap (Netlify) CMS admin — setup notes
=====================================

This repository includes a lightweight Decap (Netlify) CMS admin panel at `/admin` which writes Markdown files to `public/blog` and uploads media to `public/uploads`.

Quick setup steps
1. Deploy the OAuth proxy
   - Repository: https://github.com/netlify/netlify-cms-oauth-provider
   - Deploy to Render, Vercel, or any host that supports Node. Set `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` in the environment.

2. Create a GitHub OAuth App
   - Go to: https://github.com/settings/developers -> OAuth Apps -> New OAuth App
   - Homepage URL: `https://adxthhhh.github.io`
   - Authorization callback URL: `https://<your-proxy>/auth`

3. Update `/admin/config.yml`
   - Replace `auth_endpoint` with your deployed proxy URL.

4. Open the admin panel
   - Visit `https://adxthhhh.github.io/admin/` and sign in via GitHub to create posts.

Notes
- The blog listing expects a `public/blog/posts.json` manifest. The CMS does not generate this automatically; you can maintain it manually or add a CI job to regenerate it when posts change.
