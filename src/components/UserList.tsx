import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUser, listUsers } from '../api/client';

export default function UserList() {
  const qc = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['users'],
    queryFn: listUsers,
  });

  const delMutation = useMutation({
    mutationFn: (id: number) => deleteUser(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['users'] }),
  });

  if (isLoading) return <p>Loading users…</p>;
  if (isError) return <p style={{ color: 'crimson' }}>{(error as Error).message}</p>;

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {data?.map(u => (
        <li
          key={u.id}
          style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}
        >
          <span>{u.name}</span>
          <button
            onClick={() => delMutation.mutate(u.id)}
            disabled={delMutation.isPending}
          >
            {delMutation.isPending ? 'Deleting…' : 'Delete'}
          </button>
        </li>
      ))}
      {data?.length === 0 && <li>No users yet.</li>}
    </ul>
  );
}
