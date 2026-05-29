import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@meusocialmedia/ui';
import { PlusCircle, Trash2 } from 'lucide-react';
import { listPosts, deletePost } from '@/api/posts';
import type { Post } from '@meusocialmedia/types';

const statusLabels: Record<Post['status'] | 'all', string> = {
  all: 'Todos',
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

export function PostsPage() {
  const [statusFilter, setStatusFilter] = useState<Post['status'] | 'all'>('all');
  const queryClient = useQueryClient();

  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts', statusFilter],
    queryFn: () => listPosts(statusFilter === 'all' ? undefined : statusFilter),
  });

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Publicações</h2>
          <p className="text-muted-foreground">Gerencie todas as suas publicações</p>
        </div>
        <Button asChild>
          <Link to="/posts/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Nova Publicação
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Lista de Publicações</CardTitle>
          <Select
            value={statusFilter}
            onValueChange={(v) => setStatusFilter(v as Post['status'] | 'all')}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              {(Object.keys(statusLabels) as (Post['status'] | 'all')[]).map((s) => (
                <SelectItem key={s} value={s}>
                  {statusLabels[s]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : !posts || posts.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              Nenhuma publicação encontrada.{' '}
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
                  <TableHead>Agendado para</TableHead>
                  <TableHead className="w-[60px]" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="max-w-[260px] truncate font-medium">
                      {post.content}
                    </TableCell>
                    <TableCell className="capitalize">{post.platform}</TableCell>
                    <TableCell>
                      <Badge variant={statusVariant[post.status]}>
                        {statusLabels[post.status]}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {post.scheduledAt
                        ? new Date(post.scheduledAt).toLocaleString('pt-BR')
                        : '—'}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => deleteMutation.mutate(post.id)}
                        disabled={deleteMutation.isPending}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Excluir</span>
                      </Button>
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
