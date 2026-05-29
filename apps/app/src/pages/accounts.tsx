import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@meusocialmedia/ui';
import { Button } from '@meusocialmedia/ui';
import { Badge } from '@meusocialmedia/ui';
import { Skeleton } from '@meusocialmedia/ui';
import { Separator } from '@meusocialmedia/ui';
import { Instagram, Twitter, Linkedin, Facebook, Link2Off, ExternalLink } from 'lucide-react';
import { listAccounts, connectAccount, disconnectAccount } from '@/api/accounts';
import type { SocialPlatform } from '@meusocialmedia/types';

const platformConfig: Record<
  SocialPlatform,
  { label: string; Icon: React.ElementType; color: string }
> = {
  instagram: { label: 'Instagram', Icon: Instagram, color: 'text-pink-500' },
  twitter: { label: 'Twitter / X', Icon: Twitter, color: 'text-sky-500' },
  linkedin: { label: 'LinkedIn', Icon: Linkedin, color: 'text-blue-700' },
  facebook: { label: 'Facebook', Icon: Facebook, color: 'text-blue-500' },
  tiktok: {
    label: 'TikTok',
    Icon: () => (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
      </svg>
    ),
    color: 'text-foreground',
  },
};

const allPlatforms: SocialPlatform[] = ['instagram', 'twitter', 'linkedin', 'facebook', 'tiktok'];

export function AccountsPage() {
  const queryClient = useQueryClient();

  const { data: accounts, isLoading } = useQuery({
    queryKey: ['accounts'],
    queryFn: listAccounts,
  });

  const connectMutation = useMutation({
    mutationFn: connectAccount,
    onSuccess: (data) => {
      window.location.href = data.redirectUrl;
    },
  });

  const disconnectMutation = useMutation({
    mutationFn: disconnectAccount,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },
  });

  const connectedPlatforms = new Set(accounts?.map((a) => a.platform) ?? []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Contas Conectadas</h2>
        <p className="text-muted-foreground">Gerencie suas contas de redes sociais</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Suas Contas</CardTitle>
          <CardDescription>Conecte e desconecte suas plataformas de redes sociais</CardDescription>
        </CardHeader>
        <CardContent className="space-y-1">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full rounded-lg" />
            ))
          ) : (
            allPlatforms.map((platform, idx) => {
              const config = platformConfig[platform];
              const Icon = config.Icon;
              const connected = connectedPlatforms.has(platform);
              const account = accounts?.find((a) => a.platform === platform);

              return (
                <div key={platform}>
                  {idx > 0 && <Separator className="my-1" />}
                  <div className="flex items-center justify-between py-3 px-1">
                    <div className="flex items-center gap-3">
                      <span className={config.color}>
                        <Icon />
                      </span>
                      <div>
                        <p className="font-medium text-sm">{config.label}</p>
                        {account && (
                          <p className="text-xs text-muted-foreground">@{account.handle}</p>
                        )}
                      </div>
                      {connected && (
                        <Badge variant="secondary" className="text-xs">
                          Conectado
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {connected ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => account && disconnectMutation.mutate(account.id)}
                          disabled={disconnectMutation.isPending}
                        >
                          <Link2Off className="mr-2 h-4 w-4" />
                          Desconectar
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => connectMutation.mutate(platform)}
                          disabled={connectMutation.isPending}
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Conectar
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>
    </div>
  );
}
