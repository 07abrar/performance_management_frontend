import React, { useState, useMemo } from 'react';
import dayjs from 'dayjs';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createTrack, listActivities, listUsers, TrackInput } from '../api/client';
import TimePicker5Min from './TimePicker5Min';

export default function TrackForm() {
  const qc = useQueryClient();

  const { data: users, isLoading: loadingUsers, isError: usersError, error: usersErr } = useQuery({
    queryKey: ['users'],
    queryFn: listUsers,
  });
  const {
    data: activities,
    isLoading: loadingActivities,
    isError: activitiesError,
    error: activitiesErr,
  } = useQuery({
    queryKey: ['activities'],
    queryFn: listActivities,
  });

  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [start, setStart] = useState('09:00');
  const [end, setEnd] = useState('10:00');
  const [userId, setUserId] = useState<number | ''>('');
  const [activityId, setActivityId] = useState<number | ''>('');
  const [comment, setComment] = useState('');

  const mutation = useMutation({
    mutationFn: (input: TrackInput) => createTrack(input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['tracks'] });
      setComment('');
    },
  });

  const disabled =
    mutation.isLoading || loadingUsers || loadingActivities || usersError || activitiesError;

  const errorMsg = useMemo(() => {
    if (usersError) return (usersErr as Error).message;
    if (activitiesError) return (activitiesErr as Error).message;
    if (mutation.isError) return (mutation.error as Error).message;
    return '';
  }, [usersError, usersErr, activitiesError, activitiesErr, mutation.isError, mutation.error]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userId === '' || activityId === '') return;
    const startISO = dayjs(`${date}T${start}:00`).toISOString();
    const endISO = dayjs(`${date}T${end}:00`).toISOString();
    if (dayjs(endISO).isSameOrBefore(dayjs(startISO))) return; // require end > start (same day)
    mutation.mutate({
      user_id: userId,
      activity_id: activityId,
      start_time: startISO,
      end_time: endISO,
      comment: comment.trim() || null,
    });
  };

  return (
    <form
      onSubmit={submit}
      style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}
    >
      {(loadingUsers || loadingActivities) && <p>Loading lookups…</p>}
      {errorMsg && <p style={{ color: 'crimson' }}>{errorMsg}</p>}

      <label>
        Date{' '}
        <input type="date" value={date} onChange={e => setDate(e.target.value)} disabled={disabled} />
      </label>

      <label>
        Start <TimePicker5Min value={start} onChange={setStart} />
      </label>

      <label>
        End <TimePicker5Min value={end} onChange={setEnd} />
      </label>

      <label>
        User
        <select
          value={userId}
          onChange={e => setUserId(e.target.value ? Number(e.target.value) : '')}
          disabled={disabled}
        >
          <option value="">Select user</option>
          {users?.map(u => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Activity
        <select
          value={activityId}
          onChange={e => setActivityId(e.target.value ? Number(e.target.value) : '')}
          disabled={disabled}
        >
          <option value="">Select activity</option>
          {activities?.map(a => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>
      </label>

      <label style={{ gridColumn: '1 / -1' }}>
        Comment
        <input
          value={comment}
          onChange={e => setComment(e.target.value)}
          placeholder="Optional"
          disabled={mutation.isLoading}
        />
      </label>

      <div style={{ gridColumn: '1 / -1' }}>
        <button type="submit" disabled={disabled}>
          {mutation.isLoading ? 'Adding…' : 'Add Track'}
        </button>
      </div>
    </form>
  );
}
