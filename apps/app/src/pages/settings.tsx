import { useState, type FormEvent } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@meusocialmedia/ui';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from '@meusocialmedia/ui';
import { Button } from '@meusocialmedia/ui';
import { Input } from '@meusocialmedia/ui';
import { Label } from '@meusocialmedia/ui';
import { Switch } from '@meusocialmedia/ui';
import { Badge } from '@meusocialmedia/ui';
import { Separator } from '@meusocialmedia/ui';
import { Avatar, AvatarFallback } from '@meusocialmedia/ui';

export function SettingsPage() {
  const [profileSaved, setProfileSaved] = useState(false);

  function handleProfileSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Would call API
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Configurações</h2>
        <p className="text-muted-foreground">Gerencie sua conta e preferências</p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList className="mb-4">
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="subscription">Assinatura</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
        </TabsList>

        {/* Profile tab */}
        <TabsContent value="profile">
          <form onSubmit={handleProfileSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Perfil</CardTitle>
                <CardDescription>Atualize suas informações pessoais</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="text-lg">U</AvatarFallback>
                  </Avatar>
                  <Button type="button" variant="outline" size="sm">
                    Alterar foto
                  </Button>
                </div>

                <Separator />

                <div className="space-y-1.5">
                  <Label htmlFor="name">Nome</Label>
                  <Input id="name" name="name" defaultValue="Usuário" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" name="email" type="email" defaultValue="usuario@email.com" />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">
                  {profileSaved ? 'Salvo!' : 'Salvar alterações'}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </TabsContent>

        {/* Subscription tab */}
        <TabsContent value="subscription">
          <Card>
            <CardHeader>
              <CardTitle>Assinatura</CardTitle>
              <CardDescription>Gerencie seu plano e cobrança</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="font-semibold">Plano Standard</p>
                  <p className="text-sm text-muted-foreground">5 contas • 30 posts/mês • Analytics básico</p>
                </div>
                <Badge>Ativo</Badge>
              </div>

              <Separator />

              <div className="space-y-3">
                <p className="text-sm font-medium">Faça upgrade para mais recursos</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Card className="border-2 border-primary/20">
                    <CardContent className="pt-4">
                      <p className="font-semibold">Premium</p>
                      <p className="text-2xl font-bold mt-1">
                        R$79 <span className="text-sm font-normal text-muted-foreground">/mês</span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        15 contas • Ilimitado • IA inclusa
                      </p>
                      <Button size="sm" className="mt-3 w-full">Fazer upgrade</Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-4">
                      <p className="font-semibold">Enterprise</p>
                      <p className="text-2xl font-bold mt-1">
                        R$249 <span className="text-sm font-normal text-muted-foreground">/mês</span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Ilimitado • Equipe • Suporte dedicado
                      </p>
                      <Button size="sm" variant="outline" className="mt-3 w-full">
                        Falar com vendas
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notificações</CardTitle>
              <CardDescription>Controle quais notificações você recebe</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: 'Publicações agendadas', description: 'Aviso antes de uma publicação ir ao ar', id: 'notif-scheduled' },
                { label: 'Publicações publicadas', description: 'Confirmação quando uma publicação for ao ar', id: 'notif-published' },
                { label: 'Falhas de publicação', description: 'Alertas quando uma publicação falhar', id: 'notif-failed', defaultChecked: true },
                { label: 'Relatórios semanais', description: 'Resumo semanal de desempenho por e-mail', id: 'notif-weekly' },
                { label: 'Novidades do produto', description: 'Atualizações e novos recursos', id: 'notif-product' },
              ].map(({ label, description, id, defaultChecked }) => (
                <div key={id} className="flex items-center justify-between py-1">
                  <div>
                    <p className="text-sm font-medium">{label}</p>
                    <p className="text-xs text-muted-foreground">{description}</p>
                  </div>
                  <Switch id={id} defaultChecked={defaultChecked} />
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button>Salvar preferências</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
