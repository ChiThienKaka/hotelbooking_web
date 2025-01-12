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
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

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
})
```
## 1 Tạo dự án mới
npm create vite@latest tenduan react-swc
## Cấu trúc dự án
src/
├── assets/           # Lưu trữ hình ảnh, icon, font, và các tài nguyên tĩnh khác
├── components/       # Các thành phần React tái sử dụng
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   └── Button.module.css
│   └── Navbar/
│       ├── Navbar.tsx
│       ├── Navbar.test.tsx
│       └── Navbar.module.css
├── features/         # Các tính năng hoặc module lớn của ứng dụng
│   ├── Auth/
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── authSlice.ts
│   │   └── authAPI.ts
│   └── Hotel/
│       ├── HotelList.tsx
│       ├── HotelDetail.tsx
│       └── hotelSlice.ts
├── hooks/            # Các custom hooks
│   ├── useAuth.ts
│   ├── useFetch.ts
│   └── useScroll.ts
├── layouts/          # Các layout chính (Header, Footer, Sidebar, v.v.)
│   ├── MainLayout.tsx
│   ├── AuthLayout.tsx
│   └── AdminLayout.tsx
├── pages/            # Các trang của ứng dụng
│   ├── Home/
│   │   ├── HomePage.tsx
│   │   ├── HomePage.test.tsx
│   │   └── HomePage.module.css
│   ├── Login/
│   │   ├── LoginPage.tsx
│   │   └── LoginPage.module.css
│   └── NotFound.tsx
├── redux/            # Redux store, slice và các middleware
│   ├── store.ts
│   ├── rootReducer.ts
│   └── middleware/
│       ├── logger.ts
│       └── api.ts
├── routes/           # Cấu hình định tuyến
│   ├── AppRoutes.tsx
│   └── PrivateRoute.tsx
├── services/         # Các API service (REST, GraphQL, v.v.)
│   ├── apiClient.ts
│   ├── authService.ts
│   └── hotelService.ts
├── styles/           # Các file CSS hoặc SCSS toàn cục
│   ├── variables.scss
│   ├── mixins.scss
│   └── global.css
├── types/            # Các định nghĩa kiểu (TypeScript)
│   ├── auth.d.ts
│   ├── hotel.d.ts
│   └── global.d.ts
├── utils/            # Các hàm tiện ích hoặc helper
│   ├── formatDate.ts
│   ├── validateEmail.ts
│   └── debounce.ts
├── App.tsx           # Điểm khởi đầu chính của ứng dụng
├── index.tsx         # File khởi động ReactDOM
└── vite-env.d.ts     # Định nghĩa cho môi trường Vite (nếu dùng Vite)


## cài thư viện
react-router-dom
antd