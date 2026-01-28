'use client';
import { useState } from 'react';
import { CustomButton } from '@/components/cmm/CustomButton';
import GiftPlanSection, { type GIFT_METHOD } from './GiftPlanSection';
import PensionSelection from './PensionSelection';

type Props = {
  isPension: boolean;
  method: GIFT_METHOD;
  period: number;
  isFixedGift: boolean;
  monthlyMoney: number;
};
export default function MainSection({
  isPension,
  method,
  period,
  isFixedGift,
  monthlyMoney,
}: Props) {
  const [blocked, setBlocked] = useState<boolean>(false);
  return (
    <div>
      <main className="flex-1">
        <div className="grid w-92.25 gap-3">
          <h1 className="font-hana-light">
            원하는 대로 증여 계획을 조정해보세요.
          </h1>
        </div>
        <div className="my-2 grid justify-center gap-2 rounded-2xl border border-hana-gray-300 p-4">
          <PensionSelection prev={isPension} />
          <GiftPlanSection
            method={method}
            period={period}
            amount={Number(monthlyMoney)}
            isFixed={isFixedGift}
            isBlocked={blocked}
            onBlockedChange={(b: boolean) => setBlocked(b)}
          />
        </div>
      </main>
      <div className="grid justify-center gap-2 pt-4">
        <CustomButton preset="lightgraylong">돌아가기</CustomButton>
        <CustomButton preset="greenlong" disabled={blocked}>
          이 플랜으로 변경하기
        </CustomButton>
      </div>
    </div>
  );
}
