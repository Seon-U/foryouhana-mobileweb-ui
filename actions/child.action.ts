'use server';

import type { Prisma } from '@/lib/generated/prisma/client';
import { account_acc_type, invest_type } from '@/lib/generated/prisma/enums';
import { prisma } from '@/lib/prisma';

/**
 * @page: 자녀 & 자녀 입출금 계좌 생성
 * @description: 자녀 & 자녀 입출금 계좌 생성 액션입니다. 세션에 담긴 값을 기반으로 자녀를 생성합니다
 * @author: 작성자명
 * @date: 2026-01-28
 */

export type BirthInput = {
  year: number;
  month: number;
  day: number;
  age: number;
};

export type DraftPlanPayload = {
  child_id: string | number | null;
  child_name: string | { name: string };
  isSigned: boolean;
  updated_at: string;
  plan: {
    child_birth: BirthInput;
    goal_money: number;
    monthly_money: number;
    is_promise_fixed: boolean;
    in_month: number;
    in_type: boolean;
    acc_type: 'PENSION' | 'DEPOSIT';
  };
};

export async function createChildAndAccount(sessionData: DraftPlanPayload) {
  try {
    const { child_name, plan } = sessionData;
    const {
      child_birth,
      goal_money,
      monthly_money,
      is_promise_fixed,
      in_month,
      in_type,
      acc_type,
    } = plan;

    // 1. 기본 데이터 가공
    const finalName =
      typeof child_name === 'object' ? child_name.name : child_name;
    const startDate = new Date();
    const endDate = new Date();
    if (in_month) {
      endDate.setMonth(startDate.getMonth() + in_month);
    }

    const identityHash =
      sessionData.child_id?.toString() || crypto.randomUUID();

    // 2. 부모 데이터 확인
    const existingParent = await prisma.parent.findFirst({
      select: { id: true },
    });

    if (!existingParent) {
      throw new Error(
        '부모 데이터가 DB에 하나도 없습니다. Parent 테이블을 먼저 확인해주세요.',
      );
    }

    // 3. 자녀 생성 (Upsert) 및 플랜 계좌(적금/연금) 생성
    const resultChild = await prisma.child.upsert({
      where: { identity_hash: identityHash } as Prisma.childWhereUniqueInput,
      update: {
        name: finalName,
        goal_money: goal_money ? BigInt(goal_money) : null,
        monthly_money: monthly_money ? BigInt(monthly_money) : null,
        is_promise_fixed: is_promise_fixed,
        invest_type: invest_type.NOBASE,
        start_date: startDate,
        end_date: endDate,
      },
      create: {
        parent_id: existingParent.id,
        name: finalName,
        born_date: new Date(
          child_birth.year,
          child_birth.month - 1,
          child_birth.day,
        ),
        goal_money: goal_money ? BigInt(goal_money) : null,
        monthly_money: monthly_money ? BigInt(monthly_money) : null,
        is_promise_fixed: is_promise_fixed,
        identity_hash: identityHash,
        start_date: startDate,
        end_date: endDate,
        account: {
          create: {
            acc_num: Math.floor(
              Math.random() * 9000000000000 + 1000000000000,
            ).toString(),
            acc_type: acc_type === 'PENSION' ? 'PENSION' : 'DEPOSIT',
            opened_at: startDate,
            in_month: in_month,
            in_type: in_type,
            deposit: 0n,
          },
        },
      },
    });

    // 1002-888-XXXXXX (랜덤 6자리)
    const randomSuffix = Math.floor(Math.random() * 899999 + 100000).toString();
    // 10만원 ~ 100만원 사이 (1만원 단위) 랜덤 잔액
    const randomDeposit = BigInt((Math.floor(Math.random() * 90) + 10) * 10000);

    const sourceAccount = await prisma.account.create({
      data: {
        child_id: resultChild.id,
        acc_num: `1002-888-${randomSuffix}`,
        acc_type: account_acc_type.DEPOSIT, // 고정값
        opened_at: new Date('2024-01-01'),
        deposit: randomDeposit, // 랜덤 잔액
        in_type: false, // 고정값
      },
    });

    await prisma.child.update({
      where: { id: resultChild.id },
      data: { gift_account_id: sourceAccount.id },
    });

    return { success: true, childId: resultChild.id };
  } catch (error) {
    console.error('DB 저장 중 오류 발생:', error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : '데이터 저장에 실패했습니다.',
    };
  }
}
