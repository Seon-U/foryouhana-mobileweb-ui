'use client';

import { ChevronRight } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BottomNavBar } from '@/components/cmm/NavBar';
import ToggleChildProfile from '@/components/home/ToggleChildProfile';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

export default function Menu() {
  // 컴포넌트 이름은 대문자로 시작하는 게 관례예요!
  const route = useRouter();
  const params = useParams();
  const childId = Number(params.childId); // URL에서 현재 자녀 ID 가져오기
  const kidsProfile = [
    { id: 1, avatarUrl: '/file/자녀1.jpg' },
    { id: 2, avatarUrl: '/file/자녀2.jpg' },
    { id: 3, avatarUrl: '/file/자녀3.jpg' },
  ];

  // ✅ 해결 포인트: useState 초기값에 URL의 childId를 넣어줍니다.
  const [selectedKidId, setSelectedKidId] = useState<number>(() => {
    return childId || kidsProfile[0].id;
  });

  useEffect(() => {
    if (childId) {
      // setter 함수 내부에서 이전 값(prev)과 비교하면 의존성 배열에서 제거 가능합니다.
      setSelectedKidId((prev) => (prev !== childId ? childId : prev));
    }
  }, [childId]); // 이제 selectedKidId를 배열에 넣지 않아도 됨!
  return (
    <div className="relative min-h-full">
      <div id="menuHeader" className="mb-25 flex h-12.5 justify-between">
        <p className="font-hana-bold text-[25px]">메뉴</p>
        <ToggleChildProfile
          kids={kidsProfile}
          selectedKidId={selectedKidId}
          onSelect={(kidId) => {
            setSelectedKidId(kidId);
            route.push(`/main/${kidId}/menu`);
          }}
          onAddKid={() => {
            alert('자녀 추가 기능 준비 중!');
          }}
        />
      </div>
      <div className="flex w-full flex-col items-center justify-center space-y-15">
        <div id="setting" className="w-78 space-y-2">
          <div>
            <div className="mb-3 font-hana-medium text-[20px]">설정</div>
            <div className="border-hana-gray-400 border-b-2">
              <div className="flex justify-between pb-1 font-hana-light">
                <div className="text-[20px]">프로필 설정</div>
                <button
                  type="button"
                  onClick={() => route.push(`/main/${childId}/profileEdit`)}
                  className="hover:cursor-pointer"
                >
                  <ChevronRight />
                </button>
              </div>
              <div className="pb-1 text-[13px]">
                자녀 프로필 사진을 변경할 수 있습니다.
              </div>
            </div>
          </div>
          <div id="assetNotification" className="w-78">
            <div className="border-hana-gray-600 border-b-2">
              <div className="flex justify-between pb-1 font-hana-light">
                <div className="text-[20px]">자산 변동 알림 사용</div>
                <Switch className="cursor-pointer data-[state=checked]:bg-hana-badge-green" />
              </div>
              <div className="pb-1 text-[13px]">
                자녀 자산 변동 시 알림을 받습니다.
              </div>
            </div>
          </div>
          <div id="serviceTermination" className="w-78">
            <div className="border-hana-gray-600 border-b-2">
              <div className="flex justify-between pb-1 font-hana-light">
                <div className="text-[20px]">아이앞으로 서비스 해지</div>

                <button
                  type="button"
                  onClick={() => route.push(`/onboarding/intro`)}
                  className="hover:cursor-pointer"
                >
                  <ChevronRight />
                </button>
              </div>
              <div className="pb-1 text-[13px] text-hana-badge-red">
                해지 시 자녀 금융 상품 관리 페이지를 볼 수 없습니다.
              </div>
            </div>
          </div>
        </div>
        <div className="w-78 space-y-2">
          <div className="mb-3 font-hana-medium text-[20px]">
            서비스 상세 관리
          </div>
          <Button
            className="flex h-15 w-full cursor-pointer justify-between rounded-[15px] bg-hana-pastel-mint p-2 text-[18px] hover:bg-hana-pastel-mint/60"
            onClick={() => route.push(`/main/${childId}/planEdit`)}
          >
            <p>증여 플랜 수정하기</p> <ChevronRight />
          </Button>
          <Button
            className="flex h-15 w-full cursor-pointer justify-between rounded-[15px] bg-hana-pastel-mint p-2 text-[18px] hover:bg-hana-pastel-mint/60"
            onClick={() => route.push(`/main/${childId}/my-product`)}
          >
            <p>현재 가입 상품 보기</p> <ChevronRight />
          </Button>
        </div>
      </div>

      <BottomNavBar />
    </div>
  );
}
