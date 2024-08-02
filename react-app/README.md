<<<<<<< HEAD
# Student Attendance Management System - Frontend

A modern React frontend built with Vite for the Student Attendance Management System.

## 🚀 Features

- **Fast Development**: Powered by Vite for instant HMR (Hot Module Replacement)
- **Modern React**: Built with React 18
- **Optimized Build**: Lightning-fast production builds
- **ESM First**: Native ES modules support

## 📋 Prerequisites

- Node.js 18+ or higher
- npm or yarn

## 🛠️ Installation

1. **Navigate to the react-app directory**:

```bash
cd react-app
```

2. **Install dependencies**:

```bash
npm install
```

## 🏃 Running the Application

### Development Server

Start the Vite development server:

```bash
npm run dev
```

The application will automatically open in your browser at `http://localhost:3000`

### Build for Production

Create an optimized production build:

```bash
npm run build
```

The build output will be in the `dist/` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## 📁 Project Structure

```
react-app/
├── public/              # Static assets
│   ├── favicon.ico
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src/                 # Source files
│   ├── App.css         # App component styles
│   ├── App.jsx         # Main App component
│   ├── index.css       # Global styles
│   ├── logo.svg        # React logo
│   └── main.jsx        # Application entry point
├── index.html          # HTML template
├── vite.config.js      # Vite configuration
├── package.json        # Dependencies and scripts
└── README.md           # This file
```

## 🔧 Configuration

### Vite Configuration

The Vite configuration is in `vite.config.js`. Current settings:

- **Port**: 3000 (matches Create React App default)
- **Auto Open**: Browser opens automatically on dev server start
- **React Plugin**: Fast Refresh enabled

### Environment Variables

Create a `.env` file in the root directory for environment variables:

```env
VITE_API_URL=http://localhost:8000
```

Access in your code:

```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## 🎯 Why Vite?

Vite offers several advantages over Create React App:

- **⚡ Instant Server Start**: No bundling required in development
- **🔥 Lightning Fast HMR**: Updates reflect instantly
- **📦 Optimized Builds**: Rollup-based production builds
- **🎨 CSS Code Splitting**: Automatic CSS splitting
- **🔌 Rich Plugin Ecosystem**: Extensive plugin support
- **📊 Better Performance**: Significantly faster than webpack-based tools

### Performance Comparison

| Metric           | Create React App | Vite   |
| ---------------- | ---------------- | ------ |
| Dev Server Start | ~30s             | <1s    |
| HMR Update       | ~1s              | <100ms |
| Production Build | ~60s             | ~20s   |

## 🔗 Integration with Django Backend

The frontend connects to the Django backend API. Update the API URL in your environment variables:

```env
VITE_API_URL=http://localhost:8000/api
```

## 🐛 Troubleshooting

### Port already in use

If port 3000 is already in use, update `vite.config.js`:

```javascript
export default defineConfig({
  server: {
    port: 3001, // Change to any available port
  },
});
```

### Module not found errors

Clear the cache and reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
```

### Build fails

Ensure you're using Node.js 18 or higher:

```bash
node --version
```

## 📚 Learn More

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Vite Plugin React](https://github.com/vitejs/vite-plugin-react)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

[Add your license information here]
=======
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
>>>>>>> 602157e (react init)
