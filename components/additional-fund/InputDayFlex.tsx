'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * @page: InputDayFlex
 * @description: Flexible width day input. Copied from cmm/InputDayAmount.tsx and extended.
 * @author: 권순범
 * @date: 2026-01-27
 */

type InputDayFlexProps = {
  value?: number;
  onChange?: (value: number | undefined) => void;
  placeholder?: string;
  className?: string;
};

export function InputDayFlex({
  value,
  onChange,
  placeholder = '',
  className,
}: InputDayFlexProps) {
  const [inputValue, setInputValue] = useState(value?.toString() ?? '');

  useEffect(() => {
    setInputValue(value?.toString() ?? '');
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');

    if (raw === '') {
      setInputValue('');
      onChange?.(undefined);
      return;
    }

    const num = Number.parseInt(raw, 10);

    if (num > 31) {
      setInputValue('31');
      onChange?.(31);
      return;
    }

    if (num < 1 && raw !== '') {
      setInputValue('1');
      onChange?.(1);
      return;
    }

    setInputValue(raw);
    onChange?.(num);
  };

  return (
    <label
      className={cn(
        'flex h-[48px] w-full cursor-text items-center justify-center rounded-[10px] bg-hana-gray-200 px-4',
        className,
      )}
    >
      <input
        type="text"
        inputMode="numeric"
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full bg-transparent text-center font-medium text-[24px] outline-none placeholder:text-hana-gray-400"
      />
      <span className="ml-2 shrink-0 text-[16px] text-hana-gray-600">일</span>
    </label>
  );
}
