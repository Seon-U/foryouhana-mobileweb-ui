type IntroStatCardProps = {
  badge: string;
  title: string;
};

export function IntroStatCard({ badge, title }: IntroStatCardProps) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-[14px] bg-white px-4 py-3 shadow-md">
      <div className="inline-flex items-center rounded-full bg-linear-to-r from-[#01716D] to-[#0B9C97] px-1 py-1 text-[10px] text-white">
        {badge}
      </div>
      <div className="text-[10px] text-hana-black">{title}</div>
    </div>
  );
}
