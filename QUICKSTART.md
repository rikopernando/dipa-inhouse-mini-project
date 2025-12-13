# ⚡ Quick Start Guide

Get CineTrack running in 5 minutes!

## 📦 What You Need

1. **Node.js** - [Download here](https://nodejs.org/) (version 18 or newer)
2. **Yarn** - Install with: `npm install -g yarn`
3. **TMDB Account** - [Sign up for free](https://www.themoviedb.org/signup)

## 🚀 5-Minute Setup

### Step 1: Get Your TMDB API Token (2 minutes)

1. Go to [TMDB](https://www.themoviedb.org/) and sign up
2. Verify your email
3. Go to [Settings → API](https://www.themoviedb.org/settings/api)
4. Click "Request an API Key"
5. Select "Developer" option
6. Fill out the form (use "Personal Project" for non-commercial)
7. **Copy your "API Read Access Token"** (the long Bearer token, not the API Key!)

### Step 2: Clone & Install (1 minute)

```bash
# Clone the repository
git clone <your-repository-url>
cd dipa-inhouse-mini-project

# Install dependencies
yarn install
```

### Step 3: Configure Environment (1 minute)

```bash
# Copy the example environment file
cp .env.example .env.local

# Open .env.local and paste your TMDB token
# Your .env.local should look like this:
NEXT_PUBLIC_TMDB_KEY=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJ... (your token here)
NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
```

**Mac/Linux:**

```bash
nano .env.local  # or use your favorite editor
```

**Windows:**

```bash
notepad .env.local
```

### Step 4: Run the App! (1 minute)

```bash
# Start the development server
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**You should see:**

- ✅ Popular movies grid
- ✅ Search bar
- ✅ Theme toggle button
- ✅ Movie cards with posters

## ✅ Verification Checklist

- [ ] App loads at localhost:3000
- [ ] Movie posters appear (not broken images)
- [ ] Search works when you type
- [ ] Theme toggle works (sun/moon icon in header)
- [ ] Clicking a movie shows detail page
- [ ] Pagination buttons work

## ❌ Common Issues

### Issue: "Module not found" or build errors

**Solution:**

```bash
# Delete node_modules and reinstall
rm -rf node_modules .next
yarn install
yarn dev
```

### Issue: No movies showing / broken images

**Problem:** Wrong API token

**Solution:**

1. Check `.env.local` has the **Bearer token** (starts with `eyJ...`)
2. NOT the "API Key (v3 auth)"
3. Make sure there are no extra spaces
4. Restart the dev server after changing `.env.local`

### Issue: "Failed to fetch" errors

**Problem:** API token invalid or rate limit

**Solution:**

1. Go to [TMDB Settings](https://www.themoviedb.org/settings/api)
2. Regenerate API Read Access Token
3. Update `.env.local`
4. Clear browser cache (Ctrl+Shift+Delete / Cmd+Shift+Delete)

### Issue: Port 3000 already in use

**Solution:**

```bash
# Kill the process using port 3000
# Mac/Linux:
lsof -ti:3000 | xargs kill

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# Or use a different port:
PORT=3001 yarn dev
```

## 🎓 Next Steps

Now that your app is running:

1. **Explore the Code**
   - `app/page.tsx` - Home page
   - `components/` - UI components
   - `hooks/` - Custom React hooks

2. **Read the Docs**
   - [README.md](README.md) - Full documentation
   - [ARCHITECTURE.md](ARCHITECTURE.md) - How it works
   - [docs/API.md](docs/API.md) - API integration details

3. **Make Changes**
   - Try editing `app/page.tsx`
   - Changes auto-reload in browser
   - Check browser console for errors

4. **Build for Production**
   ```bash
   yarn build
   yarn start
   ```

## 🎨 Customization Quick Wins

### Change App Title

Edit `app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: {
    default: 'Your App Name Here',
  },
  // ...
};
```

### Change Theme Colors

Edit `app/globals.css`:

```css
:root {
  --primary: oklch(0.5 0.2 250); /* Change to your color */
}
```

### Change Movies Per Page

Edit `lib/constants.ts`:

```typescript
export const GRID_CONFIG = {
  MOVIE_GRID: { sm: 2, md: 3, lg: 5 }, // Change numbers
};
```

## 📚 Learning Resources

### Next.js

- [Next.js Tutorial](https://nextjs.org/learn) - Official tutorial
- [App Router Docs](https://nextjs.org/docs/app) - App Router guide

### React

- [React Docs](https://react.dev/) - Official docs
- [React Hooks](https://react.dev/reference/react) - Hooks reference

### TypeScript

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript with React](https://react-typescript-cheatsheet.netlify.app/)

### Tailwind CSS

- [Tailwind Docs](https://tailwindcss.com/docs) - Official docs
- [Tailwind Playground](https://play.tailwindcss.com/) - Try it online

## 🆘 Need Help?

1. **Check the console** - Browser DevTools (F12) shows errors
2. **Check terminal** - Development server shows errors
3. **Read error messages** - They usually tell you what's wrong
4. **Google the error** - Someone probably solved it already
5. **Ask for help** - Open an issue on GitHub

## 🎉 Success!

If you got this far, you're running CineTrack!

**What's Next?**

- Try the search feature
- Toggle dark mode
- Click on movies to see details
- Check out the code and learn how it works
- Make it your own!

Happy coding! 🚀
