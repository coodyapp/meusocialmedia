import { useState, type FormEvent } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@meusocialmedia/ui';
import { Button } from '@meusocialmedia/ui';
import { Label } from '@meusocialmedia/ui';
import { Textarea } from '@meusocialmedia/ui';
import { Input } from '@meusocialmedia/ui';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@meusocialmedia/ui';
import { createPost } from '@/api/posts';
import type { SocialPlatform } from '@meusocialmedia/types';

const platforms: { value: SocialPlatform; label: string; maxChars: number }[] = [
  { value: 'instagram', label: 'Instagram', maxChars: 2200 },
  { value: 'twitter', label: 'Twitter / X', maxChars: 280 },
  { value: 'linkedin', label: 'LinkedIn', maxChars: 3000 },
  { value: 'facebook', label: 'Facebook', maxChars: 63206 },
  { value: 'tiktok', label: 'TikTok', maxChars: 2200 },
];

export function NewPostPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [platform, setPlatform] = useState<SocialPlatform>('instagram');
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);

  const selectedPlatform = platforms.find((p) => p.value === platform)!;
  const charsLeft = selectedPlatform.maxChars - content.length;
  const overLimit = charsLeft < 0;

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['posts'] });
      await navigate({ to: '/posts' });
    },
    onError: (err) => {
      setError(err instanceof Error ? err.message : 'Erro ao criar publicação');
    },
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!content.trim()) {
      setError('O conteúdo não pode estar vazio');
      return;
    }
    if (overLimit) {
      setError(`O conteúdo excede o limite de ${selectedPlatform.maxChars} caracteres`);
      return;
    }

    const formData = new FormData(e.currentTarget);
    const accountId = formData.get('accountId') as string;
    const scheduledAt = formData.get('scheduledAt') as string;

    mutation.mutate({
      accountId: accountId || 'default',
      platform,
      content,
      ...(scheduledAt ? { scheduledAt: new Date(scheduledAt).toISOString() } : {}),
    });
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Nova Publicação</h2>
        <p className="text-muted-foreground">Crie e agende uma nova publicação</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Conteúdo da Publicação</CardTitle>
            <CardDescription>Preencha os detalhes da publicação abaixo</CardDescription>
          </CardHeader>

          <CardContent className="space-y-5">
            {error && (
              <div role="alert" className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="platform">Plataforma</Label>
              <Select value={platform} onValueChange={(v) => setPlatform(v as SocialPlatform)}>
                <SelectTrigger id="platform">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {platforms.map((p) => (
                    <SelectItem key={p.value} value={p.value}>
                      {p.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="content">Conteúdo</Label>
                <span className={`text-xs ${overLimit ? 'text-destructive font-medium' : 'text-muted-foreground'}`}>
                  {charsLeft} restantes
                </span>
              </div>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Escreva o conteúdo da sua publicação..."
                rows={6}
                className={overLimit ? 'border-destructive' : ''}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="scheduledAt">Agendar para (opcional)</Label>
              <Input
                id="scheduledAt"
                name="scheduledAt"
                type="datetime-local"
                min={new Date().toISOString().slice(0, 16)}
              />
            </div>
          </CardContent>

          <CardFooter className="flex gap-3">
            <Button type="submit" disabled={mutation.isPending || overLimit}>
              {mutation.isPending ? 'Salvando...' : 'Publicar'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => void navigate({ to: '/posts' })}
            >
              Cancelar
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
