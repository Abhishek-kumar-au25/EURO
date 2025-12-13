'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState('admin@admin.com');
  const [password, setPassword] = useState('admin@123');

  const handleLogin = () => {
    // Static credentials check
    if (email === 'admin@admin.com' && password === 'admin@123') {
      router.push('/');
    } else {
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: 'Invalid email or password.',
      });
    }
  };

  return (
    <div className="w-full h-screen flex">
      <div className="w-full lg:w-1/3 flex items-center justify-center p-8">
        <Card className="w-full max-w-sm mx-auto border-0 shadow-none lg:border lg:shadow-sm">
          <CardHeader className="text-center">
            <h1 className="text-5xl font-extrabold text-primary mb-4">EURO</h1>
            <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
            <CardDescription>Enter your credentials to access the admin panel.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full" onClick={handleLogin}>
              Sign In
            </Button>
          </CardFooter>
        </Card>
      </div>
      <div className="hidden lg:block lg:w-2/3 relative">
        <Image
          src="https://images.unsplash.com/photo-1509431192910-1e30feed9d75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMnx8QWRtaW4lMjBEcml2ZXxlbnwwfHx8fDE3NjUyNjA4OTh8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Image"
          fill
          data-ai-hint="city traffic"
          className="object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
