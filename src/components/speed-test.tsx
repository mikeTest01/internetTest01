"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Timer, ArrowDownToLine, ArrowUpFromLine, RefreshCw } from "lucide-react";

type TestState = "idle" | "ping" | "download" | "upload" | "finished";

const SIMULATION_CONFIG = {
  ping: { duration: 1000, min: 5, max: 50 },
  download: { duration: 5000, min: 20, max: 500, interval: 50 },
  upload: { duration: 5000, min: 10, max: 100, interval: 50 },
};

export function SpeedTest() {
  const [testState, setTestState] = useState<TestState>("idle");
  const [ping, setPing] = useState<number | null>(null);
  const [downloadSpeed, setDownloadSpeed] = useState<number>(0);
  const [uploadSpeed, setUploadSpeed] = useState<number>(0);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{ ping: number; download: number; upload: number } | null>(null);

  const isTesting = useMemo(() => testState !== "idle" && testState !== "finished", [testState]);

  const resetState = () => {
    setTestState("idle");
    setPing(null);
    setDownloadSpeed(0);
    setUploadSpeed(0);
    setProgress(0);
    setResult(null);
  };

  const startTest = () => {
    resetState();
    setTestState("ping");
  };

  useEffect(() => {
    if (!isTesting) return;

    let intervalId: NodeJS.Timeout;

    const runSimulation = () => {
      switch (testState) {
        case "ping":
          setProgress(10);
          setTimeout(() => {
            setPing(Math.floor(Math.random() * (SIMULATION_CONFIG.ping.max - SIMULATION_CONFIG.ping.min + 1)) + SIMULATION_CONFIG.ping.min);
            setTestState("download");
          }, SIMULATION_CONFIG.ping.duration);
          break;

        case "download": {
          const { duration, interval: stepInterval, max, min } = SIMULATION_CONFIG.download;
          const finalSpeed = Math.random() * (max - min) + min;
          const steps = duration / stepInterval;
          let currentStep = 0;
          
          intervalId = setInterval(() => {
            currentStep++;
            const simulatedSpeed = (finalSpeed / steps) * currentStep;
            setDownloadSpeed(simulatedSpeed);
            setProgress(10 + (currentStep / steps) * 45); // Ping 10%, Download 45%

            if (currentStep >= steps) {
              clearInterval(intervalId);
              setDownloadSpeed(finalSpeed);
              setTestState("upload");
            }
          }, stepInterval);
          break;
        }

        case "upload": {
          const { duration, interval: stepInterval, max, min } = SIMULATION_CONFIG.upload;
          const finalSpeed = Math.random() * (max - min) + min;
          const steps = duration / stepInterval;
          let currentStep = 0;

          intervalId = setInterval(() => {
            currentStep++;
            const simulatedSpeed = (finalSpeed / steps) * currentStep;
            setUploadSpeed(simulatedSpeed);
            setProgress(55 + (currentStep / steps) * 45); // Upload 45%

            if (currentStep >= steps) {
              clearInterval(intervalId);
              setUploadSpeed(finalSpeed);
              setTestState("finished");
            }
          }, stepInterval);
          break;
        }
      }
    };

    runSimulation();

    return () => {
      clearInterval(intervalId);
    };
  }, [testState, isTesting]);
  
  useEffect(() => {
    if (testState === 'finished') {
        setProgress(100);
        if(ping !== null && downloadSpeed > 0 && uploadSpeed > 0) {
            setResult({
                ping: ping,
                download: parseFloat(downloadSpeed.toFixed(2)),
                upload: parseFloat(uploadSpeed.toFixed(2)),
            });
        }
    }
  }, [testState, ping, downloadSpeed, uploadSpeed]);

  const renderMetricCard = (icon: React.ReactNode, title: string, value: string | number | null, unit: string, isActive: boolean) => (
    <Card className={`text-center transition-all duration-300 ${isActive ? 'shadow-lg scale-105 border-primary' : 'shadow-md'}`}>
      <CardHeader className="flex flex-row items-center justify-center space-x-2 pb-2">
        {icon}
        <CardTitle className="text-sm font-medium font-headline">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold text-primary">
          {value !== null ? value : "-"}
        </div>
        <p className="text-xs text-muted-foreground">{unit}</p>
      </CardContent>
    </Card>
  );

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-8">
      {testState === "idle" && (
        <>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 font-headline">Measure Your Network Performance</h2>
            <p className="max-w-xl text-muted-foreground md:text-lg mb-8">Click the button below to start the internet speed test.</p>
            <Button onClick={startTest} size="lg" className="h-24 w-24 rounded-full text-2xl font-bold shadow-2xl hover:scale-105 transition-transform duration-300 bg-blue-500 hover:bg-blue-600 text-white">
                GO
            </Button>
        </>
      )}

      {isTesting && (
        <div className="w-full max-w-2xl flex flex-col items-center gap-4">
            <h2 className="text-3xl font-bold tracking-tighter font-headline">Testing...</h2>
            <Progress value={progress} className="h-4" />
        </div>
      )}
      
      {testState === 'finished' && result && (
        <div className="w-full text-center flex flex-col items-center gap-4">
            <h2 className="text-3xl font-bold tracking-tighter font-headline">Test Complete!</h2>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-8">
        {renderMetricCard(<Timer className="h-5 w-5 text-muted-foreground" />, "Ping", ping, "ms", testState === "ping")}
        {renderMetricCard(<ArrowDownToLine className="h-5 w-5 text-muted-foreground" />, "Download", downloadSpeed.toFixed(2), "Mbps", testState === "download")}
        {renderMetricCard(<ArrowUpFromLine className="h-5 w-s5 text-muted-foreground" />, "Upload", uploadSpeed.toFixed(2), "Mbps", testState === "upload")}
      </div>
      
      {testState === 'finished' && (
         <Button onClick={startTest} size="lg" className="mt-4">
            <RefreshCw className="mr-2 h-4 w-4"/>
            Test Again
        </Button>
      )}
    </div>
  );
}
