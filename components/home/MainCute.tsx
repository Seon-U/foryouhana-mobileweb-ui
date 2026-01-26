'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { IMAGES_PATH } from '@/constants/images';

// 💬 메시지 데이터는 기존 그대로 유지
const CUTE_MESSAGES = [
  '엄마 사랑해! ❤️🧡💛',
  '까까 사주세요 🍪🍭',
  '안아주세요 꼬옥 🤗',
  '나중에 효도할게 🙇‍♂️✨',
  '엄마 껌딱지 💖',
  '쪽쪽쪽 뽀뽀! 💋💋',
  '엄마 냄새 좋아 킁킁 🌸',
  '내 맘 알지? 😘🫶',
  '엄마랑 놀래! 🛝🏃‍♂️',
  '세상에서 젤 예뻐 👸',
  '내가 지켜줄게 🛡️🦸‍♂️',
  '엄마는 내 보물 💎',
  '쑥쑥 클게요 🌱⬆️',
  '엄마 품이 최고 🤱',
  '방긋방긋 😄🌻',
  '내 사랑 받아라 얍! 💖🔫',
  '하트 뿅뿅 💕✨',
  '같이 춤추자 💃🕺',
  '엄마바라기 🌻👀',
  '오늘도 고마워요 🎀',
  '코~ 자자 엄마 🌙💤',
  '꿈에서 만나 🦄🌈',
  '약속해줘! 🤙✨',
  '도장 꾹! 🐾',
  '사랑해 x 3000 🚀🌌',
  '천사 같은 울 엄마 👼✨',
  '엄마 없인 못 살아 😭❤️',
  '반짝반짝 빛나는 나 ✨⭐',
  '엉덩이 춤 씰룩 🍑🎶',
  '윙크 발사 😉⚡',
  '엄마 밥이 최고 🍚👍',
  '놀이동산 가자! 🎡🎢',
  '목마 태워줘요 🦒',
  '간지럼 태울거야 👋😆',
  '엄마랑 결혼할래 👰🤵',
];

const NORMAL_MESSAGES = [
  '부자 되세요! 💰💵',
  '오늘도 파이팅! 💪🔥',
  '커피 한 잔의 여유 ☕️🌿',
  '로또 1등 기원 🙏💸',
  '건강이 최고야 🍎🥦',
  '증여 플랜 대박! 📈🚀',
  '1억 모으기 가즈아! 🏃‍♀️💨',
  '재테크의 여왕 👑💎',
  '엄마는 능력자 😎✨',
  '꽃길만 걷자 🌸🌷',
  '스트레스 뻥! 👊💥',
  '맛있는 거 먹어요 🍗🍕',
  '칼퇴 기원! 🏠🏃‍♀️',
  '오늘 날씨 맑음 ☀️☁️',
  '행운 가득! 🍀🐞',
  '걱정은 노노! 🙅‍♀️❌',
  '다 잘 될 거야 👌✨',
  '긍정 파워 뿜뿜 🔋⚡',
  '쇼핑하러 가요 🛍️👠',
  '나를 위한 선물 🎁💍',
  '육아 파이팅! 🍼💪',
  '지칠 땐 하늘 보기 ☁️💙',
  '스마일~ 치즈 😊📸',
  '어깨 펴고 당당하게 💃✨',
  '당신은 소중해요 💖💎',
  '통장 잔고 두둑히 💳💰',
  '절세 요정 별벗 🧚‍♂️✨',
  '황금알 낳는 거위 🦢🥚',
  '노후 준비 완벽 👵👴',
  '내 집 마련 꿈 🏡🔑',
  '비타민 충전 완료! 🍋⚡',
  '해피 에너지 발사 🔥💖',
  '기분 좋은 하루! 🎶🎵',
  '사랑 듬뿍 받아요 🎁❤️',
  '엄마 어깨 주물주물 👐💆‍♀️',
  '오늘도 수고했어 👏🍹',
  '토닥토닥 쓰담쓰담 👋🐶',
  '내일은 더 좋을 거야 🌈✨',
  '언제나 응원해 📣🚩',
];

