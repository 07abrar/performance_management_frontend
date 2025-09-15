import React, { useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  listTracks,
  listUsers,
  listActivities,
  deleteTrack,
} from '../api/client';

export default function TrackList() {
  const qc = useQueryClient();

  const {
    data: tracks,
    isLoading: loadingTracks,
    isError: tracksError,
    error: tracksErr,
  } = useQuery({ queryKey: ['tracks'], queryFn: listTracks });

  const {
    data: users,
    isLoading: loadingUsers,
    isError: usersError,
    error: usersErr,
  } = useQuery({ queryKey: ['users'], queryFn: listUsers });

  const {
    data: activities,
    isLoading: loadingActivities,
    isError: activitiesError,
    error: activitiesErr,
  } = useQuery({ queryKey: ['activities'], queryFn: listActivities });

  const delMutation = useMutation({
    mutationFn: (id: number) => deleteTrack(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['tracks'] }),
  });

  const userMap = useMemo(
    () => new Map(users?.map(u => [u.id, u.name])),
    [users]
  );
  const actMap = useMemo(
    () => new Map(activities?.map(a => [a.id, a.name])),
    [activities]
  );

  const uname = (id: number) => userMap.get(id) ?? String(id);
  const aname = (id: number) => actMap.get(id) ?? String(id);

  if (loadingTracks || loadingUsers || loadingActivities) return <p>Loading…</p>;

  if (tracksError)
    return <p style={{ color: 'crimson' }}>{(tracksErr as Error).message}</p>;
  if (usersError)
    return <p style={{ color: 'crimson' }}>{(usersErr as Error).message}</p>;
  if (activitiesError)
    return <p style={{ color: 'crimson' }}>{(activitiesErr as Error).message}</p>;

  if (!tracks || tracks.length === 0) return <p>No tracks yet.</p>;

  return (
    <table style={{ width: '100%', marginTop: 12, borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={{ textAlign: 'left', padding: 6 }}>Start</th>
          <th style={{ textAlign: 'left', padding: 6 }}>End</th>
          <th style={{ textAlign: 'left', padding: 6 }}>User</th>
          <th style={{ textAlign: 'left', padding: 6 }}>Activity</th>
          <th style={{ textAlign: 'left', padding: 6 }}>Comment</th>
          <th style={{ width: 1 }} />
        </tr>
      </thead>
      <tbody>
        {tracks.map(t => (
          <tr key={t.id}>
            <td style={{ padding: 6 }}>{new Date(t.start_time).toLocaleString()}</td>
            <td style={{ padding: 6 }}>{new Date(t.end_time).toLocaleString()}</td>
            <td style={{ padding: 6 }}>{uname(t.user_id)}</td>
            <td style={{ padding: 6 }}>{aname(t.activity_id)}</td>
            <td style={{ padding: 6 }}>{t.comment ?? ''}</td>
            <td style={{ padding: 6 }}>
              <button
                onClick={() => delMutation.mutate(t.id)}
                disabled={delMutation.isLoading}
              >
                {delMutation.isLoading ? 'Deleting…' : 'Delete'}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
