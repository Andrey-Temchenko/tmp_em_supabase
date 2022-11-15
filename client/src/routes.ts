import RecordsPage from './components/records/RecordsPage';
import CategoriesPage from './components/categories/CategoriesPage';
import LoginPage from './components/auth/LoginPage';
import SignUpPage from './components/auth/SignUpPage';
import PasswordForgotPage from './components/auth/PasswordForgotPage';
import PasswordResetPage from './components/auth/PasswordResetPage';
import ActivationPage from './components/auth/activation/ActivationPage';
import NotFountPage from './components/NotFoundPage';

export const routes = [
  {
    path: '/',
    component: RecordsPage,
    pageProps: {
      pageId: 'records',
      title: 'Records'
    }
  },
  {
    path: '/records',
    component: RecordsPage,
    pageProps: {
      pageId: 'records',
      title: 'Records'
    }
  },
  {
    path: '/categories',
    component: CategoriesPage,
    pageProps: {
      pageId: 'categories',
      title: 'Categories'
    }
  },
  {
    path: '/login',
    component: LoginPage,
    pageProps: {
      pageId: 'log_in',
      title: 'Log In',
      public: true
    }
  },
  {
    path: '/sign-up',
    component: SignUpPage,
    pageProps: {
      pageId: 'sign_up',
      title: 'Log In',
      public: true
    }
  },
  {
    path: '/password-forgot',
    component: PasswordForgotPage,
    pageProps: {
      pageId: 'password_forgot',
      title: 'Forgot password',
      public: true
    }
  },
  {
    path: '/password-reset/:token',
    component: PasswordResetPage,
    pageProps: {
      pageId: 'password_reset',
      title: 'Reset password',
      public: true
    }
  },
  {
    path: '/activate/:token',
    component: ActivationPage,
    pageProps: {
      pageId: 'activation',
      title: 'Account activation',
      public: true
    }
  },
  {
    path: '/*',
    component: NotFountPage,
    pageProps: {
      pageId: 'not_found',
      title: 'Page not found',
      public: true
    }
  }
];
