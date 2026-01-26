import { CustomButton } from '@/components/cmm/CustomButton';

type BinaryToggleProps = {
  value: boolean;
  onChange: (v: boolean) => void;
  trueLabel: string;
  falseLabel: string;
};

export function BinaryToggle({
  value,
  onChange,
  trueLabel,
  falseLabel,
}: BinaryToggleProps) {
  return (
    <div className="flex w-full justify-between">
      <CustomButton
        preset={value ? 'lightgreenshort' : 'lightgrayshort'}
        onClick={() => onChange(true)}
      >
        {trueLabel}
      </CustomButton>
      <CustomButton
        preset={!value ? 'lightgreenshort' : 'lightgrayshort'}
        onClick={() => onChange(false)}
      >
        {falseLabel}
      </CustomButton>
    </div>
  );
}
