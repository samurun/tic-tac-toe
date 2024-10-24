import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center min-h-[calc(100vh-57px)] bg-background text-foreground'>
      <h1 className='text-4xl font-bold mb-4'>404 - Page Not Found</h1>
      <p className='text-xl mb-8 text-center max-w-md'>
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to='/'>
        <Button>Return to Home</Button>
      </Link>
    </div>
  );
}
