import { InfoIcon } from 'lucide-react';
import { BinaryToggle } from '../../../components/cmm/BinaryToggle';

export default function PensionSection({
  select,
  onSelect,
}: {
  select: boolean;
  onSelect: (isSelected: boolean) => void;
}) {
  return (
    <div>
      <div className="flex items-center gap-1 pb-2">
        <h2 className="font-hana-light text-xs">연금 저축 펀드</h2>
        <InfoIcon className="h-4 w-4 text-hana-gray-400" />
      </div>
      <div className="flex flex-row justify-between">
        <BinaryToggle
          value={select}
          onChange={(v) => onSelect(v)}
          trueLabel="신청"
          falseLabel="신청 안함"
        />
      </div>
      <h4 className="pt-2 font-hana-light text-[10px] text-hana-gray-400">
        ※ 연금저축펀드는 세액공제 혜택이 있는 대신, 연금 수령 요건을 충족하지
        못하고 중도 해지할 경우 기타소득세 등 불이익이 발생할 수 있습니다.
      </h4>
    </div>
  );
}
