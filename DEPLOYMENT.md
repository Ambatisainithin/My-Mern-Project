# Deployment Guide

## Prerequisites
- GitHub account
- Vercel account (sign up with GitHub)
- Render account (sign up with GitHub)
- MongoDB Atlas database URL
- Gmail account with App Password

## Part 1: Deploy Backend to Render

### Step 1: Prepare Your Backend Repository

1. **Create a new GitHub repository** for the backend (or use existing one)
2. **Push your backend code** to GitHub:

```bash
cd Vehicle_Backend_Server
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### Step 2: Deploy on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `honda-service-backend` (or your choice)
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: Leave empty (or `Vehicle_Backend_Server` if repo has multiple folders)
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

5. **Add Environment Variables** (click "Advanced" → "Add Environment Variable"):
   ```
   MONGO_URL=your_mongodb_connection_string
   EMAIL_USER=your_gmail_address
   EMAIL_PASS=your_16_char_app_password_without_spaces
   JWT_SECRET=your_random_secret_key_here
   ADMIN_EMAILS=admin@example.com
   CLIENT_ORIGIN=*
   PORT=10000
   ```

6. Click **"Create Web Service"**

7. Wait for deployment to complete (5-10 minutes)

8. **Copy your backend URL** (e.g., `https://honda-service-backend.onrender.com`)

**Important Note**: Render free tier spins down after 15 minutes of inactivity. First request after inactivity may take 30-60 seconds.

---

## Part 2: Deploy Frontend to Vercel

### Step 1: Prepare Your Frontend Repository

1. **Create a new GitHub repository** for frontend (or use existing one)
2. **Push your frontend code** to GitHub:

```bash
cd react
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New"** → **"Project"**
3. **Import** your GitHub repository
4. Configure project:
   - **Framework Preset**: Vite
   - **Root Directory**: Leave as `./` (or `react` if repo has multiple folders)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. **Add Environment Variable**:
   - Click **"Environment Variables"**
   - Add:
     ```
     VITE_API_URL=https://your-backend-url.onrender.com
     ```
     (Replace with your actual Render backend URL from Part 1, Step 8)

6. Click **"Deploy"**

7. Wait for deployment (2-3 minutes)

8. **Copy your frontend URL** (e.g., `https://your-app.vercel.app`)

---

## Part 3: Update Backend CORS

After deploying frontend, update your backend environment variables on Render:

1. Go to Render Dashboard → Your Web Service
2. Click **"Environment"**
3. Update `CLIENT_ORIGIN` to your Vercel URL:
   ```
   CLIENT_ORIGIN=https://your-app.vercel.app
   ```
4. Click **"Save Changes"**
5. Service will automatically redeploy

---

## Testing Your Deployment

1. Visit your Vercel frontend URL
2. Try signing up with a new account
3. Check if you receive the confirmation email
4. Login and create a booking
5. Login as admin (using ADMIN_EMAILS) to manage bookings

---

## Troubleshooting

### Backend Issues

**Problem**: "Application failed to respond"
- **Solution**: Check Render logs, ensure all environment variables are set correctly

**Problem**: Database connection error
- **Solution**: Verify MONGO_URL, ensure MongoDB Atlas allows connections from anywhere (0.0.0.0/0)

**Problem**: Emails not sending
- **Solution**: Verify EMAIL_USER and EMAIL_PASS, ensure 2-Step Verification is enabled on Gmail

### Frontend Issues

**Problem**: API requests failing
- **Solution**: Check VITE_API_URL is set correctly, verify backend is deployed and running

**Problem**: CORS errors
- **Solution**: Update CLIENT_ORIGIN on Render to match your Vercel URL

**Problem**: Build fails
- **Solution**: Check build logs on Vercel, ensure all dependencies are in package.json

---

## Free Tier Limitations

### Render Free Tier:
- Spins down after 15 minutes of inactivity
- First request after spin-down takes 30-60 seconds
- 750 hours/month (sufficient for one service)

### Vercel Free Tier:
- 100 GB bandwidth/month
- Unlimited projects
- Auto-scaling

---

## Custom Domain (Optional)

### For Vercel:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

### For Render:
1. Go to Service Settings → Custom Domains
2. Add your custom domain
3. Update DNS records as instructed

---

## Environment Variables Summary

### Backend (.env)
```
MONGO_URL=mongodb+srv://...
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=16-char-app-password
JWT_SECRET=random-secret-key
ADMIN_EMAILS=admin@example.com
CLIENT_ORIGIN=https://your-app.vercel.app
PORT=10000
```

### Frontend (.env)
```
VITE_API_URL=https://your-backend.onrender.com
```

---

## Maintenance

- **Render**: Logs available in Dashboard → Your Service → Logs
- **Vercel**: Logs available in Project → Deployments → Click deployment → View Function Logs
- **MongoDB Atlas**: Monitor usage in Atlas Dashboard

---

## Support

If you encounter issues:
1. Check deployment logs
2. Verify environment variables
3. Test API endpoints using Postman/Thunder Client
4. Check browser console for frontend errors
