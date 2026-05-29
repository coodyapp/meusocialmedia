import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@meusocialmedia/ui';
import { Button } from '@meusocialmedia/ui';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@meusocialmedia/ui';
import { Badge } from '@meusocialmedia/ui';
import { Skeleton } from '@meusocialmedia/ui';
import { CalendarClock, Users, Bot, TrendingUp, PlusCircle, LinkIcon } from 'lucide-react';
import { listPosts } from '@/api/posts';
import { listAccounts } from '@/api/accounts';
import type { Post } from '@meusocialmedia/types';

const statusLabels: Record<Post['status'], string> = {
  draft: 'Rascunho',
  scheduled: 'Agendado',
  published: 'Publicado',
  failed: 'Falhou',
};

const statusVariant: Record<Post['status'], 'default' | 'secondary' | 'outline' | 'destructive'> = {
  draft: 'secondary',
  scheduled: 'outline',
  published: 'default',
  failed: 'destructive',
};

export function DashboardPage() {
  const { data: posts, isLoading: postsLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: () => listPosts(),
  });

  const { data: accounts, isLoading: accountsLoading } = useQuery({
    queryKey: ['accounts'],
    queryFn: listAccounts,
  });

  const scheduled = posts?.filter((p) => p.status === 'scheduled').length ?? 0;
  const recentPosts = posts?.slice(0, 5) ?? [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Painel</h2>
          <p className="text-muted-foreground">Bem-vindo de volta! Aqui está um resumo.</p>
        </div>
        <Button asChild>
          <Link to="/posts/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Nova Publicação
          </Link>
        </Button>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Posts Agendados</CardTitle>
            <CalendarClock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {postsLoading ? (
              <Skeleton className="h-7 w-12" />
            ) : (
              <div className="text-2xl font-bold">{scheduled}</div>
            )}
            <p className="text-xs text-muted-foreground mt-1">próximas publicações</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Contas Conectadas</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {accountsLoading ? (
              <Skeleton className="h-7 w-12" />
            ) : (
              <div className="text-2xl font-bold">{accounts?.length ?? 0}</div>
            )}
            <p className="text-xs text-muted-foreground mt-1">plataformas ativas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Tarefas de IA</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">—</div>
            <p className="text-xs text-muted-foreground mt-1">este mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Alcance Total</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">—</div>
            <p className="text-xs text-muted-foreground mt-1">últimos 30 dias</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick actions */}
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" asChild>
          <Link to="/posts/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Criar Publicação
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/accounts">
            <LinkIcon className="mr-2 h-4 w-4" />
            Conectar Conta
          </Link>
        </Button>
      </div>

      {/* Recent posts */}
      <Card>
        <CardHeader>
          <CardTitle>Publicações Recentes</CardTitle>
          <CardDescription>Suas últimas 5 publicações</CardDescription>
        </CardHeader>
        <CardContent>
          {postsLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          ) : recentPosts.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">
              Nenhuma publicação ainda.{' '}
              <Link to="/posts/new" className="text-primary underline underline-offset-4">
                Criar agora
              </Link>
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Conteúdo</TableHead>
                  <TableHead>Plataforma</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentPosts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="max-w-[200px] truncate font-medium">
                      {post.content}
                    </TableCell>
                    <TableCell className="capitalize">{post.platform}</TableCell>
                    <TableCell>
                      <Badge variant={statusVariant[post.status]}>
                        {statusLabels[post.status]}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {post.scheduledAt
                        ? new Date(post.scheduledAt).toLocaleDateString('pt-BR')
                        : new Date(post.createdAt).toLocaleDateString('pt-BR')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
