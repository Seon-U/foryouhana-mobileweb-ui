'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { AgreeTermsWithNav } from '@/components/additional-fund/AgreeTermsWithNav';
import { CustomButton } from '@/components/cmm/CustomButton';
import Header from '@/components/cmm/Header';

/**
 * @page: 추가 펀드 가입 - 약관 동의
 * @description: 펀드 가입 전 약관 동의 페이지. 모든 약관에 동의해야 다음 단계로 진행.
 * @author: 권순범
 * @date: 2026-01-26
 */

export default function AdditionalFundTermsPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const childId = params.childId as string;
  const fundId = searchParams.get('fundId');

  // 약관 그룹 1: 투자 관련 약관
  const [agree1_1, setAgree1_1] = useState(false);
  const [agree1_2, setAgree1_2] = useState(false);
  const [agree1_3, setAgree1_3] = useState(false);
  const [agree1_4, setAgree1_4] = useState(false);

  // 약관 그룹 2: 통장 약관
  const [agree2, setAgree2] = useState(false);

  const navigateToTerm = (termId: string) => {
    router.push(
      `/main/${childId}/additional-fund/terms/${termId}?fundId=${fundId}`,
    );
  };

  const group1Items = [
    {
      content: '금융거래 기본약관',
      checked: agree1_1,
      onCheckedChange: setAgree1_1,
      onNavigate: () => navigateToTerm('financial-basic'),
    },
    {
      content: '연금저축 약관',
      checked: agree1_2,
      onCheckedChange: setAgree1_2,
      onNavigate: () => navigateToTerm('pension-savings'),
    },
    {
      content: '집합투자규약',
      checked: agree1_3,
      onCheckedChange: setAgree1_3,
      onNavigate: () => navigateToTerm('collective-investment'),
    },
    {
      content: '투자성 상품 설명 확인',
      checked: agree1_4,
      onCheckedChange: setAgree1_4,
      onNavigate: () => navigateToTerm('investment-product'),
    },
  ];

  const group2Items = [
    {
      content: '하나통장 약관 및 필수확인사항',
      checked: agree2,
      onCheckedChange: setAgree2,
      onNavigate: () => navigateToTerm('hana-account'),
    },
  ];

  const allAgreed = agree1_1 && agree1_2 && agree1_3 && agree1_4 && agree2;

  const handleConfirm = () => {
    if (allAgreed) {
      router.push(`/main/${childId}/additional-fund/setup?fundId=${fundId}`);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-white px-3 py-3">
      <Header content="약관 동의하기" />

      <main className="flex flex-1 flex-col px-3">
        <h1 className="mt-6 font-bold text-[22px] text-hana-gray-800">
          약관에
          <br />
          동의해 주세요
        </h1>

        <div className="mt-6 flex flex-col gap-4">
          {/* 약관 그룹 1: 투자 관련 */}
          <AgreeTermsWithNav label="전체 동의" items={group1Items} />

          {/* 약관 그룹 2: 통장 약관 */}
          <AgreeTermsWithNav
            label="하나통장 약관 및 필수확인사항"
            items={group2Items}
            onLabelNavigate={() => navigateToTerm('hana-account')}
          />
        </div>
      </main>

      {/* 하단 버튼 */}
      <div className="mt-auto flex justify-center pb-6">
        <CustomButton
          preset="greenlong"
          onClick={handleConfirm}
          disabled={!allAgreed}
        >
          확인
        </CustomButton>
      </div>
    </div>
  );
}
