'use client';

import { ChevronRight } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getLinkedChildren } from '@/actions/menu.action';
import Header from '@/components/cmm/Header';
import { BottomNavBar } from '@/components/cmm/NavBar';
import ToggleChildProfile from '@/components/home/ToggleChildProfile';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useUserContext } from '@/hooks/useUserContext';

// 자녀 타입 정의
interface ChildProfile {
  id: number;
  avatarUrl: string;
  name?: string;
}

export default function Menu() {
  const route = useRouter();
  const params = useParams();
  const { ready, userId } = useUserContext();

  // 1. URL에서 childId 파싱 및 유효성 검사 헬퍼
  const childId = Number(params.childId);
  const isValidChildId = !Number.isNaN(childId) && childId > 0;

  const [kidsProfile, setKidsProfile] = useState<ChildProfile[]>([]);

  const [selectedKidId, setSelectedKidId] = useState<number>(() => {
    return isValidChildId ? childId : 0;
  });

  useEffect(() => {
    if (!ready || !userId) return;

    const fetchKids = async () => {
      const PARENT_ID = Number(userId);

      // ID가 유효하지 않으면 요청 보내지 않음 (NaN 방지)
      if (Number.isNaN(PARENT_ID)) return;

      const kids = await getLinkedChildren(PARENT_ID);
      setKidsProfile(kids);

      // 자녀 목록을 가져왔는데, 현재 선택된 ID가 없거나 유효하지 않다면 첫째로 자동 설정
      if (kids.length > 0) {
        if (!isValidChildId) {
          setSelectedKidId(kids[0].id);
        }
      }
    };

    fetchKids();
  }, [isValidChildId, ready, userId]);

  // 3. URL 동기화 로직 보강
  useEffect(() => {
    if (isValidChildId) {
      // 유효한 ID가 URL에 있으면 상태 동기화
      setSelectedKidId((prev) => (prev !== childId ? childId : prev));
    } else if (kidsProfile.length > 0 && selectedKidId === 0) {
      // URL 파라미터가 없고 데이터가 로드된 경우 첫 번째 자녀로 설정
      setSelectedKidId(kidsProfile[0].id);
    }
  }, [childId, isValidChildId, kidsProfile, selectedKidId]);

  return (
    <div className="relative min-h-full">
      <Header content="메뉴" />

      {/* 데이터가 로딩된 후에만 프로필 토글을 보여줍니다 */}
      {kidsProfile.length > 0 && (
        <ToggleChildProfile
          kids={kidsProfile}
          selectedKidId={selectedKidId}
          onSelect={(kidId) => {
            setSelectedKidId(kidId);
            route.push(`/main/${kidId}/menu`);
          }}
          onAddKid={() => {
            alert('자녀 추가는 준비중입니다! 다음에 또 이용해주세요');
          }}
        />
      )}

      <div className="flex w-full flex-col items-center justify-center space-y-15">
        {/* 설정 그룹 */}
        <div id="setting" className="w-78 space-y-2">
          <div>
            <div className="mb-3 font-hana-medium text-[20px]">설정</div>
            <div className="border-hana-gray-400 border-b-2">
              <div className="flex justify-between pb-1 font-hana-light">
                <div className="text-[20px]">프로필 설정</div>
                <button
                  type="button"
                  onClick={() =>
                    // 선택된 자녀 ID가 있을 때만 이동
                    selectedKidId &&
                    route.push(`/main/${selectedKidId}/profileEdit`)
                  }
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

        {/* 서비스 관리 그룹 */}
        <div className="w-78 space-y-2">
          <div className="mb-3 font-hana-medium text-[20px]">
            서비스 상세 관리
          </div>
          <Button
            className="flex h-15 w-full cursor-pointer justify-between rounded-[15px] bg-hana-pastel-mint p-2 text-[18px] hover:bg-hana-pastel-mint/60"
            onClick={() =>
              selectedKidId && route.push(`/main/${selectedKidId}/planEdit`)
            }
          >
            <p>증여 플랜 수정하기</p> <ChevronRight />
          </Button>
          <Button
            className="flex h-15 w-full cursor-pointer justify-between rounded-[15px] bg-hana-pastel-mint p-2 text-[18px] hover:bg-hana-pastel-mint/60"
            onClick={() =>
              selectedKidId && route.push(`/main/${selectedKidId}/my-product`)
            }
          >
            <p>현재 가입 상품 보기</p> <ChevronRight />
          </Button>
        </div>
      </div>

      <BottomNavBar />
    </div>
  );
}
