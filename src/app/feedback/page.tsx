'use client';

import PageHeader from '@/components/page-header';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { feedback } from '@/lib/data';
import { parseISO } from 'date-fns';
import { Star, MessageCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import type { Feedback } from '@/lib/types';
import { RelativeTime } from '@/components/relative-time';

function Rating({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < value ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'
          }`}
        />
      ))}
    </div>
  );
}

export default function FeedbackPage() {
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [replyMessage, setReplyMessage] = useState('');
  const { toast } = useToast();

  const handleSendReply = () => {
    if (replyMessage.trim() && selectedFeedback) {
      console.log(`Replying to ${selectedFeedback.driverName}: ${replyMessage}`);
      toast({
        title: 'Reply Sent!',
        description: `Your message to ${selectedFeedback.driverName} has been sent.`,
      });
      setReplyMessage('');
      setSelectedFeedback(null);
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader
        title="Feedback Management"
        description="Review and respond to driver feedback."
      />
      <Dialog
        open={!!selectedFeedback}
        onOpenChange={(isOpen) => !isOpen && setSelectedFeedback(null)}
      >
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {feedback.map((item) => (
            <Card key={item.id}>
              <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={item.driverAvatarUrl} alt={item.driverName} />
                  <AvatarFallback>{item.driverName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <CardTitle className="text-base">{item.driverName}</CardTitle>
                  <CardDescription>
                    <RelativeTime date={parseISO(item.date)} />
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Rating value={item.rating} />
                <p className="text-muted-foreground">{item.comment}</p>
              </CardContent>
              <CardFooter>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedFeedback(item)}
                  >
                    <MessageCircle className="mr-2 h-4" />
                    Reply
                  </Button>
                </DialogTrigger>
              </CardFooter>
            </Card>
          ))}
        </div>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reply to {selectedFeedback?.driverName}</DialogTitle>
            <DialogDescription>
              Compose your response to the feedback below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reply-message">Your Message</Label>
              <Textarea
                id="reply-message"
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                placeholder={`Hi ${selectedFeedback?.driverName}, thanks for your feedback...`}
                className="min-h-[120px]"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSendReply}>Send Reply</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
