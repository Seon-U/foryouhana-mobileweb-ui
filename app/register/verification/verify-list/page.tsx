'use client';

import { CreditCardIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import CardVerify from '@/components/cmm/CardVerify';
import { CustomButton } from '@/components/cmm/CustomButton';
import Header from '@/components/cmm/Header';
import ProgressBar from '@/components/cmm/ProgressBar';

/**
 * @page: verifyListPage
 * @description: 자녀 계좌 개설을 위한 필수 인증 목록 페이지
 * @details:
 * - sessionStorage('giftPlan')의 'is_promise_fixed' 값에 따라 연금 저축 펀드 개설 항목을 조건부로 노출합니다.
 * - 모든 필수 인증 항목(최대 5개)이 완료되어야 하단 '다음' 버튼이 활성화됩니다.
 * - 각 인증 항목은 CardVerify 컴포넌트를 통해 개별 상태를 관리합니다.
 * @author: minyoung
 * @date: 2026-01-27
 */

export default function verifyListPage() {
  const router = useRouter();
  const [verifyStatus, setVerifyStatus] = useState({
    account: false,
  });

  const isAllVerified = useMemo(() => {
    const { account } = verifyStatus;

    const essential = account;

    // 펀드 계좌 개설은 isPromiseFixed가 true일 때만 필수
    return essential;
  }, [verifyStatus]);

  const handleNext = () => {
    router.push('/register/verification/verify-complete');
  };

  return (
    <div>
      <Header content="아이앞으로 가입" />
      <div className="mt-6">
        <ProgressBar
          step="completed"
          step2="current"
          content1="가족관계 확인하기"
          content2="계좌 개설"
        />
      </div>
      <div className="mx-3 mt-3 flex flex-col gap-3">
        <h1>우리 아이 입출금 계좌 개설</h1>
        <CardVerify
          icon={CreditCardIcon}
          title="우리 아이 입출금 계좌 개설"
          description=""
          buttonLabel="입출금 계좌 개설하기"
          checkedLabel="개설이 완료되었습니다."
          onSuccess={() =>
            setVerifyStatus((prev) => ({ ...prev, account: true }))
          }
          checked={verifyStatus.account}
        />
      </div>
      <div className="flex flex-col gap-3 px-3 pt-7 pb-10">
        <CustomButton
          preset={isAllVerified ? 'greenlong' : 'graylong'}
          onClick={handleNext}
          disabled={!isAllVerified}
        >
          다음
        </CustomButton>
      </div>
    </div>
  );
}
