import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './App.tsx';
import History from './pages/history.tsx';
import Protected from './components/protected.tsx';
import NotFound from './pages/404.tsx';
import RootLayout from './components/layout.tsx';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <Home /> },
      {
        path: '/history',
        element: (
          <Protected>
            <History />
          </Protected>
        ),
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
