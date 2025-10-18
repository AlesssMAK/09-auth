import { Metadata } from 'next';
import css from './NotFound.module.css';

export const metadata: Metadata = {
  title: 'Not-found',
  description: 'No such page exists',
  openGraph: {
    title: 'Not-found',
    description: 'No such page exists',
    url: 'https://09-auth-nu-sepia.vercel.app/not-found',
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

const NotFound = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
