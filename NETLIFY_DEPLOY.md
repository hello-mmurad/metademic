# Deploy Metademic to Netlify

This project is configured as a native Next.js App Router application for Netlify.
Netlify will apply its current OpenNext adapter automatically.

## Recommended deployment

1. Push the contents of this folder to a GitHub repository.
2. In Netlify, choose **Add new project / Import an existing project** and select the repository.
3. Netlify should detect Next.js automatically. The committed settings are:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node.js: `22`
4. Add the required production environment variable:
   - `NEXT_PUBLIC_SITE_URL=https://YOUR-DOMAIN`
5. Add any optional integration variables you actually use from `.env.example`.
   Keep `GITHUB_TOKEN` private and do not commit it.
6. Deploy.

## Important environment variables

At minimum, set `NEXT_PUBLIC_SITE_URL` to the final production origin so metadata,
canonical URLs, sitemap and robots output do not use the localhost fallback.

Optional variables are documented in `.env.example`. Values beginning with
`NEXT_PUBLIC_` are public browser-visible configuration. `GITHUB_TOKEN` and
`BLOG_FEED_URL` are server-side values.

## Custom domain

After the first successful deploy, add your domain under Netlify's domain settings.
Then make sure `NEXT_PUBLIC_SITE_URL` exactly matches the canonical HTTPS domain and
trigger a fresh production deploy.

## Local checks

```bash
npm install
npm run typecheck
npm run build
npm run dev
```

Then open `http://localhost:3000`.
