import { Outlet } from 'react-router-dom';
import Providers from './providers';
import Navbar from './navbar';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

export default function RootLayout() {
  return (
    <Providers>
      <Navbar />
      <main className='raleway'>
        <Outlet />
      </main>
    </Providers>
  );
}
