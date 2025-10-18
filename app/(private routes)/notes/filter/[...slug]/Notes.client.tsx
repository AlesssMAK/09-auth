'use client';

import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import Text from '@/components/Text/Text';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useDebounce } from 'use-debounce';
import css from './page.module.css';
import { fetchNotes } from '@/lib/api/clientApi';

const NoteClient = ({ tag }: { tag?: string }) => {
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState(1);
  const [debouncedSearch] = useDebounce(search, 500);

  const { data, isSuccess, isLoading, isFetching } = useQuery({
    queryKey: ['notes', debouncedSearch, page, tag],
    queryFn: () => fetchNotes(debouncedSearch, page, tag),
    placeholderData: keepPreviousData,
  });

  if (!isLoading && !isFetching && data?.notes.length === 0) {
    return (
      <Text
        textAlign="center"
        marginBottom="20"
      >
        {' '}
        No notes found for your request.{' '}
      </Text>
    );
  }

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <Toaster />
        <SearchBox
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        {isSuccess && data?.totalPages > 1 && (
          <Pagination
            totalPages={data?.totalPages ?? 0}
            page={page}
            onPageChange={(newPage) => setPage(newPage)}
          />
        )}
        <Link href="/notes/action/create">
          <button className={css.button}>Create note +</button>
        </Link>
      </header>
      {isSuccess && data?.notes?.length > 0 && <NoteList notes={data?.notes} />}
    </div>
  );
};

export default NoteClient;
