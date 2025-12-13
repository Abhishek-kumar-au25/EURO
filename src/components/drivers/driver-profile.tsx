

'use client';

import type { Driver } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import StatCard from "@/components/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  DollarSign,
  Car,
  Mail,
  Phone,
  Star,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  UserX,
  AlertCircle,
  Ban,
  FileText,
  ShieldCheck,
  Play,
  Pause,
  MessageSquare,
  Download,
} from "lucide-react";
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Separator } from "../ui/separator";

const statusVariantMap: Record<Driver["status"], "success" | "info" | "destructive" | "warning"> = {
  Approved: "success",
  Pending: "info",
  Rejected: "destructive",
  Suspended: "warning",
};

const docStatusIconMap: Record<Driver["documents"][0]["status"], React.ReactNode> = {
  Verified: <CheckCircle className="h-4 w-4 text-green-500" />,
  Pending: <Clock className="h-4 w-4 text-yellow-500" />,
  Rejected: <XCircle className="h-4 w-4 text-red-500" />,
};

function RejectionForm({ driver, onReasonSubmit }: { driver: Driver; onReasonSubmit: (reason: string) => void }) {
  const [reason, setReason] = useState(driver.rejectionReason || '');

  const handleSubmit = () => {
    onReasonSubmit(reason);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare />
          Verification Failed Reason
        </CardTitle>
        <CardDescription>
          Enter the message for why the verification failed.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="rejection-reason">Rejection Message</Label>
          <Textarea
            id="rejection-reason"
            name="rejection-reason"
            placeholder="e.g., 'The provided document is expired.'"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />
        </div>
        <Button onClick={handleSubmit}>
          Submit Reason
        </Button>
      </CardContent>
    </Card>
  );
}


function DocumentSection({ documents, onStatusChange }: { documents: Driver['documents'], onStatusChange: (docId: string, newStatus: 'Verified' | 'Rejected') => void }) {
    if (documents.length === 0) return null;
    
    const handleDownload = (url: string) => {
        window.open(url, '_blank');
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {documents.map(doc => (
            <div key={doc.id} className="rounded-lg border p-4 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <p className="font-medium">{doc.type}</p>
                <div className="flex items-center gap-2 text-sm">
                  {docStatusIconMap[doc.status]}
                  <span>{doc.status}</span>
                </div>
              </div>
              <div className="flex-grow flex justify-center items-center gap-4">
                  <div className="flex flex-col items-center">
                       <Image src={doc.frontUrl} alt={`${doc.type} (Front)`} width={200} height={125} className="rounded-md object-contain mb-2" data-ai-hint="document paper" />
                       {doc.type === "Driver's License" && doc.backUrl && (
                         <Image src={doc.backUrl} alt={`${doc.type} (Back)`} width={200} height={125} className="rounded-md object-contain" data-ai-hint="document paper" />
                       )}
                  </div>
              </div>
              <div className="flex gap-2 mt-4">
                {doc.status === 'Pending' && (
                    <>
                        <Button size="sm" onClick={() => onStatusChange(doc.id, 'Verified')}>Approve</Button>
                        <Button size="sm" variant="destructive" onClick={() => onStatusChange(doc.id, 'Rejected')}>Reject</Button>
                    </>
                )}
                <Button size="sm" variant="outline" onClick={() => handleDownload(doc.frontUrl)}>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                </Button>
              </div>
            </div>
          ))}
        </div>
    )
}

