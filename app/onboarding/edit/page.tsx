'use client';
import { useState } from 'react';
import { CustomButton } from '@/components/cmm/CustomButton';
import Header from '@/components/cmm/Header';
import GiftSection from './GiftSection';
import PensionSection from './PensionSection';

export default function planEdit() {
  const [pensionSelected, setPensionSelected] = useState<boolean>(false);
  const [giftSelected, setGiftSelected] = useState<boolean>(true);
  const [isRegular, setIsRegular] = useState(true);
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
