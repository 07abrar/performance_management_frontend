import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createActivity } from '../api/client';

export default function ActivityForm() {
  const qc = useQueryClient();
  const [name, setName] = useState('');

  const mutation = useMutation({
    mutationFn: () => createActivity(name.trim()),
    onSuccess: () => {
      setName('');
      qc.invalidateQueries({ queryKey: ['activities'] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && !mutation.isPending) {
      mutation.mutate();
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
        disabled={mutation.isPending}
      />
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? 'Adding…' : 'Add'}
      </button>
    </form>
  );
}
