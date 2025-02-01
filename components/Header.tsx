'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { logout } from '@/lib/auth';
import { LogOut, Hotel } from 'lucide-react';

export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Hotel className="h-6 w-6" />
          <h1 className="text-xl font-semibold">Hotel Reservations</h1>
        </div>
        <Button variant="ghost" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </header>
  );
}