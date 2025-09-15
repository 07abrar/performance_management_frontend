import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteActivity, listActivities } from '../api/client';

export default function ActivityList() {
  const qc = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['activities'],
    queryFn: listActivities,
  });

  const delMutation = useMutation({
    mutationFn: (id: number) => deleteActivity(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['activities'] }),
  });

  if (isLoading) return <p>Loading activities…</p>;
  if (isError) return <p style={{ color: 'crimson' }}>{(error as Error).message}</p>;

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {data?.map(a => (
        <li
          key={a.id}
          style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}
        >
          <span>{a.name}</span>
          <button
            onClick={() => delMutation.mutate(a.id)}
            disabled={delMutation.isPending}
          >
            {delMutation.isPending ? 'Deleting…' : 'Delete'}
          </button>
        </li>
      ))}
      {data?.length === 0 && <li>No activities yet.</li>}
    </ul>
  );
}
