'use client';

/**
 * @page: SetupForm
 * @description: 추가 펀드 가입 - 납입 설정 폼 (클라이언트 컴포넌트)
 * @author: 권순범
 * @date: 2026-01-27
 */

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { createFundAccount } from '@/actions/additional-fund';
import { CustomButton } from '@/components/cmm/CustomButton';
import type { fund_saving_type } from '@/lib/generated/prisma/client';
import { formatWon } from '@/lib/utils';
import { InputAmountFlex } from './InputAmountFlex';
import { InputDayFlex } from './InputDayFlex';
import { InputMonth } from './InputMonth';
import { InputYear } from './InputYear';
import { InvestTypeToggle } from './InvestTypeToggle';

type InvestType = 'REGULAR' | 'FREE';

type SetupFormProps = {
  childId: number;
  fundId: number;
  fundSavingType: fund_saving_type;
  depositAccountId: number;
};

// fund.saving_type에서 허용된 투자 타입 추출
function getAllowedTypes(savingType: fund_saving_type): InvestType[] {
  switch (savingType) {
    case 'BOTH':
      return ['REGULAR', 'FREE'];
    case 'REGULAR':
      return ['REGULAR'];
    case 'FREE':
      return ['FREE'];
    default:
      return ['REGULAR', 'FREE'];
  }
}

export function SetupForm({
  childId,
  fundId,
  fundSavingType,
  depositAccountId,
}: SetupFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // 초기 투자 타입 설정
  const allowedTypes = getAllowedTypes(fundSavingType);
  const initialInvestType =
    !allowedTypes.includes('REGULAR') && allowedTypes.includes('FREE')
      ? 'FREE'
      : 'REGULAR';

  // 폼 상태
  const [investType, setInvestType] = useState<InvestType>(initialInvestType);
  const [years, setYears] = useState<number | undefined>(9);
  const [months, setMonths] = useState<number | undefined>(108);
  const [monthlyAmount, setMonthlyAmount] = useState<number | undefined>(50);
  const [transferDay, setTransferDay] = useState<number | undefined>(25);

  // 총 납입액 계산 (정기적립식)
  const totalPayment =
    investType === 'REGULAR' && years && monthlyAmount
      ? years * 12 * monthlyAmount
      : 0;

  const handleBack = () => {
    router.back();
  };

  const handleSubmit = () => {
    const periodValid =
      investType === 'REGULAR' ? years !== undefined : months !== undefined;

    if (!periodValid) return;

    if (investType === 'REGULAR' && (!monthlyAmount || !transferDay)) {
      alert('납입 금액과 납입일을 입력해주세요.');
      return;
    }

    const totalMonths =
      investType === 'REGULAR' ? (years ?? 0) * 12 : (months ?? 0);

    startTransition(async () => {
      const result = await createFundAccount({
        childId,
        fundId,
        depositAccountId,
        investType,
        months: totalMonths,
        monthlyAmount: investType === 'REGULAR' ? monthlyAmount : undefined,
        transferDay: investType === 'REGULAR' ? transferDay : undefined,
      });

      if (result.success) {
        router.push(
          `/main/${childId}/additional-fund/complete?accountNumber=${result.accountNumber}`,
        );
      } else {
        alert(result.error || '펀드 가입에 실패했습니다.');
      }
    });
  };

  const isFormValid =
    investType === 'REGULAR' ? years && monthlyAmount && transferDay : months;

  return (
    <>
      <main className="flex flex-1 flex-col px-3">
        <h1 className="mt-6 font-bold text-[18px] text-hana-gray-800">
          납입 금액과 기간을
          <br />
          설정해 주세요
        </h1>

        {/* 설정 카드 */}
        <div className="mt-6 rounded-[15px] bg-hana-gray-100 p-5">
          {/* 납입 방식 */}
          <div className="mb-5">
            <p className="mb-3 font-medium text-[14px] text-hana-gray-700">
              납입 방식
            </p>
            <InvestTypeToggle
              value={investType}
              onChange={setInvestType}
              allowedTypes={allowedTypes}
            />
          </div>

          {investType === 'REGULAR' ? (
            <>
              {/* 정기적립식: 2열 배치 */}
              <div className="mb-4 flex gap-3">
                <InputYear
                  value={years}
                  onChange={setYears}
                  label="납입 기간"
                />
                <InputAmountFlex
                  value={monthlyAmount}
                  onChange={setMonthlyAmount}
                  label="월 납입액"
                />
              </div>

              {/* 월 납입일 */}
              <div className="mb-5">
                <p className="mb-2 text-[14px] text-hana-gray-600">월 납입일</p>
                <InputDayFlex value={transferDay} onChange={setTransferDay} />
              </div>

              {/* 총 납입액 */}
              <div className="mb-2 border-hana-gray-300 border-t pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-[14px] text-hana-gray-600">
                    총 납입액
                  </span>
                  <span className="font-bold text-[20px] text-hana-main">
                    {formatWon(totalPayment)}만원
                  </span>
                </div>
                {years && monthlyAmount && (
                  <p className="mt-1 text-right text-[12px] text-hana-gray-500">
                    {years}년 x 12개월 x {formatWon(monthlyAmount)}만원
                  </p>
                )}
              </div>

              {/* 증여세 안내 */}
              <p className="mt-3 text-[11px] text-hana-gray-500 leading-relaxed">
                ※ 증여세 공제는 10년마다 새로 적용돼요.
                <br />
                19세 미만은 2,000만원, 성인은 5,000만원까지 공제되며, 한도를
                초과한 금액에는 증여세가 부과됩니다.
              </p>
            </>
          ) : (
            <>
              {/* 자유적립식: 납입기간(개월) */}
              <div className="mb-4">
                <InputMonth
                  value={months}
                  onChange={setMonths}
                  label="납입 기간"
                />
              </div>
            </>
          )}
        </div>
      </main>

      {/* 하단 버튼 */}
      <div className="mt-auto flex flex-col gap-3 px-3 pb-6">
        <CustomButton preset="graylong" onClick={handleBack}>
          돌아가기
        </CustomButton>
        <CustomButton
          preset="greenlong"
          onClick={handleSubmit}
          disabled={!isFormValid || isPending}
        >
          {isPending ? '처리 중...' : '상품 가입하기'}
        </CustomButton>
      </div>
    </>
  );
}
