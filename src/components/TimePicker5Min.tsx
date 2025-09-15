import React, { useMemo } from 'react';

type Props = {
  value: string;
  onChange: (v: string) => void;
};

export default function TimePicker5Min({ value, onChange }: Props) {
  const options = useMemo(() => {
    const arr: string[] = [];
    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m += 5) {
        arr.push(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`);
      }
    }
    return arr;
  }, []);

  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{ minWidth: 80 }}
    >
      {options.map(t => (
        <option key={t} value={t}>
          {t}
        </option>
      ))}
    </select>
  );
}
