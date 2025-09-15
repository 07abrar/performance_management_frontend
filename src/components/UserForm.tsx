import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUser } from '../api/client';

export default function UserForm() {
  const qc = useQueryClient();
  const [name, setName] = useState('');

  const mutation = useMutation({
    mutationFn: () => createUser(name.trim()),
    onSuccess: () => {
      setName('');
      qc.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && !mutation.isLoading) {
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
        placeholder="User name"
        disabled={mutation.isLoading}
      />
      <button type="submit" disabled={mutation.isLoading}>
        {mutation.isLoading ? 'Adding…' : 'Add'}
      </button>
    </form>
  );
}
