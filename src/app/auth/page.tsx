"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Label } from "../../components/ui/Label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/Tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card";
import { useToast } from "../hooks/useToast";
import { Key, LoaderCircle } from "lucide-react";
import Logo from "../../components/common/Logo";

type AuthMethod = "google" | "email" | "phone";

interface AuthState {
  email: string;
  password: string;
  name: string;
  phone: string;
  verificationCode: string;
}

export default function AuthPage() {
  const [authMethod, setAuthMethod] = useState<AuthMethod>("email");
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [authState, setAuthState] = useState<AuthState>({
    email: "",
    password: "",
    name: "",
    phone: "",
    verificationCode: "",
  });

  const router = useRouter();
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAuthState((prev) => ({ ...prev, [name]: value }));
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    // Implement Google Sign-In logic here
    console.log("Google Sign-In");
    setIsLoading(false);
    // On success:
    // router.push('/dashboard')
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Implement Email authentication logic here
    console.log("Email Auth:", isLogin ? "Login" : "Sign Up", authState);
    setIsLoading(false);
    // On success:
    // router.push('/dashboard')
  };

  const handlePhoneAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Implement Phone authentication logic here
    console.log("Phone Auth:", isLogin ? "Login" : "Sign Up", authState);
    setIsLoading(false);
    // On success:
    // router.push('/dashboard')
  };

  const sendVerificationCode = async () => {
    // Implement sending verification code logic here
    console.log("Sending verification code to:", authState.phone);
    toast({
      title: "Verification Code Sent",
      description: "Please check your phone for the verification code.",
    });
  };

  return (
    <div className="container mx-auto p-4 h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-700">
      <Card className="w-full max-w-md bg-zinc-800 text-zinc-100">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Bem vindo ao Conecta Mais
          </CardTitle>
          <CardDescription className="text-center text-zinc-400">
            {isLogin ? "Sign in to your account" : "Create a new account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            value={authMethod}
            onValueChange={(value) => setAuthMethod(value as AuthMethod)}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="google">Google</TabsTrigger>
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="phone">Phone</TabsTrigger>
            </TabsList>
            <TabsContent value="google">
              <Button
                variant="outline"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Key className="mr-2 h-4 w-4" />
                )}
                Sign in with Google
              </Button>
            </TabsContent>
            <TabsContent value="email">
              <form onSubmit={handleEmailAuth} className="space-y-4">
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter your name"
                      value={authState.name}
                      onChange={handleInputChange}
                      required
                      className="bg-zinc-700 border-zinc-600 text-zinc-100"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={authState.email}
                    onChange={handleInputChange}
                    required
                    className="bg-zinc-700 border-zinc-600 text-zinc-100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={authState.password}
                    onChange={handleInputChange}
                    required
                    className="bg-zinc-700 border-zinc-600 text-zinc-100"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading && (
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isLogin ? "Sign In" : "Sign Up"}
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="phone">
              <form onSubmit={handlePhoneAuth} className="space-y-4">
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter your name"
                      value={authState.name}
                      onChange={handleInputChange}
                      required
                      className="bg-zinc-700 border-zinc-600 text-zinc-100"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={authState.phone}
                    onChange={handleInputChange}
                    required
                    className="bg-zinc-700 border-zinc-600 text-zinc-100"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="verificationCode">Verification Code</Label>
                    <Button
                      type="button"
                      variant="link"
                      onClick={sendVerificationCode}
                      className="text-sm text-zinc-400"
                    >
                      Send Code
                    </Button>
                  </div>
                  <Input
                    id="verificationCode"
                    name="verificationCode"
                    placeholder="Enter verification code"
                    value={authState.verificationCode}
                    onChange={handleInputChange}
                    required
                    className="bg-zinc-700 border-zinc-600 text-zinc-100"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading && (
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isLogin ? "Sign In" : "Sign Up"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-zinc-400 text-center w-full">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <Button
              variant="link"
              className="p-0 text-zinc-100"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
