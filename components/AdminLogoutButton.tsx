'use client';

import React from 'react';
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

const AdminLogoutButton = () => {
  const router = useRouter();

  const adminLogout = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.clear();
    }
    router.refresh();
  };

  return (
    <Button size={'icon'} variant={'outline'} onClick={adminLogout}>
      <LogOut className='size-4' />
    </Button>
  );
};

export default AdminLogoutButton;
