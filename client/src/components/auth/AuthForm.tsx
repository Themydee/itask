import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { serverUrl } from '@/App';



type AuthMode = 'login' | 'register';

const AuthForm = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const {signup} = useAuthStore();

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    // Reset form fields when switching modes
    setEmail('');
    setPassword('');
    setName('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // try {
    //   let response;
    //   if (mode === "register") {
    //     response = await fetch(`${serverUrl}/api/auth/signup`, {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify({ name, email, password }),
    //       credentials: "include",
    //     });

    //     if (!response.ok) {
    //       const errorData = await response.json();
    //       throw new Error(errorData.message || "Failed to register");
    //     }

    //     toast({ title: "Success", description: "Account created! Redirecting to login..." });

    //     // ✅ Switch to login mode after successful registration
    //     setTimeout(() => setMode("login"), 2000);
    //   } 
    //   else {
    //     response = await fetch(`${serverUrl}/api/auth/login`, {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify({ email, password }),
    //       credentials: "include",
    //     });

    //     if (!response.ok) {
    //       const errorData = await response.json();
    //       throw new Error(errorData.message || "Failed to login");
    //     }

    //     const data = await response.json();

    //     // ✅ Store user data in localStorage
    //     localStorage.setItem("loggedInUser", JSON.stringify(data.user));
    //     toast({ title: "Success", description: "Login successful! Redirecting..." });

    //     // ✅ Redirect to dashboard after login
    //     navigate("/dashboard");
    //   }
    // } catch (error) {
    //   console.error("Auth error:", error);
    //   toast({ title: "Error", description: error.message, variant: "destructive" });
    // } finally {
    //   setIsLoading(false);
    // }

    try {
      const response = mode === 'register'
        ? await axios.post(`${serverUrl}/api/auth/signup`, { name, email, password }, { withCredentials: true })
        : await axios.post(`${serverUrl}/api/auth/login`, { email, password }, { withCredentials: true });
      setIsLoading(false);
      if (response.status < 200 || response.status >= 300) {
    throw new Error(response.data.message || 'Authentication failed');
  }
      const data = response.data;
      if (mode === 'register') {
        toast({ title: 'Success', description: 'Account created! Redirecting to login...' });
        setTimeout(() => setMode('login'), 2000);
      }
      else {
        // Store user data in the auth store
        signup(data.user);
        toast({ title: 'Success', description: 'Login successful! Redirecting to dashboard...' });
        // Redirect to dashboard
        navigate('/dashboard');
      }

    } catch (error) {
      console.error('Authentication error:', error);
      setIsLoading(false);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'An unexpected error occurred',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="glass-panel animate-scale-in">
        <CardHeader>
          <CardTitle className="text-2xl font-medium">
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </CardTitle>
          <CardDescription>
            {mode === 'login' 
              ? 'Enter your credentials to access your account' 
              : 'Register to start organizing your tasks'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                  className="bg-background/50"
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="bg-background/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="bg-background/50"
              />
            </div>
            <Button
              type="submit"
              className="w-full mt-4"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                mode === 'login' ? 'Sign In' : 'Create Account'
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            variant="link"
            onClick={toggleMode}
            className="text-sm"
          >
            {mode === 'login'
              ? "Don't have an account? Register"
              : 'Already have an account? Sign In'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthForm;
