'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * @page: InputYear
 * @description: 년수 입력 컴포넌트 (1-100년). InputDay 패턴 참조.
 * @author: 권순범
 * @date: 2026-01-26
 */

type InputYearProps = {
  value?: number;
  onChange?: (value: number | undefined) => void;
  placeholder?: string;
  label?: string;
  showLabel?: boolean;
  className?: string;
};

const MAX_YEAR = 100;

export function InputYear({
  value,
  onChange,
  placeholder = '',
  label = '납입 기간',
  showLabel = true,
  className,
}: InputYearProps) {
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

    if (num > MAX_YEAR) {
      setInputValue(MAX_YEAR.toString());
      onChange?.(MAX_YEAR);
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
    <div className={cn('flex-1', className)}>
      {showLabel && (
        <p className="mb-2 text-[14px] text-hana-gray-600">{label}</p>
      )}
      <label className="flex h-[48px] w-full cursor-text items-center justify-center rounded-[10px] bg-hana-light-green px-4">
        <input
          type="text"
          inputMode="numeric"
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full bg-transparent text-center font-medium text-[24px] outline-none placeholder:text-hana-gray-400"
        />
        <span className="ml-2 shrink-0 text-[16px] text-hana-gray-600">년</span>
      </label>
    </div>
  );
}
