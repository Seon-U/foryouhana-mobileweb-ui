'use client';

import type { Route } from 'next';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { CustomTab } from '@/components/cmm/CustomTab';
import { FundListItemCard } from '@/components/cmm/FundListItemCard';
import Header from '@/components/cmm/Header';
import { BottomNavBar } from '@/components/cmm/NavBar';

const tabs = [
  { label: '일반펀드', value: 'general' },
  { label: '연금저축펀드', value: 'pension' },
];

type TabValue = 'general' | 'pension';

export default function ProductListPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const typeParam = (searchParams.get('type') ?? 'general') as TabValue;
  const value: TabValue = typeParam === 'pension' ? 'pension' : 'general';
  const isGeneral = value === 'general';

  const handleChange = (nextValue: string) => {
    const next = nextValue === 'pension' ? 'pension' : 'general';

    const params = new URLSearchParams(searchParams.toString());
    params.set('type', next);

    router.push(`${pathname}?${params.toString()}` as Route);
  };

  const items = isGeneral
    ? [
        {
          title: '하나 일반펀드 A',
          risk: 'mid' as const,
          extraBadgeText: '추천',
          subText: '하나공모주하이일드증권투자신탁',
          performanceText: '1년 +12.3%  |  5년 +48.1%  |  10년 +120.4% ',
          icon: 'hana' as const,
        },
        {
          title: '하나 일반펀드 B',
          risk: 'low' as const,
          extraBadgeText: '인기',
          subText: '한국투자삼성TOP3증권투자신탁1호(채권혼합)A-E',
          performanceText: '1년 +12.3%  |  5년 +48.1%  |  10년 +120.4% ',
          icon: 'hana' as const,
        },
        {
          title: '하나 일반펀드 C',
          risk: 'high' as const,
          subText: '하나공모주하이일드증권투자신탁',
          performanceText: '1년 +12.3%  |  5년 +48.1%  |  10년 +120.4% ',
          icon: 'hana' as const,
        },
        {
          title: '하나 일반펀드 D',
          risk: 'mid' as const,
          subText: '하나공모주하이일드증권투자신탁',
          performanceText: '1년 +12.3%  |  5년 +48.1%  |  10년 +120.4% ',
          icon: 'hana' as const,
        },
        {
          title: '하나 일반펀드 E',
          risk: 'low' as const,
          extraBadgeText: 'NEW',
          subText: '1개월 기준 수익률',
          performanceText: '1년 +12.3%  |  5년 +48.1%  |  10년 +120.4% ',
          icon: 'hana' as const,
        },
      ]
    : [
        {
          title: '연금저축펀드 A',
          risk: 'mid' as const,
          extraBadgeText: '추천',
          performanceText: '1년 +12.3%  |  5년 +48.1%  |  10년 +120.4% ',
          icon: 'king' as const,
        },
        {
          title: '연금저축펀드 B',
          risk: 'low' as const,
          performanceText: '1년 +12.3%  |  5년 +48.1%  |  10년 +120.4% ',
          icon: 'sp' as const,
        },
        {
          title: '연금저축펀드 C',
          risk: 'high' as const,
          extraBadgeText: '주의',
          performanceText: '1년 +12.3%  |  5년 +48.1%  |  10년 +120.4% ',
          icon: 'king' as const,
        },
        {
          title: '연금저축펀드 D',
          risk: 'mid' as const,
          performanceText: '1년 +12.3%  |  5년 +48.1%  |  10년 +120.4% ',
          icon: 'sp' as const,
        },
        {
          title: '연금저축펀드 E',
          risk: 'low' as const,
          extraBadgeText: '인기',
          performanceText: '1년 +12.3%  |  5년 +48.1%  |  10년 +120.4% ',
          icon: 'king' as const,
        },
      ];

  return (
    <div className="overflow-hidden">
      <Header content="상품 리스트" />

      <div className="flex justify-center pb-5">
        {/* ✅ CustomTab */}
        <CustomTab
          tabs={tabs}
          value={value}
          onChange={handleChange}
          variant="big"
        />
      </div>

      <div className="pt-5" />

      {/* ✅ 탭과 카드 사이 텍스트 */}
      <div className="px-4">
        <div className="font-hana-cm text-[16px] text-black">
          전체 <span className="text-hana-main">5</span>
        </div>

        <div className="pt-2 text-right font-hana-main text-[13px] text-hana-main">
          보유중 · 5
        </div>

        {/* ✅ 카드 리스트 */}
        <div className="space-y-3 pt-3">
          {items.map((it) => (
            <FundListItemCard
              key={it.title}
              title={it.title}
              risk={it.risk}
              extraBadgeText={it.extraBadgeText}
              subText={'subText' in it ? it.subText : undefined}
              performanceText={it.performanceText}
              icon={it.icon}
              className="w-full"
            />
          ))}
        </div>
      </div>

      <div className="pb-24" />

      <BottomNavBar />
    </div>
  );
}
