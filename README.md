## 👉 Get Started

Install dependencies

```
yarn install
```

Update your `.env` file with values for each environment variable

```
API_KEY=...
```

Run your local database

_Note: Local database is powered by [json-server](https://github.com/typicode/json-server) and writes to `db.json`. It's just for prototyping. You'll need to update `api/_db.js` and connect to your database of choice before deployment._

```
yarn json-server
```

Run the development server

```
yarn dev
```

When the above command completes you'll be able to view your website at `http://localhost:3000`

## 📚 Guide

<b>Deployment</b>
Install the Vercel CLI

```
npm install -g vercel
```

Link codebase to a Vercel project

```
vercel link
```

Add each variable from your `.env` file to your Vercel project, including the ones prefixed with "NEXT_PUBLIC\_". You'll be prompted to enter its value and choose one or more environments (development, preview, or production). See <a target="_blank" href="https://vercel.com/docs/environment-variables">Vercel Environment Variables</a> to learn more about how this works, how to update values through the Vercel UI, and how to use secrets for extra security.

```
vercel env add plain VARIABLE_NAME
```

Run this command to deploy to a unique preview URL. Your "preview" environment variables will be used.

```
vercel
```

Run this command to deploy to your production domain. Your "production" environment variables will be used.

```
vercel --prod
```

See <a target="_blank" href="https://vercel.com/docs/platform/deployments">Vercel Deployments</a> for more details.
