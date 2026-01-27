'use client';

import type { Route } from 'next';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { CustomTab } from '@/components/cmm/CustomTab';
import { FundListItemCard } from '@/components/cmm/FundListItemCard';

const tabs = [
  { label: '일반펀드', value: 'general' },
  { label: '연금저축펀드', value: 'pension' },
];

type Props = {
  type: 'general' | 'pension';
  items: {
    id: number;
    title: string;
    risk: 'high' | 'mid' | 'low';
    extraBadgeText?: string;
    subText?: string;
    performanceText: string;
    icon?: 'hana' | 'king' | 'sp';
  }[];
};

export function ProductListClient({ type, items }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleChange = (nextValue: string) => {
    const next = nextValue === 'pension' ? 'pension' : 'general';
    const params = new URLSearchParams(searchParams.toString());
    params.set('type', next);
    router.push(`${pathname}?${params.toString()}` as Route);
  };

  return (
    <div>
      <div className="flex justify-center pt-5 pb-5">
        <CustomTab
          tabs={tabs}
          value={type}
          onChange={handleChange}
          variant="big"
        />
      </div>

      <div className="px-4">
        <div className="font-hana-cm text-[16px] text-black">
          전체 <span className="text-hana-main">{items.length}</span>
        </div>

        <div className="pt-2 text-right font-hana-main text-[13px] text-hana-main">
          보유중 · {items.length}
        </div>

        <div className="space-y-3 pt-3">
          {items.map((it) => (
            <FundListItemCard
              key={it.id}
              title={it.title}
              risk={it.risk}
              extraBadgeText={it.extraBadgeText}
              subText={it.subText}
              performanceText={it.performanceText}
              icon={it.icon}
              className="w-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
