import { Lock, Gem } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { View } from "@/lib/types";

interface UpgradePromptProps {
    featureName: string;
    requiredPlan: string;
    setActiveView: (view: View) => void;
}

export default function UpgradePrompt({ featureName, requiredPlan, setActiveView }: UpgradePromptProps) {
  return (
    <Card className="w-full max-w-md mx-auto my-12 text-center shadow-lg">
        <CardHeader>
            <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
                <Lock className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="font-headline text-2xl">Unlock {featureName}</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground mb-6">
                This is a premium feature. To multiply your results and unlock your full income potential, upgrade to the <span className="font-semibold text-primary">{requiredPlan}</span> plan.
            </p>
            <Button size="lg" onClick={() => setActiveView('upgrade')}>
                <Gem className="mr-2 h-5 w-5" />
                Upgrade Your Plan
            </Button>
        </CardContent>
    </Card>
  );
}
