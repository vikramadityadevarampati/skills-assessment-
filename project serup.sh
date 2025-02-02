# Create a new Next.js 13 project
npx create-next-app@latest firebase-emulator-app
cd firebase-emulator-app

# Install dependencies
npm install firebase tailwindcss
npx tailwindcss init -p

# Install Firebase CLI globally (if not installed)
npm install -g firebase-tools

# Initialize Firebase Emulators
firebase init emulators
