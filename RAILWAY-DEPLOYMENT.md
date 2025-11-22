# Railway Deployment Guide for Lustro Solutions Co.

## 🚂 Railway-Specific Setup

Since you're using Railway, here are the specific steps and considerations:

### Key Differences from Vercel/Netlify:

1. **Static File Serving**: Railway needs a server to serve static files (we use Node.js + Express)
2. **Clean URLs**: Handled by the Express server routing
3. **Configuration**: Uses `railway.json` and `nixpacks.toml`

## 📋 Pre-Deployment Checklist

### 1. Rename Files
```bash
# Rename the new files to replace old ones
mv index-new.html index.html
mv sitemap-new.xml sitemap.xml
mv robots-new.txt robots.txt
mv end-of-tenancy-cleaning-new end-of-tenancy-cleaning
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Test Locally
```bash
npm start
# Server will run on http://localhost:3000
```

## 🚀 Railway Deployment Steps

### Option 1: Deploy via Railway Dashboard

1. **Go to Railway Dashboard**: https://railway.app
2. **Select your project** (Lustro Solutions Co)
3. **Go to Settings** → **Service Settings**
4. **Update Build Settings**:
   - Build Command: `npm install`
   - Start Command: `npm start`
5. **Update Configuration**:
   - Rename `railway-static.json` to `railway.json`
   - Rename `nixpacks-static.toml` to `nixpacks.toml`
6. **Deploy**: Railway will automatically detect changes and deploy

### Option 2: Deploy via Railway CLI

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link to your project
railway link

# Deploy
railway up
```

## 🔧 Railway Configuration Files

### `railway.json` (Static Site Version)
- Uses Node.js instead of PHP
- Health check endpoint: `/health`
- Start command: `npm start`

### `nixpacks.toml` (Static Site Version)
- Installs Node.js 18
- Runs `npm install`
- Starts with `npm start`

### `server.js`
- Express static file server
- Handles clean URLs (no .html)
- Serves files from root directory
- Health check endpoint for Railway

## 📁 File Structure for Railway

```
/
├── index.html (renamed from index-new.html)
├── server.js (Node.js static server)
├── package.json (Node.js dependencies)
├── railway.json (Railway config - rename from railway-static.json)
├── nixpacks.toml (Railway build config - rename from nixpacks-static.toml)
├── sitemap.xml (renamed from sitemap-new.xml)
├── robots.txt (renamed from robots-new.txt)
├── logo.png
├── favicon.png
├── end-of-tenancy-cleaning/
│   └── index.html
├── deep-cleaning/ (to be created)
│   └── index.html
└── ... (other service pages)
```

## ✅ Railway-Specific Features

### Clean URLs
The `server.js` automatically handles clean URLs:
- `/end-of-tenancy-cleaning` → serves `/end-of-tenancy-cleaning/index.html`
- `/deep-cleaning` → serves `/deep-cleaning/index.html`
- No `.html` in the URL

### Health Checks
Railway uses `/health` endpoint to check if the server is running.

### Environment Variables
Set in Railway dashboard:
- `NODE_ENV=production`
- `PORT` (automatically set by Railway)

## 🔄 Migration from PHP to Static

If you're currently using PHP on Railway:

1. **Backup current setup** (git commit everything first)
2. **Rename configuration files**:
   ```bash
   mv railway-static.json railway.json
   mv nixpacks-static.toml nixpacks.toml
   ```
3. **Install Node.js dependencies**:
   ```bash
   npm install
   ```
4. **Test locally**:
   ```bash
   npm start
   ```
5. **Deploy to Railway** - it will automatically detect the new setup

## 📊 Monitoring

Railway provides:
- **Logs**: View in Railway dashboard
- **Metrics**: CPU, Memory, Network usage
- **Health Checks**: Automatic via `/health` endpoint

## 🐛 Troubleshooting

### Server won't start
- Check Railway logs in dashboard
- Verify `package.json` has correct start script
- Ensure `server.js` exists and is executable

### Clean URLs not working
- Verify `server.js` routing logic
- Check that service folders have `index.html` files
- Test locally first with `npm start`

### Static files not loading
- Check file paths (should be relative to root)
- Verify files exist in repository
- Check Railway build logs

## 🎯 Post-Deployment

1. **Test all pages**:
   - Homepage: `https://your-domain.railway.app/`
   - Service pages: `https://your-domain.railway.app/end-of-tenancy-cleaning`
   
2. **Verify clean URLs** work (no .html in address bar)

3. **Check health endpoint**: `https://your-domain.railway.app/health`

4. **Submit sitemap to Google Search Console**

5. **Test forms** (Formspree should work as-is)

## 📝 Notes

- Railway automatically handles HTTPS
- Custom domain can be added in Railway settings
- Railway provides automatic deployments on git push
- No build step needed (pure static files + simple server)

---

**Ready to deploy?** Follow the steps above and your new static site will be live on Railway!

