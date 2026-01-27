import Link from 'next/link';
import { CustomButton } from '@/components/cmm/CustomButton';
import Header from '@/components/cmm/Header';
import IntroCardCarousel from '../../../components/intro/IntroCardCarousel';
import SlideAi from '../../../components/intro/SlideAi';
import SlideBenefit from '../../../components/intro/SlideBenefit';
import SlideIntro from '../../../components/intro/SlidIntro';

export default function ServiceInfo() {
  const cardlist = [
    { id: 'intro', node: <SlideIntro /> },
    { id: 'benefit', node: <SlideBenefit /> },
    { id: 'ai', node: <SlideAi /> },
  ];
  return (
    <div className="w-full text-center">
      <Header content="아이앞으로" />
      <IntroCardCarousel cardlist={cardlist} />
      <div className="pt-3.25 pb-9">
        <Link href={'/onboarding/child-info'}>
          <CustomButton preset="greenlong" className="font-hana-cm">
            내 증여 가능 금액 찾아보기
          </CustomButton>
        </Link>
      </div>
    </div>
  );
}
