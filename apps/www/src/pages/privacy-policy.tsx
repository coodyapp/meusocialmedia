export default function PrivacyPolicyPage() {
  return (
    <main className="container mx-auto max-w-3xl px-4 py-16">
      <h1 className="mb-8 text-4xl font-bold">Política de Privacidade</h1>

      <section className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
        <p>
          A <strong>Meu Social Media</strong> respeita a sua privacidade. Esta política descreve como
          coletamos, usamos e protegemos suas informações pessoais.
        </p>

        <h2 className="text-2xl font-semibold">Dados coletados</h2>
        <p>
          Coletamos dados que você nos fornece ao criar uma conta (nome, telefone, e-mail) e dados
          gerados durante o uso do serviço (publicações, análises, sessões).
        </p>

        <h2 className="text-2xl font-semibold">Uso das informações</h2>
        <p>
          Usamos suas informações para operar o serviço, personalizar sua experiência e melhorar
          nossos produtos. Não vendemos seus dados a terceiros.
        </p>

        <h2 className="text-2xl font-semibold">Segurança</h2>
        <p>
          Suas senhas são armazenadas com hash criptográfico. Todas as comunicações são criptografadas
          via HTTPS.
        </p>

        <h2 className="text-2xl font-semibold">Seus direitos (LGPD)</h2>
        <p>
          Você pode solicitar acesso, correção ou exclusão dos seus dados a qualquer momento pelo
          e-mail <a href="mailto:privacidade@meusocialmedia.com.br">privacidade@meusocialmedia.com.br</a>.
        </p>

        <h2 className="text-2xl font-semibold">Contato</h2>
        <p>
          Dúvidas? Entre em contato pelo e-mail{" "}
          <a href="mailto:contato@meusocialmedia.com.br">contato@meusocialmedia.com.br</a>.
        </p>
      </section>
    </main>
  );
}
