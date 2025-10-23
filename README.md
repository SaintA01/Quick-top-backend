# QuickTop Backend

A complete backend for the QuickTop mobile app with authentication, wallet, and service purchase functionality.

## Features
- User authentication (login/signup)
- Wallet balance management
- Airtime purchase
- Data bundle purchase
- JWT-based security

## Deployment to Vercel

### Step 1: Prepare Files
1. Create all the files above in a new folder
2. Make sure the folder structure matches exactly

### Step 2: Deploy to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
