import { redirect } from 'next/navigation';
import LoginForm from '@/components/LoginForm';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <LoginForm />
      </div>
    </div>
  );
}