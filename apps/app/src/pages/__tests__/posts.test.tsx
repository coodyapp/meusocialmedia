import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PostsPage } from '../posts';

vi.mock('@/api/posts', () => ({
  listPosts: vi.fn().mockResolvedValue([
    {
      id: '1',
      userId: 'u1',
      accountId: 'a1',
      content: 'Conteúdo do post de teste',
      mediaUrls: [],
      status: 'published',
      platform: 'instagram',
      scheduledAt: null,
      publishedAt: '2026-05-28T10:00:00.000Z',
      createdAt: '2026-05-28T10:00:00.000Z',
      updatedAt: '2026-05-28T10:00:00.000Z',
    },
  ]),
  deletePost: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('@tanstack/react-router', () => ({
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
  useRouterState: () => ({ location: { pathname: '/posts' } }),
}));

function renderWithClient(ui: React.ReactElement) {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(<QueryClientProvider client={client}>{ui}</QueryClientProvider>);
}

describe('PostsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the page heading', () => {
    renderWithClient(<PostsPage />);
    expect(screen.getByText('Publicações')).toBeInTheDocument();
  });

  it('renders the new post button', () => {
    renderWithClient(<PostsPage />);
    expect(screen.getByRole('link', { name: /Nova Publicação/i })).toBeInTheDocument();
  });

  it('renders the posts table header', () => {
    renderWithClient(<PostsPage />);
    expect(screen.getByText('Lista de Publicações')).toBeInTheDocument();
  });
});
