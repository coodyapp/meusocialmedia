import { type ReactNode } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from '@meusocialmedia/ui';
import { Avatar, AvatarFallback } from '@meusocialmedia/ui';
import { Separator } from '@meusocialmedia/ui';
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  Users,
  Settings,
  PlusCircle,
} from 'lucide-react';
import { cn } from '@meusocialmedia/ui';

const navItems = [
  { to: '/dashboard', label: 'Painel', icon: LayoutDashboard },
  { to: '/posts', label: 'Publicações', icon: FileText },
  { to: '/analytics', label: 'Análises', icon: BarChart3 },
  { to: '/accounts', label: 'Contas', icon: Users },
  { to: '/settings', label: 'Configurações', icon: Settings },
] as const;

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2 py-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
              MS
            </div>
            <span className="font-semibold text-sm">Meu Social Media</span>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarMenu>
            {navItems.map(({ to, label, icon: Icon }) => (
              <SidebarMenuItem key={to}>
                <SidebarMenuButton asChild isActive={currentPath === to || currentPath.startsWith(to + '/')}>
                  <Link to={to} className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>

          <Separator className="my-2" />

          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/posts/new" className="flex items-center gap-2 text-primary">
                  <PlusCircle className="h-4 w-4" />
                  <span>Nova Publicação</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter>
          <div className="flex items-center gap-2 px-2 py-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-medium truncate">Usuário</span>
              <span className="text-xs text-muted-foreground truncate">usuario@email.com</span>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="flex h-14 items-center gap-2 border-b px-4">
          <SidebarTrigger className={cn('-ml-1')} />
          <Separator orientation="vertical" className="h-4" />
          <h1 className="text-sm font-medium text-muted-foreground">
            {navItems.find((n) => currentPath === n.to || currentPath.startsWith(n.to + '/'))?.label ?? 'Meu Social Media'}
          </h1>
        </header>
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
