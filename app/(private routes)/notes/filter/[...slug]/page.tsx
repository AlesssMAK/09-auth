import { fetchNotes } from '@/lib/api/clientApi';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';
import NoteClient from './Notes.client';

interface FiltersPageProps {
  params: Promise<{ slug: string[] }>;
}

export const generateMetadata = async ({
  params,
}: FiltersPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const tag = slug[0] == 'All' ? undefined : slug[0];
  return {
    title: tag ? `Notes: ${tag}` : 'Notes: All',
    description: tag ? `Notes filtered by tag: ${tag}` : 'All notes',
    openGraph: {
      title: tag ? `Notes: ${tag}` : 'Notes: All',
      description: tag ? `Notes filtered by tag: ${tag}` : 'All notes',
      url: `https://09-auth-nu-sepia.vercel.app/notes/filter/${slug[0]}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'NoteHub',
        },
      ],
      type: 'article',
    },
  };
};

const FiltersPage = async ({ params }: FiltersPageProps) => {
  const queryClient = new QueryClient();

  const debouncedSearch = '';
  const page = 1;

  const { slug } = await params;
  const tag = slug[0] == 'All' ? undefined : slug[0];

  await queryClient.prefetchQuery({
    queryKey: ['notes', debouncedSearch, page, tag],
    queryFn: () => fetchNotes(debouncedSearch, page, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteClient tag={tag} />
    </HydrationBoundary>
  );
};

export default FiltersPage;