// 🔥 캐릭터 타입에 'run' 추가
type CharacterType = 'cute' | 'normal' | 'run';

export default function MainCute() {
  const [showBubble, setShowBubble] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);
  const [message, setMessage] = useState('엄마 사랑해! ❤️🧡💛');
  const [charType, setCharType] = useState<CharacterType>('cute');

  // X 좌표 상태 (초기값: 10%)
  const [positionX, setPositionX] = useState(10);

  // 클라이언트 마운트 시 랜덤 위치 초기화
  useEffect(() => {
    setPositionX(Math.random() * 70);
  }, []);

  const handleCharacterClick = () => {
    if (showBubble) return;

    // 1. 캐릭터 타입 랜덤 결정 (cute / normal / run 중 하나)
    const types: CharacterType[] = ['cute', 'normal', 'run'];
    const nextType = types[Math.floor(Math.random() * types.length)];
    setCharType(nextType);

    // 2. 메시지 랜덤 선택 (run일 때도 NORMAL 메시지 사용 - 원하시면 변경 가능)
    const targetList = nextType === 'cute' ? CUTE_MESSAGES : NORMAL_MESSAGES;
    const randomIndex = Math.floor(Math.random() * targetList.length);
    setMessage(targetList[randomIndex]);

    // 3. 위치 랜덤 변경 (0% ~ 70%)
    const newX = Math.random() * 70;
    setPositionX(newX);

    // 4. 애니메이션 실행
    setIsBouncing(true);
    setShowBubble(true);

    setTimeout(() => {
      setIsBouncing(false);
    }, 300);

    setTimeout(() => {
      setShowBubble(false);
    }, 2000);
  };

  // 🔥 현재 상태에 맞는 이미지 경로 반환 헬퍼 함수
  const getCharacterImage = () => {
    switch (charType) {
      case 'cute':
        return IMAGES_PATH.CUTE;
      case 'run':
        return IMAGES_PATH.RUN; // 상수에 RUN 추가되어 있어야 함
      default:
        return IMAGES_PATH.NORMAL;
    }
  };

  return (
    <div className="relative h-[161px] w-full overflow-hidden rounded-t-4xl border-3 border-hana-pastel-mint shadow-md">
      {/* 배경 */}
      <div className="absolute inset-0 z-0"></div>

      <button
        type="button"
        className="absolute bottom-[10px] z-10 flex flex-col items-center outline-none transition-all duration-500 ease-in-out active:scale-95"
        style={{ left: `${positionX}%` }} // 부드러운 이동
        onClick={handleCharacterClick}
      >
        {/* 말풍선 */}
        <div
          className={`mb-2 flex transform items-center justify-center rounded-2xl bg-white px-3 py-2 shadow-lg transition-all duration-300 ease-out ${showBubble ? 'translate-y-0 scale-100 opacity-100' : 'pointer-events-none translate-y-4 scale-50 opacity-0'}
          `}
        >
          <span className="whitespace-nowrap font-bold text-hana-main text-xs">
            {message}
          </span>
          {/* 말풍선 꼬리 */}
          <div className="-bottom-1.5 -translate-x-1/2 absolute left-1/2 h-3 w-3 rotate-45 bg-white"></div>
        </div>

        {/* 캐릭터 이미지 */}
        <div
          className={`relative h-[98px] w-[74px] cursor-pointer transition-transform duration-150 ${isBouncing ? '-translate-y-2 scale-110' : 'translate-y-0 scale-100'}
          `}
        >
          <Image
            src={getCharacterImage()} // 🔥 헬퍼 함수로 깔끔하게 처리
            alt="character"
            fill
            className="object-contain drop-shadow-md"
            priority
          />
        </div>
      </button>
    </div>
  );
}
