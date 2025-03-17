
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

type AuthMode = 'login' | 'register';

const AuthForm = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
    
    try {
      // This is where you would integrate with your authentication service
      // For now, we'll mock a successful authentication
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (mode === 'register') {
        toast({
          title: "Account created",
          description: "Your account has been created successfully.",
        });
      } else {
        toast({
          title: "Welcome back",
          description: "You have been logged in successfully.",
        });
      }
      
      // Navigate to dashboard on success
      window.location.href = '/dashboard';
    } catch (error) {
      toast({
        title: "Authentication failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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