export function DriverProfile({ driver: initialDriver }: { driver: Driver }) {
  const [driver, setDriver] = useState(initialDriver);
  const [message, setMessage] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [videoStatus, setVideoStatus] = useState(initialDriver.videoVerification.status);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  const handleStatusChange = (newStatus: Driver['status']) => {
    setDriver({ ...driver, status: newStatus });
    toast({
      title: `Driver ${newStatus}`,
      description: `${driver.name}'s status has been updated.`,
    });
  };

  const handleDocumentStatusChange = (docId: string, newStatus: 'Verified' | 'Rejected') => {
    const updatedDocs = driver.documents.map(doc => 
      doc.id === docId ? { ...doc, status: newStatus } : doc
    );

    const allDocsVerified = updatedDocs.every(doc => doc.status === 'Verified') && videoStatus === 'Verified';
    const anyDocRejected = updatedDocs.some(doc => doc.status === 'Rejected') || videoStatus === 'Rejected';

    let newDriverStatus = driver.status;
    if (allDocsVerified) {
        newDriverStatus = 'Approved';
    } else if (anyDocRejected) {
        newDriverStatus = 'Rejected';
    }


    setDriver({ ...driver, documents: updatedDocs, status: newDriverStatus });

    toast({
      title: `Document ${newStatus}`,
      description: `The document status has been updated.`,
    });
    
    if (newDriverStatus !== driver.status) {
         toast({
          title: `Driver ${newDriverStatus}`,
          description: `${driver.name}'s status has been updated to ${newDriverStatus}.`,
        });
    }
  };

  const handleVideoVerificationStatusChange = (newStatus: 'Verified' | 'Rejected') => {
    setVideoStatus(newStatus);
    
    const allDocsVerified = driver.documents.every(doc => doc.status === 'Verified') && newStatus === 'Verified';
    const anyDocRejected = driver.documents.some(doc => doc.status === 'Rejected') || newStatus === 'Rejected';

    let newDriverStatus = driver.status;
    if (allDocsVerified) {
        newDriverStatus = 'Approved';
    } else if (anyDocRejected) {
        newDriverStatus = 'Rejected';
    }

    setDriver({...driver, status: newDriverStatus });

    toast({
        title: `Video Verification ${newStatus}`,
        description: `The video verification status has been updated.`,
    });

    if (newDriverStatus !== driver.status) {
         toast({
          title: `Driver ${newDriverStatus}`,
          description: `${driver.name}'s status has been updated to ${newDriverStatus}.`,
        });
    }
  };
  
  const togglePlay = () => {
    if (videoRef.current) {
        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    }
  };


  const handleSendMessage = () => {
    if (message.trim()) {
      console.log(`Sending message to ${driver.name}: ${message}`);
      toast({
        title: 'Message Sent!',
        description: `Your message to ${driver.name} has been sent.`,
      });
      setMessage('');
      setIsDialogOpen(false);
    }
  };
  
  const getStatusText = (status: Driver['status']) => {
    if (status === 'Rejected') {
      return 'Failed';
    }
    return status;
  }
  
  const handleRejectionReasonSubmit = (reason: string) => {
    setDriver({ ...driver, rejectionReason: reason });
    toast({
      title: 'Rejection Reason Updated',
      description: 'The reason for rejection has been saved.',
    });
  };

  const governmentDocs = driver.documents.filter(doc => doc.category === 'Government');
  const vehicleDocs = driver.documents.filter(doc => doc.category === 'Vehicle');

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="md:col-span-1 space-y-4">
        <Card>
          <CardHeader className="items-center text-center">
            <Avatar className="h-24 w-24 mb-2">
              <AvatarImage src={driver.avatarUrl} alt={driver.name} />
              <AvatarFallback>{driver.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <CardTitle>{driver.name}</CardTitle>
            <CardDescription>{driver.id}</CardDescription>
            <Badge variant={statusVariantMap[driver.status]} className="mt-2">{getStatusText(driver.status)}</Badge>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span>{driver.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span>{driver.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Car className="h-4 w-4" />
              <span>{`${driver.vehicle.year} ${driver.vehicle.make} ${driver.vehicle.model}`}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-2">
            {driver.status === 'Approved' && <Button variant="outline" onClick={() => handleStatusChange('Suspended')}>Suspend</Button>}
            {driver.status === 'Suspended' && <Button variant="outline" onClick={() => handleStatusChange('Approved')}>Reactivate</Button>}
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="secondary">Send Message</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Send Message to {driver.name}</DialogTitle>
                  <DialogDescription>
                    Compose your message below.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="message">Your Message</Label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={`Hi ${driver.name}...`}
                      className="min-h-[120px]"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button onClick={handleSendMessage}>Send Message</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <Ban className="mr-2 h-4 w-4" />
                  Block
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure you want to block this driver?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will suspend the driver's account and prevent them from accessing the app.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleStatusChange('Suspended')}>
                    Confirm Block
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-2 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Rating" value={driver.performance.rating.toFixed(1)} icon={<Star />} />
          <StatCard title="Acceptance" value={`${driver.performance.acceptanceRate}%`} icon={<CheckCircle />} />
          <StatCard title="Completion" value={`${driver.performance.completionRate}%`} icon={<TrendingUp />} />
          <StatCard title="Total Earnings" value={`$${(driver.performance.earnings / 1000).toFixed(1)}k`} icon={<DollarSign />} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Documents & Verification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            
            <DocumentSection 
                documents={driver.documents} 
                onStatusChange={handleDocumentStatusChange}
            />
            
            <Separator />
            
            <div>
              <p className="font-medium mb-2">Video Verification</p>
              <div className="relative">
                <video
                    ref={videoRef}
                    src="https://storage.googleapis.com/test-videos-123/production_id_4765898%20(1080p).mp4"
                    className="rounded-md w-full"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    loop
                 />
                <div className="absolute top-2 right-2 flex items-center gap-2 text-sm bg-background/80 p-1.5 rounded-md">
                  {docStatusIconMap[videoStatus]}
                  <span>{videoStatus}</span>
                </div>
                 <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-16 w-16 bg-black/50 hover:bg-black/70 text-white"
                    onClick={togglePlay}
                >
                    {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
                </Button>
              </div>
              {videoStatus === 'Pending' && (
                <div className="flex gap-2 mt-4">
                  <Button size="sm" onClick={() => handleVideoVerificationStatusChange('Verified')}>Approve</Button>
                  <Button size="sm" variant="destructive" onClick={() => handleVideoVerificationStatusChange('Rejected')}>Reject</Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {driver.status === 'Rejected' && <RejectionForm driver={driver} onReasonSubmit={handleRejectionReasonSubmit} />}
      </div>
    </div>
  );
}
