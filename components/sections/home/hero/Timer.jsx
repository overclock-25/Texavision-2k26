'use client';
import { useMounted } from '@/hooks/useMounted';
import { useEffect, useState } from 'react';

const UNITS = [
  { key: 'weeks', label: 'WKS', seconds: 7 * 24 * 60 * 60 },
  { key: 'days', label: 'DYS', seconds: 24 * 60 * 60 },
  { key: 'hours', label: 'HRS', seconds: 60 * 60 },
  { key: 'minutes', label: 'MIN', seconds: 60 },
  { key: 'seconds', label: 'SEC', seconds: 1 },
];

function pad2(value) {
  return String(value).padStart(2, '0');
}

function getTimeLeft(targetTime) {
  let remaining = Math.max(0, Math.floor((targetTime - Date.now()) / 1000));

  const values = {};

  for (const unit of UNITS) {
    values[unit.key] = Math.floor(remaining / unit.seconds);
    remaining %= unit.seconds;
  }

  return {
    ...values,
    done: targetTime <= Date.now(),
  };
}

const CountdownTimer = ({ target, delay = 0 }) => {
  const [render, setRender] = useState(false);
  const isMounted = useMounted();

  useEffect(() => {
    const timer = setTimeout(() => {
      setRender(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const targetTime =
    typeof target === 'string' || target instanceof Date ? new Date(target).getTime() : target;

  const [time, setTime] = useState(() => getTimeLeft(targetTime));

  useEffect(() => {
    if (time.done) return;

    const interval = setInterval(() => {
      setTime(getTimeLeft(targetTime));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime, time.done]);

  if (!isMounted()) return <div className="h-20 opacity-0"></div>;

  return (
    <div
      role="timer"
      aria-live="polite"
      className={`flex h-20 opacity-0 transition-opacity duration-1000 ${render && 'opacity-100'}`}
    >
      {UNITS.map((unit) => (
        <div
          key={unit.key}
          data-unit={unit.key}
          className="font-centrion flex w-14 flex-col -space-y-2 text-center text-white sm:w-25"
        >
          <span
            data-value
            className="outline-text rotate-x-0 text-3xl text-transparent transition-all duration-400 sm:text-4xl md:text-6xl"
          >
            {pad2(time[unit.key])}
          </span>
          <span data-label className="text-2xl">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export { CountdownTimer };
