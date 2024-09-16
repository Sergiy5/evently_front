 # Server URL "https://rendereventapp.onrender.com"
 POST https://rendereventapp.onrender.com/api/v1/authorize/registration
Request JSON
{
        "name": "Bynamee",
"email": "sergiomail34568@gmail.com",
"password": "Asdfghjkl1",
"confirmPassword": "Asdfghjkl1"
}
Respons
{
    "timestamp": "2024-09-15 06:09:13PM",
    "message": "User registered successfully",
    "status_code": 201
} (edited) 

React

Reply

8:14
POST https://rendereventapp.onrender.com/api/v1/authorize/login
Request JSON
{
"email": "sergiomail4568@gmail.com",
"password": "Asdfghjkl1"
}
Respons
{
    "timestamp": "2024-09-15 06:12:09PM",
    "statusCode": 400,
    "message": "Confirm your email (sergiomail4568@gmail.com)"
}
або
{
    "timestamp": "2024-09-15 06:13:33PM",
    "userId": "66e7206835bf8724efddf298",
    "accessToken": "eyJhbGcMiJ9.eyJzdWIiOiJhbm9ueW1vdXNVc2VyIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzI2NDI0MDEzLCJleHAiOjE3MjY0NjAwMTN9.IWnkBX_DdYez2zQbh1mI1vyh5nQ9J0irMnvVQIrKHSZ5CJU9g6s2mtfnmbWvcrXGQ689jU-HuByL3LYHAlwHZQ",
    "refreshToken": null
}


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react';

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
});
```
