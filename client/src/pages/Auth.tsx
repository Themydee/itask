
import React from 'react';
import AuthForm from '../components/auth/AuthForm';

const Auth = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-muted/50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-fade-in">
          <div className="w-16 h-16 rounded-2xl bg-primary mx-auto flex items-center justify-center text-primary-foreground font-bold text-2xl mb-4">iT</div>
          <h1 className="text-3xl font-bold tracking-tight">iTask</h1>
          <p className="text-muted-foreground mt-2">Organize your tasks by priority</p>
        </div>
        <AuthForm />
      </div>
    </div>
  );
};

export default Auth;
