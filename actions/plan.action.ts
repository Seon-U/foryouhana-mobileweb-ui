'use server';
import { GIFT_METHOD, type GiftMethod } from '@/constants/gift';
/**
 * @page: plan.action.ts
 * @description: 플랜 수정 로직에서 사용되는 server actions를 모아놓은 파일입니다.
 * @author: 이정수
 * @date: 2026-01-28
 */

import { prisma } from '@/lib/prisma';

type Prop = {
  childId: number;
  form: {
    fixed: boolean;
    amount: number;
    period: number;
    start: string | null;
    end: string | null;
    pension: boolean;
    prevAmount: number;
    prevPeriod: number;
    method: GiftMethod;
    totalDeposit: bigint;
  };
};

export const saveEditPlan = async ({ childId, form }: Prop) => {
  const {
    fixed,
    amount,
    period,
    method,
    start,
    end,
    prevAmount,
    prevPeriod,
    totalDeposit,
  } = form;
  const baseTotal = BigInt((period ?? 0) * (amount ?? 0)) + totalDeposit;

  const prevPlanTotal =
    prevAmount !== null && prevPeriod !== null
      ? BigInt(prevAmount * prevPeriod)
      : 0n;
  const totalAmount = baseTotal + prevPlanTotal;

  let monthlyMoney: bigint | null;
  let goalMoney: bigint | null;
  let startDate: Date | null;
  let endDate: Date | null;

  if (method === GIFT_METHOD.FLEXIBLE) {
    monthlyMoney = null;
    goalMoney = null;
    startDate = null;
    endDate = null;
  } else {
    if (start === null || end === null) {
      alert('올바른 날짜를 선택해주세요.');
      return;
    }
    monthlyMoney = BigInt(amount);
    goalMoney = totalAmount;
    startDate = null;
    endDate = null;
  }

  await prisma.user.update({
    where: { id: childId },
    data: {
      is_promise_fixed: fixed,
      monthly_money: monthlyMoney,
      goal_money: goalMoney,
      start_date: startDate,
      end_date: endDate,
    },
  });
};

// export const getPlan = async ({ childId }: { childId: number }) => {
//   return {};
// };
