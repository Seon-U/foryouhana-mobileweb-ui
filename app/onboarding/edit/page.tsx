'use client';
import { useEffect, useState } from 'react';
import { CustomButton } from '@/components/cmm/CustomButton';
import Header from '@/components/cmm/Header';
import GiftSection from './GiftSection';
import PensionSection from './PensionSection';

export type DraftPlanPayload = {
  updated_at: string; // ISO string
  plan: {
    goal_money: number;
    monthly_money: number;
    is_promise_fixed: boolean;
    in_month: number;
    in_type: boolean;
    acc_type: 'PENSION' | 'DEPOSIT';
  };
};

export default function planEdit() {
  const [isReady, setIsReady] = useState(false);
  const [draft, setDraft] = useState<DraftPlanPayload | null>(null);
  const [pensionSelected, setPensionSelected] = useState<boolean>(false);
  const [giftSelected, setGiftSelected] = useState<boolean>(true);
  const [isRegular, setIsRegular] = useState(true);

  useEffect(() => {
    console.log('mounted');
    const raw = sessionStorage.getItem('giftPlan');
    if (!raw) return;
    // 최신 plan 가져오기
    try {
      const parsed = JSON.parse(raw) as DraftPlanPayload;
      setDraft(parsed);

      console.log(parsed.plan);
      if (parsed?.plan.acc_type === 'PENSION') {
        setPensionSelected(true);
      } else setPensionSelected(false);
      if (parsed?.plan.is_promise_fixed === true) {
        setGiftSelected(true);
        setIsRegular(true);
      } else {
        setGiftSelected(false);
        if (parsed?.plan.in_type) setIsRegular(true);
        else setIsRegular(false);
      }
    } catch {
      // 깨진 데이터면 폐기
      sessionStorage.removeItem('giftPlan');
    }
    setIsReady(true);
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <div>
      <Header content="플랜 직접 수정하기" />
      <div className="grid w-92.25 gap-3">
        <h1 className="font-hana-light">
          원하는 대로 증여 계획을 조정해보세요.
        </h1>
        <div className="rounded-2xl border border-hana-gray-300 p-5 shadow-hana-gray-300 shadow-sm">
          <PensionSection
            select={pensionSelected}
            onSelect={(isSelected) => {
              setPensionSelected(isSelected);
            }}
          />
          <GiftSection
            giftPlan={giftSelected}
            onGiftPlanSelected={(isSelected) => {
              setGiftSelected(isSelected);
              setIsRegular(isSelected);
            }}
            regular={isRegular}
            onRegularSelected={(isSelected) => {
              setIsRegular(isSelected);
            }}
            goalMoney={draft?.plan.goal_money}
            monthlyMoney={draft?.plan.monthly_money}
            inMonth={draft?.plan.in_month}
          />
        </div>
        <div className="grid justify-center gap-2 pt-4">
          <CustomButton preset="lightgraylong">돌아가기</CustomButton>
          <CustomButton preset="greenlong">이 플랜으로 변경하기</CustomButton>
        </div>
      </div>
    </div>
  );
}
