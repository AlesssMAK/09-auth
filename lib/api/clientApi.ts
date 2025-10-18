import type { NewNoteContent, Note, NoteHttpRequest } from '../../types/note';
import nextServer from './api';
import { User } from '@/types/user';

export type UserRegister = {
  email: string;
  password: string;
};

type CheckSessionRequest = {
  success: boolean;
};

export type UpdateUserRequest = {
  username: string;
};

export const fetchNotes = async (
  search: string,
  page: number,
  tag?: string
): Promise<NoteHttpRequest> => {
  const params = {
    search,
    page,
    perPage: 12,
    tag,
  };

  const res = await nextServer.get<NoteHttpRequest>('/notes', { params });
  console.log(res.data);

  return res.data;
};

export const createNote = async (newNote: NewNoteContent): Promise<Note> => {
  const res = await nextServer.post<Note>('/notes', newNote);
  return res.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const res = await nextServer.delete<Note>(`/notes/${id}`);
  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await nextServer.get<Note>(`/notes/${id}`);
  return res.data;
};

export async function register(data: UserRegister) {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
}

export async function login(data: UserRegister) {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
}

export async function logout(): Promise<void> {
  await nextServer.post('/auth/logout');
}

export async function checkSession() {
  const res = await nextServer.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
}

export async function getMe() {
  const { data } = await nextServer.get<User>('/users/me');
  return data;
}

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await nextServer.patch<User>('/users/me', payload);
  return res.data;
};
