# 📈 Amaymani Strocker - A Next.js Stock Tracking Application 📉

Welcome to **Amaymani Strocker**! This project is a sleek, feature-packed stock management application built using **Next.js**, **TailwindCSS**, and other modern tools. The app enables users to monitor stocks, manage portfolios, and simulate buy/sell transactions in real-time.

---

## 🚀 Features

- **User Authentication**: Secure login and registration via NextAuth.js.
- **Dynamic Stock Pages**: Explore individual stock pages with `[stockName]` routes.
- **Buy/Sell Stocks**: Simulate transactions with intuitive modals.
- **Portfolio Management**: Track your stocks and overall performance.
- **Top Stocks Overview**: Stay updated with the trending stocks.
- **Beautiful UI**: Responsive and modern design with 3D and animated effects.
- **Light/Dark Mode**: Built-in theme changer for a personalized experience.

---

## 🛠️ Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/), [TailwindCSS](https://tailwindcss.com/)
- **Backend**: API routes in Next.js with database models
- **Database**: MongoDB (via Mongoose)
- **Authentication**: NextAuth.js
- **UI Enhancements**: Custom components with animations and effects

---

## 📂 Project Structure

Here's a quick overview of the directory structure:

```plaintext
amaymani-strocker/
├── README.md                # Project documentation
├── components.json          # Component details
├── eslint.config.mjs        # ESLint configuration
├── jsconfig.json            # JS/TS config for IntelliSense
├── next.config.mjs          # Next.js configuration
├── package.json             # Dependencies and scripts
├── postcss.config.mjs       # PostCSS configuration
├── tailwind.config.mjs      # TailwindCSS configuration
├── public/                  # Static assets
│   ├── 1.webp
│   ├── 11.webp
│   ├── 5.webp
│   └── 7.webp
└── src/
    ├── components/          # Reusable components
    │   ├── BuyModal.jsx
    │   ├── SellModal.jsx
    │   ├── StockModel.jsx
    │   ├── logo.jsx
    │   ├── theme-changer.jsx
    │   └── ui/              # UI-focused components
    │       ├── 3d-card.jsx
    │       ├── background-beams.jsx
    │       ├── canvas-reveal-effect.jsx
    │       ├── card-spotlight.jsx
    │       ├── floating-doc.jsx
    │       └── text-generate-effect.jsx
    ├── lib/                 # Utility libraries
    │   └── utils.js
    ├── pages/               # Next.js pages
    │   ├── _app.js
    │   ├── _document.js
    │   ├── buy-sell.js
    │   ├── index.js         # Landing page
    │   ├── login.js
    │   ├── portfolio.js
    │   ├── register.js
    │   ├── top-stocks.js
    │   ├── api/             # API routes
    │   │   ├── buy-stock.js
    │   │   ├── fetch-stockData.js
    │   │   ├── get-portfolio-data.js
    │   │   ├── login.js
    │   │   ├── register.js
    │   │   ├── sell-stock.js
    │   │   ├── top-stocks.js
    │   │   └── auth/
    │   │       └── [...nextauth].js
    │   └── stock/
    │       └── [stockName].js
    ├── styles/              # Global styles
    │   └── globals.css
    └── utils/               # Backend utilities
        ├── db.js            # Database connection
        ├── navLinks.js      # Navigation links data
        ├── stocks.js        # Stocks-related logic
        └── models/          # Mongoose models
            ├── stock.js
            └── user.js
```

## 📸 UI Highlights

- **Dynamic Cards**: 3D cards with hover animations.
- **Canvas Effects**: Stunning background visuals with `canvas-reveal-effect`.
- **Spotlight Effects**: Highlight cards and elements dynamically.
- **Theming**: Switch themes with the `theme-changer` component.

---

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/username/amaymani-strocker.git
   cd amaymani-strocker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Visit the app**
   Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

---

## 📖 Documentation

- **API Endpoints**: Located in `src/pages/api/`.
- **Reusable Components**: Located in `src/components/` for modular UI development.
- **Utilities**: Common functions and database connection scripts in `src/utils/`.

---

## 🎨 Customization

Modify the app to fit your needs:

- Update `tailwind.config.mjs` for design tweaks.
- Add static assets to `public/` for images, icons, etc.
- Extend database models in `src/utils/models/`.

---

## 🛡️ Security

Authentication is implemented via **NextAuth.js**. Environment variables must be configured for secret keys and database connections:

```env
NEXTAUTH_SECRET=your_secret
MONGODB_URI=your_mongodb_connection_string
```

---

## 📋 License

This project is licensed under the MIT License. Feel free to fork, modify, and share!

---

### 🌟 Contributors

- **Amay Mani Tripathi(https://github.com/Amaymani)** - Creator & Maintainer

---

🎉 **Happy Coding!** 🚀
```
"# Stocker" 
