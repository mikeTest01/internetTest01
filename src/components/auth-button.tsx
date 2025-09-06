
"use client";

import { useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
  User,
  getRedirectResult,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const authFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

type AuthFormValues = z.infer<typeof authFormSchema>;

export function AuthButton() {
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setOpen(false); // Close dialog on successful auth
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
          if (error.code !== "auth/no-redirect-operation") {
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

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google", error);
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: "Could not sign in with Google. Please try again.",
      });
    }
  };

  const handleEmailSignUp = async (values: AuthFormValues) => {
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      toast({
        title: "Account Created",
        description: "You have successfully signed up.",
      });
    } catch (error: any) {
      console.error("Error signing up:", error);
      toast({
        variant: "destructive",
        title: "Sign-up Error",
        description: error.message,
      });
    }
  };

  const handleEmailSignIn = async (values: AuthFormValues) => {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      toast({
        title: "Signed In",
        description: "You have successfully signed in.",
      });
    } catch (error: any) {
      console.error("Error signing in:", error);
      toast({
        variant: "destructive",
        title: "Sign-in Error",
        description: error.message,
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
      console.error("Error signing out", error);
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
          <AvatarImage
            src={user.photoURL ?? ""}
            alt={user.displayName ?? user.email ?? "User"}
          />
          <AvatarFallback>
            {user.displayName?.charAt(0) ?? user.email?.charAt(0) ?? "U"}
          </AvatarFallback>
        </Avatar>
        <Button onClick={handleSignOut} variant="outline">
          <LogOut className="mr-2 h-4 w-4" /> Sign Out
        </Button>
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex gap-2">
        <DialogTrigger asChild>
          <Button variant="outline">
            <LogIn className="mr-2 h-4 w-4" /> Sign In
          </Button>
        </DialogTrigger>
        <Button onClick={handleGoogleSignIn}>Sign In with Google</Button>
      </div>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Authenticate</DialogTitle>
          <DialogDescription>
            Choose a method to sign in or create an account.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleEmailSignIn)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="you@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Sign In
                </Button>
              </form>
            </Form>
          </TabsContent>
          <TabsContent value="signup">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleEmailSignUp)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="you@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Create Account
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
