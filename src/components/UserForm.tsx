import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUser } from '../api/client';

export default function UserForm() {
  const qc = useQueryClient();
  const [name, setName] = useState('');

  const mutation = useMutation({
    mutationFn: (input: { name: string }) => createUser(input.name),
    onSuccess: () => {
      setName('');
      qc.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && !mutation.isPending) {
      mutation.mutate({ name: name.trim() });
      setName('');
    }
  };

  return (
    <form
      onSubmit={submit}
      style={{ display: 'flex', gap: 8, marginBottom: 8 }}
    >
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="User name"
        disabled={mutation.isPending}
      />
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? 'Adding…' : 'Add'}
      </button>
    </form>
  );
}
