import { useUser, useClerk } from '@clerk/clerk-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { LogOut } from 'lucide-react';

export default function AccountButton() {
  const { user } = useUser();
  const { signOut } = useClerk();

  const imageUrl = user?.imageUrl; // Get the user's image URL

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className='size-8'>
          <AvatarImage src={imageUrl} alt={String(user?.firstName)} />
          <AvatarFallback>{user?.firstName?.charAt(0)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='mr-4'>
        <DropdownMenuItem>
          <div className='flex items-center gap-2'>
            <Avatar>
              <AvatarImage src={imageUrl} alt={String(user?.firstName)} />
              <AvatarFallback>{user?.firstName?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p>{user?.fullName}</p>
              <p className='text-sm'>{user?.emailAddresses[0].emailAddress}</p>
            </div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
