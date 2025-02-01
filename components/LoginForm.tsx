'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { login } from '@/lib/auth';
import { LockKeyhole } from 'lucide-react';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = await login(email, password);
    
    if (user) {
      router.push(user.role === 'admin' ? '/admin/dashboard' : '/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1 flex flex-col items-center">
        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
          <LockKeyhole className="w-6 h-6 text-primary-foreground" />
        </div>
        <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
        <p className="text-sm text-muted-foreground">
          Sign in to manage your reservations
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>
        <div className="mt-4 text-sm text-center text-muted-foreground">
          <p>Demo Credentials:</p>
          <p>User: user@example.com</p>
          <p>Admin: admin@example.com</p>
          <p className="text-xs">(Any password will work)</p>
        </div>
      </CardContent>
    </Card>
  );
}