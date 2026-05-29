export default function TermsOfServicePage() {
  return (
    <main className="container mx-auto max-w-3xl px-4 py-16">
      <h1 className="mb-8 text-4xl font-bold">Termos de Serviço</h1>

      <section className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
        <p>
          Ao usar o <strong>Meu Social Media</strong> você concorda com estes termos. Leia com atenção.
        </p>

        <h2 className="text-2xl font-semibold">Uso aceitável</h2>
        <p>
          O serviço deve ser usado apenas para fins legais. É proibido publicar conteúdo ilegal,
          enganoso ou que viole direitos de terceiros.
        </p>

        <h2 className="text-2xl font-semibold">Conta</h2>
        <p>
          Você é responsável por manter a confidencialidade das suas credenciais e por todas as
          atividades realizadas na sua conta.
        </p>

        <h2 className="text-2xl font-semibold">Pagamentos</h2>
        <p>
          Os planos pagos são cobrados mensalmente via cartão de crédito. O cancelamento pode ser
          feito a qualquer momento e tem efeito no final do período pago.
        </p>

        <h2 className="text-2xl font-semibold">Propriedade intelectual</h2>
        <p>
          O conteúdo que você publica permanece de sua propriedade. Ao usar o serviço, você nos
          concede licença limitada para processar e exibir esse conteúdo.
        </p>

        <h2 className="text-2xl font-semibold">Limitação de responsabilidade</h2>
        <p>
          O serviço é fornecido "como está". Não garantimos disponibilidade ininterrupta e não nos
          responsabilizamos por danos indiretos decorrentes do uso.
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
