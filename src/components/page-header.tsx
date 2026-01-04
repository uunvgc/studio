import type { ReactNode } from "react";

interface PageHeaderProps {
    title: string;
    description: string;
    children?: ReactNode;
}

export default function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between bg-card/50 p-4 -m-px border-b rounded-t-xl">
        <div className="space-y-1">
            <h2 className="text-2xl font-headline font-bold tracking-tight">{title}</h2>
            <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}
