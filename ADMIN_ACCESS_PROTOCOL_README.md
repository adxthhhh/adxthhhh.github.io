# Admin Access Protocol Fix (Decap CMS + GitHub OAuth)

This repository uses Decap CMS at `/admin` with GitHub OAuth. If admin login fails, the problem is usually the OAuth proxy or `auth_endpoint` configuration.

## Current setup in this repo
- Admin UI: `/admin/index.html`
- CMS config: `/admin/config.yml`
- Backend: `github` on `adxthhhh/adxthhhh.github.io` (`main` branch)
- Current OAuth endpoint value: `https://netlify-cms-github-oauth-provider-plum.vercel.app`

## Fix checklist

1. **Verify OAuth proxy is deployed and healthy**
   - Use a deployed instance of `netlify-cms-oauth-provider`.
   - Required env vars on the proxy:
     - `GITHUB_CLIENT_ID`
     - `GITHUB_CLIENT_SECRET`
   - Confirm the proxy exposes the auth route at:
     - `https://<your-proxy-domain>/auth`

2. **Fix GitHub OAuth App settings**
   - In GitHub Developer Settings → OAuth Apps:
     - **Homepage URL**: `https://adxthhhh.github.io`
     - **Authorization callback URL**: `https://<your-proxy-domain>/callback`
   - Ensure these values exactly match the deployed protocol/domain (`https`, no typos).

3. **Fix `auth_endpoint` in `/admin/config.yml`**
   - Set:
     - `backend.auth_endpoint: "https://<your-proxy-domain>/auth"`
   - If your provider expects a different path, use that exact path from provider docs.

4. **Validate repository and branch access**
   - OAuth app/user must have permission to write to `adxthhhh/adxthhhh.github.io`.
   - `backend.repo` and `backend.branch` in config must match the real target repo/branch.

5. **Test login flow**
   - Open `https://adxthhhh.github.io/admin/`
   - Click login and complete GitHub auth.
   - Confirm CMS can create/edit files in `public/blog`.

## Common failure patterns
- **Redirect URI mismatch**: callback URL in GitHub OAuth app does not match proxy callback exactly.
- **Wrong protocol**: `http` vs `https` mismatch in homepage/callback/auth endpoint.
- **Missing `/auth` path**: `auth_endpoint` points to proxy root instead of auth route.
- **Missing proxy env vars**: proxy starts but cannot complete OAuth handshake.
- **Repo permission issue**: authenticated account cannot push to target branch.

## Optional local test mode (no OAuth)
For local UI testing only:
- Uncomment `local_backend: true` in `/admin/config.yml`
- Run the site locally and open `http://localhost:5173/admin/`
- Re-comment `local_backend: true` before committing.
