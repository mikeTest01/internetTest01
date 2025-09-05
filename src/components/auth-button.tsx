"use client";

import { useState, useEffect } from 'react';
import { GoogleAuthProvider, signInWithRedirect, onAuthStateChanged, signOut, User, getRedirectResult } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogIn, LogOut, User as UserIcon } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export function AuthButton() {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    getRedirectResult(auth)
      .then((result) => {
        if (result && result.user) {
          toast({
            title: "Signed In",
            description: `Welcome back, ${result.user.displayName}!`,
          })
        }
      })
      .catch((error) => {
        // This can happen if there's no redirect result, which is normal on initial page load.
        // We log other errors for debugging.
        if (error.code !== 'auth/no-redirect-operation') {
          console.error('Error getting redirect result', error);
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
        title: "Sign-in Error",
        description: "Could not start the sign-in process. Please try again.",
        variant: "destructive"
      })
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
      })
    } catch (error) {
      console.error('Error signing out', error);
      toast({
        title: "Sign-out Error",
        description: "Could not sign out. Please try again.",
        variant: "destructive"
      })
    }
  };

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? 'User'} />
              <AvatarFallback>{user.displayName?.charAt(0) ?? <UserIcon />}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.displayName}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button onClick={handleSignIn}>
      <LogIn className="mr-2 h-4 w-4" /> Sign in with Google
    </Button>
  );
}
