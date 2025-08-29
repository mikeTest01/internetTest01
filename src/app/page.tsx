import { Logo } from "@/components/icons";
import { SpeedTest } from "@/components/speed-test";
import { CurrentYear } from "@/components/current-year";
import { AuthButton } from "@/components/auth-button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold text-foreground font-headline">NetGauge</h1>
        </div>
        <AuthButton />
      </header>
      <main className="flex-1 flex flex-col items-center justify-center p-4 text-center">
        <SpeedTest />
      </main>
      <footer className="text-center p-4 text-muted-foreground text-sm">
        © <CurrentYear /> NetGauge. All rights reserved.
      </footer>
    </div>
  );
}
