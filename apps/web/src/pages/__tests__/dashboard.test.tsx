import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DashboardPage } from '../dashboard';

// Mock API modules
vi.mock('@/api/posts', () => ({
  listPosts: vi.fn().mockResolvedValue([
    {
      id: '1',
      userId: 'u1',
      accountId: 'a1',
      content: 'Post de teste',
      mediaUrls: [],
      status: 'scheduled',
      platform: 'instagram',
      scheduledAt: '2026-06-01T10:00:00.000Z',
      createdAt: '2026-05-28T10:00:00.000Z',
      updatedAt: '2026-05-28T10:00:00.000Z',
    },
  ]),
}));

vi.mock('@/api/accounts', () => ({
  listAccounts: vi.fn().mockResolvedValue([
    {
      id: 'a1',
      userId: 'u1',
      platform: 'instagram',
      handle: 'meuperfil',
    },
  ]),
}));

// Mock TanStack Router
vi.mock('@tanstack/react-router', () => ({
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
  useRouterState: () => ({ location: { pathname: '/dashboard' } }),
}));

function renderWithClient(ui: React.ReactElement) {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(<QueryClientProvider client={client}>{ui}</QueryClientProvider>);
}

describe('DashboardPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the page heading', () => {
    renderWithClient(<DashboardPage />);
    expect(screen.getByText('Painel')).toBeInTheDocument();
  });

  it('renders stat cards', () => {
    renderWithClient(<DashboardPage />);
    expect(screen.getByText('Posts Agendados')).toBeInTheDocument();
    expect(screen.getByText('Contas Conectadas')).toBeInTheDocument();
    expect(screen.getByText('Tarefas de IA')).toBeInTheDocument();
    expect(screen.getByText('Alcance Total')).toBeInTheDocument();
  });

  it('renders quick action buttons', () => {
    renderWithClient(<DashboardPage />);
    const createButtons = screen.getAllByText(/Criar Publicação|Nova Publicação/);
    expect(createButtons.length).toBeGreaterThan(0);
    expect(screen.getByText('Conectar Conta')).toBeInTheDocument();
  });
});
