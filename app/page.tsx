'use client';

import { useState } from 'react';

import { AgreeTerms } from '@/components/cmm/AgreeTerms';

export default function Home() {
  const [base, setBase] = useState(false);
  const [pension, setPension] = useState(false);
  const [fund, setFund] = useState(false);

  return (
    <AgreeTerms
      label="전체 동의"
      items={[
        {
          content: '금융거래 기본약관',
          checked: base,
          onCheckedChange: setBase,
        },
        {
          content: '연금저축 약관',
          checked: pension,
          onCheckedChange: setPension,
        },
        {
          content: '집합투자규약',
          checked: fund,
          onCheckedChange: setFund,
        },
      ]}
    />
  );
}
