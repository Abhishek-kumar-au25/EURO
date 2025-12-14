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
import { BellRing, Settings as SettingsIcon, DollarSign, Car, Gift, Upload } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

function PushNotificationSettings() {
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
  );
}

function GeneralSettings() {
    const { toast } = useToast();
    const handleSave = () => {
        toast({ title: 'Settings Saved', description: 'General settings have been updated.' });
    }

  return (
    <Card>
      <CardHeader>
        <CardTitle>General Settings</CardTitle>
        <CardDescription>
          Manage basic application settings.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="app-name">App Name</Label>
          <Input id="app-name" defaultValue="EURO" />
        </div>
        <div className="space-y-2">
            <Label>App Logo</Label>
            <div className='flex items-center gap-4'>
                <div className='w-24 h-24 bg-muted rounded-md flex items-center justify-center'>
                    <span className="font-albert text-3xl font-extrabold tracking-tight text-primary">EURO</span>
                </div>
                <Button variant="outline"><Upload className='mr-2' /> Upload New Logo</Button>
            </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
            <Label htmlFor="currency">Default Currency</Label>
            <Select defaultValue="usd">
                <SelectTrigger id="currency">
                    <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="usd">USD ($)</SelectItem>
                    <SelectItem value="gbp">GBP (£)</SelectItem>
                    <SelectItem value="eur">EUR (€)</SelectItem>
                </SelectContent>
            </Select>
            </div>
            <div className="space-y-2">
            <Label htmlFor="country">Default Country</Label>
            <Select defaultValue="uk">
                <SelectTrigger id="country">
                <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="pk">Pakistan</SelectItem>
                </SelectContent>
            </Select>
            </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave}>Save Changes</Button>
      </CardFooter>
    </Card>
  );
}

function FinancialSettings() {
    const { toast } = useToast();
    const handleSave = () => {
        toast({ title: 'Settings Saved', description: 'Financial settings have been updated.' });
    }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Settings</CardTitle>
        <CardDescription>
          Configure payment gateways and commission rates.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="commission-rate">Platform Commission Rate (%)</Label>
          <Input id="commission-rate" type="number" defaultValue="15" />
        </div>
        <Separator />
        <CardTitle className="text-lg">Payment Gateway</CardTitle>
        <div className="space-y-4">
             <div className="space-y-2">
                <Label htmlFor="stripe-key">Stripe API Key</Label>
                <Input id="stripe-key" type="password" placeholder="••••••••••••••••••••" />
            </div>
             <div className="space-y-2">
                <Label htmlFor="stripe-secret">Stripe Secret Key</Label>
                <Input id="stripe-secret" type="password" placeholder="••••••••••••••••••••" />
            </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave}>Save Changes</Button>
      </CardFooter>
    </Card>
  );
}

function RideSettings() {
    const { toast } = useToast();
    const handleSave = () => {
        toast({ title: 'Settings Saved', description: 'Ride settings have been updated.' });
    }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ride Settings</CardTitle>
        <CardDescription>
          Manage settings related to ride functionality.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="search-radius">Driver Search Radius (km)</Label>
          <Input id="search-radius" type="number" defaultValue="10" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sos-number">SOS Number</Label>
          <Input id="sos-number" type="tel" defaultValue="+44 999" />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave}>Save Changes</Button>
      </CardFooter>
    </Card>
  );
}

function ReferralSettings() {
    const { toast } = useToast();
    const handleSave = () => {
        toast({ title: 'Settings Saved', description: 'Referral settings have been updated.' });
    }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Referral Settings</CardTitle>
        <CardDescription>
          Configure referral bonuses for users and drivers.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="user-referral">User Referral Bonus ($)</Label>
          <Input id="user-referral" type="number" defaultValue="5" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="driver-referral">Driver Referral Bonus ($)</Label>
          <Input id="driver-referral" type="number" defaultValue="25" />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave}>Save Changes</Button>
      </CardFooter>
    </Card>
  );
}

export default function SettingsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader
        title="Settings"
        description="Manage your application settings."
      />
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general"><SettingsIcon className="mr-2 h-4 w-4" />General</TabsTrigger>
          <TabsTrigger value="financial"><DollarSign className="mr-2 h-4 w-4" />Financial</TabsTrigger>
          <TabsTrigger value="ride"><Car className="mr-2 h-4 w-4" />Ride</TabsTrigger>
          <TabsTrigger value="referral"><Gift className="mr-2 h-4 w-4" />Referral</TabsTrigger>
          <TabsTrigger value="notifications"><BellRing className="mr-2 h-4 w-4" />Push Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <GeneralSettings />
        </TabsContent>
        <TabsContent value="financial">
          <FinancialSettings />
        </TabsContent>
        <TabsContent value="ride">
            <RideSettings />
        </TabsContent>
         <TabsContent value="referral">
            <ReferralSettings />
        </TabsContent>
        <TabsContent value="notifications">
          <PushNotificationSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}
