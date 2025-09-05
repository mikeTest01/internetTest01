"use client";

import { useState, useEffect } from "react";
import { GoogleAuthProvider, onAuthStateChanged, signInWithRedirect, signOut, User, getRedirectResult } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AuthButton() {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const result = await getRedirectResult(auth);
          if (result) {
            toast({
              title: "Welcome back!",
              description: "You have successfully signed in.",
            });
          }
        } catch (error: any) {
          console.error("Error getting redirect result:", error);
          if (error.code !== 'auth/no-redirect-operation') {
            toast({
              variant: "destructive",
              title: "Sign-in Error",
              description: error.message,
            });
          }
        }
      }
    });

    return () => unsubscribe();
  }, [toast]);

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.error('Error signing in with Google', error);
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: "Could not sign in with Google. Please try again.",
      });
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
      });
    } catch (error) {
      console.error('Error signing out', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not sign out. Please try again.",
      });
    }
  };

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? 'User'} />
          <AvatarFallback>{user.displayName?.charAt(0) ?? 'U'}</AvatarFallback>
        </Avatar>
        <Button onClick={handleSignOut} variant="outline">
          <LogOut className="mr-2 h-4 w-4" /> Sign Out
        </Button>
      </div>
    );
  }

  return (
    <Button onClick={handleSignIn}>
      <LogIn className="mr-2 h-4 w-4" /> Sign In with Google
    </Button>
  );
}
