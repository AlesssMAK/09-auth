import NoteForm from '@/components/NoteForm/NoteForm';
import css from './CreateNote.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create note',
  description: 'Creating a new note in NoteHub.',
  openGraph: {
    title: 'Create note',
    description: 'Creating a new note in NoteHub.',
    url: 'https://08-zustand-three-delta.vercel.app/notes/action/create',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHUb',
      },
    ],
    type: 'article',
  },
};

const CreateNote = () => {
  return (
    <div>
      <main className={css.main}>
        <div className={css.container}>
          <h1 className={css.title}>Create note</h1>
          <NoteForm />
        </div>
      </main>
    </div>
  );
};

export default CreateNote;
