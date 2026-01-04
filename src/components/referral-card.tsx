'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Copy, Users } from 'lucide-react';
import { Progress } from './ui/progress';
import { useToast } from '@/hooks/use-toast';

const REFERRAL_CODE = "PROFIT-1A2B3C";

export default function ReferralCard() {
    const { toast } = useToast();

    const handleCopyReferral = () => {
        navigator.clipboard.writeText(REFERRAL_CODE);
        toast({
            title: "Referral Code Copied",
            description: "Now share it with your network!",
        })
    }
  return (
    <Card className="bg-gradient-to-br from-accent/10 to-transparent">
        <CardHeader>
            <div className="bg-accent text-accent-foreground p-3 rounded-lg w-fit mb-2">
                <Users className="h-6 w-6" />
            </div>
            <CardTitle className="font-headline">Grow Your Empire</CardTitle>
            <CardDescription>Invite 3 friends, get 1 month of Pro absolutely free.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
             <div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span className="font-medium">Your Progress</span>
                    <span>1 / 3 Referrals</span>
                </div>
                <Progress value={33} className="mt-1 h-2" />
            </div>
            <p className="text-xs text-muted-foreground">Share your unique code. When someone signs up, you get closer to your reward.</p>
            <div className="flex items-center gap-2">
                 <div className="flex-1 select-all text-sm font-mono bg-muted rounded-md px-3 py-2">{REFERRAL_CODE}</div>
                 <Button variant="default" size="icon" onClick={handleCopyReferral}>
                     <Copy className="h-4 w-4"/>
                 </Button>
            </div>
        </CardContent>
    </Card>
  );
}
