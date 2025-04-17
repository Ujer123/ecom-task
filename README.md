# E-Commerce Store Readme

## 🚀 Setup Instructions
- Node.js v16+
- npm v8+
- Git
git clone - https://github.com/Ujer123/ecom-task.git
cd ecom-task
npm install @heroicons/react@^2.2.0 @mui/icons-material@^7.0.2 @mui/material@^7.0.2 @react-firebase/auth@^0.2.10 firebase@^11.6.0 framer-motion@^12.7.3 next@15.3.0 react@^19.0.0 react-beautiful-dnd@^13.1.1 react-dom@^19.0.0 react-firebase-hooks@^5.1.1 react-use-gesture@^9.1.3 @eslint/eslintrc@^3 @tailwindcss/postcss@^4 eslint@^9 eslint-config-next@15.3.0 tailwindcss@^4

## 🚀 Features Implemented
You can view the detail by clicking on the quick look
You can increase and decrease the product after clicking on add to cart
User can login and logout and their add to cart detail will be in their detail if logout then only it will clean and if login again then again the data will be display
you can refresh the page and then also add to cart detail will not be reset


## 🚀 Technical decision
-components/       # Reusable UI components
-contexts/       # Global state management
-pages/       # Application routes
-public/       # Static assets
-styles/       # Global CSS styles


## 🚀 Challenges and how i solved it
-Cart State Persistence
Challenge: Cart items lost on refresh
Solution:
-Implemented localStorage synchronization
-User-specific cart keys (cart_<user-id>)
-Fallback to anonymous cart for guests

-Dark Mode Flicker
Challenge: Flash of light mode on initial load
Solution:
-Server-side class injection
-localStorage theme check in initial state
-CSS Variables for theme switching