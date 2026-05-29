import { type ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-lg mb-3">
            MS
          </div>
          <h1 className="text-2xl font-bold">Meu Social Media</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Gerencie suas redes sociais com inteligência
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}
