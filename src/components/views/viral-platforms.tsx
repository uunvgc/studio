'use client';

import { viralPlatforms } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, ExternalLink } from "lucide-react";
import { Button } from "../ui/button";

export default function ViralPlatforms() {
    
    const getPotentialBadgeColor = (potential: string) => {
        switch (potential.toLowerCase()) {
            case 'high': return 'bg-green-500/20 text-green-700 border-green-500/30';
            case 'medium-high': return 'bg-lime-500/20 text-lime-700 border-lime-500/30';
            case 'medium': return 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30';
            case 'emerging': return 'bg-blue-500/20 text-blue-700 border-blue-500/30';
            default: return 'bg-secondary';
        }
    }

    return (
        <div className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {viralPlatforms.map((platform) => (
                    <Card key={platform.name} className="flex flex-col">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <CardTitle className="font-headline text-xl">{platform.name}</CardTitle>
                                <Badge variant="outline" className={`font-bold ${getPotentialBadgeColor(platform.potential)}`}>
                                    {platform.potential}
                                </Badge>
                            </div>
                            <CardDescription>{platform.category}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-sm text-muted-foreground mb-4">{platform.description}</p>
                            <div className="flex items-center text-sm text-foreground">
                                <Users className="h-4 w-4 mr-2" />
                                <span>{platform.userBase} Users</span>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <a href={platform.url} target="_blank" rel="noopener noreferrer" className="w-full">
                                <Button className="w-full">
                                    <ExternalLink className="mr-2" />
                                    Get Started
                                </Button>
                            </a>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
