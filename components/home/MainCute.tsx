'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { IMAGES_PATH } from '@/constants/images';
import * as MSG from '@/constants/messages'; // 각 이미지별 전용 메시지 변수 임포트

// 6가지 이미지 타입에 맞춘 타입 정의
type CharacterType = 'dance' | 'good' | 'heart' | 'hi' | 'water' | 'wink';

// 꽃잎 타입 정의
interface Petal {
  id: number;
  left: number;
  top: number;
  delay: number;
}

export default function MainCute() {
  const [showBubble, setShowBubble] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);
  const [message, setMessage] = useState('하나 정원에서 같이 놀아요! ✨');
  const [charType, setCharType] = useState<CharacterType>('hi'); // 초기값 '안녕'
  const [positionX, setPositionX] = useState(20);

  // 🌸 꽃잎 상태 추가 (Hydration 에러 방지용)
  const [petals, setPetals] = useState<Petal[]>([]);

  const bounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const bubbleTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // 1. 초기 위치 설정
    setPositionX(20 + Math.random() * 40);

    // 2. 꽃잎 데이터 생성 (클라이언트에서만 실행되어 에러를 방지함)
    const newPetals = Array.from({ length: 5 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 50,
      delay: i * 0.8,
    }));
    setPetals(newPetals);
  }, []);

  const handleCharacterClick = () => {
    if (showBubble) return;

    // 1. 6가지 이미지 중 랜덤하게 하나 선택
    const types: CharacterType[] = [
      'dance',
      'good',
      'heart',
      'hi',
      'water',
      'wink',
    ];
    const nextType = types[Math.floor(Math.random() * types.length)];
    setCharType(nextType);

    // 2. 선택된 이미지(nextType)에 맞는 메시지 리스트 연결
    let targetList: string[] = [];
    switch (nextType) {
      case 'dance':
        targetList = MSG.DANCE_MESSAGES;
        break;
      case 'good':
        targetList = MSG.GOOD_MESSAGES;
        break;
      case 'heart':
        targetList = MSG.HEART_MESSAGES;
        break;
      case 'hi':
        targetList = MSG.HI_MESSAGES;
        break;
      case 'water':
        targetList = MSG.WATER_MESSAGES;
        break;
      case 'wink':
        targetList = MSG.WINK_MESSAGES;
        break;
      default:
        targetList = MSG.HI_MESSAGES;
    }

    // 3. 해당 리스트에서 랜덤하게 메시지 하나 선택
    const randomIndex = Math.floor(Math.random() * targetList.length);
    setMessage(targetList[randomIndex]);

    // 4. 안전 범위 내에서 랜덤 위치 이동
    const newX = 20 + Math.random() * 40;
    setPositionX(newX);

    // 5. 애니메이션 및 말풍선 트리거
    setIsBouncing(true);
    setShowBubble(true);

    if (bounceTimerRef.current) clearTimeout(bounceTimerRef.current);
    if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);

    bounceTimerRef.current = setTimeout(() => setIsBouncing(false), 300);
    bubbleTimerRef.current = setTimeout(() => setShowBubble(false), 2500);
  };

  // 캐릭터 타입에 따른 이미지 경로 리턴
  const getCharacterImage = () => {
    switch (charType) {
      case 'dance':
        return IMAGES_PATH.CUTE_DANCE;
      case 'good':
        return IMAGES_PATH.CUTE_GOOD;
      case 'heart':
        return IMAGES_PATH.CUTE_HEART;
      case 'hi':
        return IMAGES_PATH.CUTE_HI;
      case 'water':
        return IMAGES_PATH.CUTE_WATER;
      case 'wink':
        return IMAGES_PATH.CUTE_WINK;
      default:
        return IMAGES_PATH.CUTE_HI;
    }
  };

  return (
    <div className="relative h-[161px] w-full overflow-hidden rounded-t-4xl bg-[#f9ffff] shadow-[0_-8px_30px_rgba(0,132,133,0.08)]">
      {/* 🌈 파스텔 하늘 배경 디자인 */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#E6F7F5] via-[#F0F4FF] to-[#FFF0F5]">
        <div className="absolute top-4 left-[15%] h-8 w-8 animate-bounce rounded-full bg-white/40 blur-xl duration-[5s]"></div>
        <div className="absolute top-12 left-[45%] h-12 w-12 animate-pulse rounded-full bg-hana-main/10 blur-xl"></div>
        <div className="absolute top-6 right-[20%] h-10 w-10 animate-bounce rounded-full bg-[#FFD1DC]/30 blur-xl duration-[4s]"></div>
      </div>

      {/* 🍃 부드러운 언덕 바닥 */}
      <div className="absolute bottom-[-20px] left-[-10%] h-[60px] w-[120%] rotate-[-1deg] rounded-[100%] bg-gradient-to-b from-[#EDF9F6] to-[#D7EAE5] shadow-inner"></div>

      {/* 🌸 흩날리는 파스텔 도트 (수정 완료) */}
      <div className="pointer-events-none absolute inset-0">
        {petals.map((petal) => (
          <div
            key={`petal-${petal.id}`}
            className="absolute h-1.5 w-1.5 animate-petal rounded-full bg-[#FFD1DC]"
            style={{
              left: `${petal.left}%`,
              top: `${petal.top}%`,
              animationDelay: `${petal.delay}s`,
              opacity: 0.6,
            }}
          />
        ))}
      </div>

      <button
        type="button"
        className="absolute bottom-[16px] z-10 flex flex-col items-center outline-none transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
        style={{
          left: `${positionX}%`,
          transform: 'translateX(-50%)',
        }}
        onClick={handleCharacterClick}
      >
        {/* 💬 말풍선 */}
        <div
          className={`mb-3 flex transform items-center justify-center rounded-[24px] border border-white/60 bg-white/80 px-5 py-2.5 shadow-[0_12px_24px_rgba(0,132,133,0.1)] backdrop-blur-md transition-all duration-400 ${
            showBubble
              ? 'translate-y-0 scale-100 opacity-100'
              : 'pointer-events-none translate-y-4 scale-75 opacity-0'
          }`}
        >
          <span className="whitespace-nowrap font-hana-bold text-[#006A6B] text-[13px] tracking-tight">
            {message}
          </span>
          <div className="-bottom-1.5 -translate-x-1/2 absolute left-1/2 h-3 w-3 rotate-45 bg-white/80"></div>
        </div>

        {/* 🧚 캐릭터 컨테이너 */}
        <div
          className={`relative h-[90px] w-[70px] cursor-pointer transition-transform duration-200 ${
            isBouncing ? '-translate-y-6 scale-110' : 'translate-y-0 scale-100'
          }`}
        >
          {/* 그림자 */}
          <div
            className={`-bottom-1 -translate-x-1/2 absolute left-1/2 h-2 rounded-[100%] bg-[#4A635E]/10 blur-[4px] transition-all duration-200 ${
              isBouncing ? 'w-4 opacity-20' : 'w-10 opacity-100'
            }`}
          ></div>

          <Image
            src={getCharacterImage()}
            alt="character"
            fill
            className="object-contain"
            priority
          />
        </div>
      </button>

      <style jsx>{`
        @keyframes petal {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
          50% { opacity: 0.8; }
          100% { transform: translate(20px, 40px) rotate(360deg); opacity: 0; }
        }
        .animate-petal {
          animation: petal 4s linear infinite;
        }
      `}</style>
    </div>
  );
}
