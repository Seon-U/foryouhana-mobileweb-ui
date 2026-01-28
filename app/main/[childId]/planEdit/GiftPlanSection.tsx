'use client';
import { useState } from 'react';
import { CustomButton } from '@/components/cmm/CustomButton';
import { InputMonth } from '@/components/cmm/InputDayAmount';
import TitlePlanSelect from '@/components/cmm/TitlePlanSelect';
import FixedPlanSection from './FixedPlanSection';
import MethodSection from './MethodSection';

export enum GIFT_METHOD {
  REGULAR = 'REGULAR', // 정기 이체
  FLEXIBLE = 'FLEXIBLE', //자유 이제
}

export default function GiftPlanSection({
  method,
  period,
  amount,
  isFixed,
  onBlockedChange,
  isBlocked,
}: {
  method: GIFT_METHOD;
  period: number | null;
  amount: number | null;
  isFixed: boolean;
  isBlocked: boolean;
  onBlockedChange: (b: boolean) => void;
}) {
  const [giftMethod, setGiftMethod] = useState<GIFT_METHOD>(
    isFixed ? GIFT_METHOD.REGULAR : method,
  );
  const [newAmount, setNewAmount] = useState<number | null>(amount);
  const [newPeriod, setNewPeriod] = useState<number | null>(period);
  const [fixed, setFixed] = useState<boolean>(isFixed);
  return (
    <div>
      <TitlePlanSelect title="증여 방식" />
      {isFixed ? (
        <div>
          <div>
            <CustomButton
              disabled
              preset="lightgraylong"
              className="grid gap-0"
            >
              <span className="text-[14px] text-hana-black">
                정기 이체 방식
              </span>
              <span className="text-[9px] text-hana-black">
                유기정기금 운용 중
              </span>
            </CustomButton>
            <div className="flex justify-between pt-4">
              <div>
                <TitlePlanSelect title="증여 기간" />
                <InputMonth
                  disabled={true}
                  value={period ?? undefined}
                  unit="개월"
                  className="'h-[42px] w-[155px] bg-hana-gray-300 font-hana-regular text-hana-gray-600'"
                  onChange={(v) => setNewPeriod(v ?? null)}
                />
              </div>
              <div>
                <TitlePlanSelect title="월 증여액" />
                <InputMonth
                  disabled={true}
                  value={amount ?? undefined}
                  unit="원"
                  className="'h-[42px] w-[155px] bg-hana-gray-300 font-hana-regular text-hana-gray-600'"
                  onChange={(v) => setNewAmount(v ?? null)}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <MethodSection
          isBlocked={isBlocked}
          isRegular={giftMethod === GIFT_METHOD.REGULAR}
          onChange={setGiftMethod}
          isFixed={isFixed}
          amount={newAmount ?? 0}
          period={newPeriod ?? 0}
          onChangeAmount={setNewAmount}
          onChangePeriod={setNewPeriod}
        />
      )}
      <hr className="my-4 border-hana-gray-400" />
      <FixedPlanSection
        prev={isFixed}
        isFixed={fixed}
        onChange={(v: boolean) => {
          setFixed(v);
          if (v) setGiftMethod(GIFT_METHOD.REGULAR);
        }}
        onBlockedChange={onBlockedChange}
      />
    </div>
  );
}
