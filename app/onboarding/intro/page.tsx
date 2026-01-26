import { CustomButton } from '@/components/cmm/CustomButton';
import Header from '@/components/cmm/Header';
import SlideBenefit from '../../../components/intro/SlideBenefit';
import SlideIntro from '../../../components/intro/SlidIntro';
import IntroCardCarousel from './IntroCardCarousel';
import SlideAi from './SlideAi';

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
        <CustomButton preset="greenlong" className="font-hana-cm">
          내 증여 가능 금액 찾아보기
        </CustomButton>
      </div>
    </div>
  );
}
