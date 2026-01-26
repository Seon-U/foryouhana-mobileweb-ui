import InfoBadge from './IntroBadge';

type InfoCardProps = {
  badge: string;
  children: React.ReactNode;
};

export function InfoCard({ badge, children }: InfoCardProps) {
  return (
    <div className="relative w-full rounded-[14px] bg-white px-4 py-2 shadow-md">
      <div className="mb-1 flex justify-center">
        <InfoBadge label={badge} />
      </div>
      <div className="text-center text-[15px] text-hana-black leading-relaxed">
        {children}
      </div>
    </div>
  );
}
