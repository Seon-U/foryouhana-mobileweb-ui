import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

type CarouselCard = {
  id: string;
  node: React.ReactNode;
};

type Props = {
  cardlist: CarouselCard[];
};

export default function IntroCardCarousel({ cardlist }: Props) {
  return (
    <Carousel className="mt-0 flex flex-col items-center justify-start pt-1">
      <CarouselContent className="h-165 w-92.5">
        {cardlist.map((card) => (
          <CarouselItem key={card.id} className="h-full w-full">
            <div className="h-full w-full">
              <Card className="h-full w-full bg-hana-carousel-bg-green">
                <CardContent className="flex h-full w-full items-center justify-center">
                  {card.node}
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
