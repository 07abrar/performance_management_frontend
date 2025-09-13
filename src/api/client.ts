const BASE =
  process.env.API_BASE?.replace(/\/$/, '') || 'http://localhost:8000/api';

export type User = { id: number; name: string };
export type Activity = { id: number; name: string };
export type Track = {
  id: number;
  user_id: number;
  activity_id: number;
  start_time: string;
  end_time: string;
  comment?: string | null;
};

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });
  if (!res.ok) {
    const msg = await res.text().catch(() => '');
    throw new Error(`${res.status} ${res.statusText} ${msg}`);
  }
  return res.json();
}

// Users
export const listUsers = () => api<User[]>('/users/');
export const createUser = (name: string) =>
  api<User>('/users/', { method: 'POST', body: JSON.stringify({ name }) });
export const deleteUser = (id: number) =>
  api<void>(`/users/${id}`, { method: 'DELETE' });

// Activities
export const listActivities = () => api<Activity[]>('/activities/');
export const createActivity = (name: string) =>
  api<Activity>('/activities/', { method: 'POST', body: JSON.stringify({ name }) });
export const deleteActivity = (id: number) =>
  api<void>(`/activities/${id}`, { method: 'DELETE' });

// Tracks
export type TrackInput = Omit<Track, 'id'>;
export const listTracks = () => api<Track[]>('/tracks/');
export const createTrack = (input: TrackInput) =>
  api<Track>('/tracks/', { method: 'POST', body: JSON.stringify(input) });
export const deleteTrack = (id: number) =>
  api<void>(`/tracks/${id}`, { method: 'DELETE' });

// Recap
export type RecapEntry = {
  activity_id: number;
  activity_name: string;
  minutes: number;
  percentage: number;
};
export type RecapOut = {
  period: string;
  start: string;
  end: string;
  total_minutes: number;
  items: RecapEntry[];
};

export const recapDaily = (date: string) =>
  api<RecapOut>(`/recap/daily?date=${encodeURIComponent(date)}`);
export const recapWeekly = (startDate: string) =>
  api<RecapOut>(`/recap/weekly?start_date=${encodeURIComponent(startDate)}`);
export const recapMonthly = (year: number, month: number) =>
  api<RecapOut>(`/recap/monthly?year=${year}&month=${month}`);
