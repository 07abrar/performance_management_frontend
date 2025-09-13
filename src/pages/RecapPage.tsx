import React, { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { useQuery } from '@tanstack/react-query';
import {
  RecapEntry,
  RecapOut,
  recapDaily,
  recapMonthly,
  recapWeekly,
} from '../api/client';
import { PieChart, Pie, Tooltip, ResponsiveContainer, Legend } from 'recharts';

function RecapChart({ data }: { data: RecapEntry[] }) {
  const chartData = useMemo(
    () => data.map(d => ({ name: d.activity_name, value: d.percentage })),
    [data]
  );
  return (
    <div style={{ width: '100%', height: 360 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie data={chartData} dataKey="value" nameKey="name" label />
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

type Mode = 'daily' | 'weekly' | 'monthly';

export default function RecapPage() {
  const [mode, setMode] = useState<Mode>('daily');
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [weekStart, setWeekStart] = useState(
    dayjs().startOf('week').format('YYYY-MM-DD')
  );
  const [year, setYear] = useState(dayjs().year());
  const [month, setMonth] = useState(dayjs().month() + 1);

  const queryKey = ['recap', mode, date, weekStart, year, month] as const;

  const { data, isLoading, isError, error, refetch, isFetching } = useQuery<RecapOut>({
    queryKey,
    queryFn: () => {
      if (mode === 'daily') return recapDaily(date);
      if (mode === 'weekly') return recapWeekly(weekStart);
      return recapMonthly(year, month);
    },
    keepPreviousData: true,
  });

  return (
    <div>
      <h2>Recap</h2>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        <label>
          <select value={mode} onChange={e => setMode(e.target.value as Mode)}>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </label>

        {mode === 'daily' && (
          <label>
            Date{' '}
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
            />
          </label>
        )}

        {mode === 'weekly' && (
          <label>
            Week start{' '}
            <input
              type="date"
              value={weekStart}
              onChange={e => setWeekStart(e.target.value)}
            />
          </label>
        )}

        {mode === 'monthly' && (
          <>
            <label>
              Year{' '}
              <input
                type="number"
                value={year}
                onChange={e => setYear(Number(e.target.value))}
              />
            </label>
            <label>
              Month{' '}
              <input
                type="number"
                min={1}
                max={12}
                value={month}
                onChange={e => setMonth(Number(e.target.value))}
              />
            </label>
          </>
        )}

        <button onClick={() => refetch()} disabled={isFetching}>
          {isFetching ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>

      {isLoading && <p>Loading…</p>}
      {isError && <p style={{ color: 'crimson' }}>{(error as Error).message}</p>}

      {data && (
        <>
          <p>
            Period: <strong>{data.period}</strong> | From{' '}
            {dayjs(data.start).format('YYYY-MM-DD HH:mm')} to{' '}
            {dayjs(data.end).format('YYYY-MM-DD HH:mm')} | Total minutes:{' '}
            {data.total_minutes}
          </p>

          {data.items.length > 0 ? (
            <>
              <RecapChart data={data.items} />
              <table style={{ marginTop: 12, borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: 6 }}>Activity</th>
                    <th style={{ textAlign: 'right', padding: 6 }}>Minutes</th>
                    <th style={{ textAlign: 'right', padding: 6 }}>%</th>
                  </tr>
                </thead>
                <tbody>
                  {data.items.map(it => (
                    <tr key={it.activity_id}>
                      <td style={{ padding: 6 }}>{it.activity_name}</td>
                      <td style={{ textAlign: 'right', padding: 6 }}>{it.minutes}</td>
                      <td style={{ textAlign: 'right', padding: 6 }}>
                        {it.percentage}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <p>No data for the selected period.</p>
          )}
        </>
      )}
    </div>
  );
}
