import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createActivity } from '../api/client';

export default function ActivityForm() {
  const qc = useQueryClient();
  const [name, setName] = useState('');

  const mutation = useMutation({
    mutationFn: (data: string) => createActivity(data.trim()),
    onSuccess: () => {
      setName('');
      qc.invalidateQueries({ queryKey: ['activities'] });
    },
    onError: (error) => {
      // Handle error here if needed
      console.error('Error creating activity:', error);
    },
  });

  const { isPending, mutate } = mutation;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && !isPending) {
      mutate(name);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', gap: 8, marginBottom: 8 }}
    >
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Activity name"
        disabled={isPending}
      />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Adding…' : 'Add'}
      </button>
    </form>
  );
}
