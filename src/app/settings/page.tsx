'use client';

import { useState } from 'react';
import PageHeader from '@/components/page-header';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { BellRing } from 'lucide-react';

export default function SettingsPage() {
  const [audience, setAudience] = useState('all');
  const [message, setMessage] = useState('');
  const { toast } = useToast();

  const handleSendNotification = () => {
    if (!message.trim()) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Message cannot be empty.',
      });
      return;
    }

    // In a real application, you would connect this to your push notification service (e.g., Firebase Cloud Messaging)
    console.log(`Sending message to ${audience}: "${message}"`);

    toast({
      title: 'Notification Sent!',
      description: `Your message has been sent to ${
        audience === 'all'
          ? 'all users and drivers'
          : audience === 'drivers'
          ? 'all drivers'
          : 'all users'
      }.`,
    });

    setMessage('');
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader
        title="Settings"
        description="Manage your application settings and send notifications."
      />
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BellRing className="h-5 w-5" />
            Push Notifications
          </CardTitle>
          <CardDescription>
            Send a common message to all drivers or users as a push
            notification.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="audience">Target Audience</Label>
            <Select value={audience} onValueChange={setAudience}>
              <SelectTrigger id="audience" className="w-full md:w-[240px]">
                <SelectValue placeholder="Select audience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="drivers">Drivers</SelectItem>
                <SelectItem value="users">Users</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Type your notification message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[120px]"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSendNotification}>Send Notification</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
