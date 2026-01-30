import TitlePlanSelect from './TitlePlanSelect';

type Props = {
  startDisable?: boolean;
  endDisable?: boolean;
  startDate: string;
  endDate: string;
  onChangeStart: (v: string) => void;
  onChangeEnd: (v: string) => void;
};

export default function PlanStartEndInput({
  startDisable,
  endDisable,
  startDate,
  endDate,
  onChangeStart,
  onChangeEnd,
}: Props) {
  const handleChangeEnd = (value: string) => {
    if (startDate && value <= startDate) {
      alert('종료 날짜는 시작 날짜 이후여야 합니다.');
      return;
    }
    onChangeEnd(value);
  };

  return (
    <div className="flex justify-between pt-4">
      <div>
        <TitlePlanSelect title="변경 플랜 시작 날짜" />
        <input
          type="month"
          disabled={startDisable}
          value={startDate ?? ''}
          min={new Date().toISOString().split('T')[0]}
          onChange={(e) => onChangeStart(e.target.value)}
          className={
            startDisable
              ? 'h-[42px] w-[155px] rounded-md bg-hana-gray-300 px-2 font-hana-regular'
              : 'h-[42px] w-[155px] rounded-md bg-hana-light-green px-2 font-hana-regular'
          }
        />
      </div>
      <div>
        <TitlePlanSelect title="변경 플랜 종료 날짜" />
        <input
          type="month"
          disabled={endDisable}
          value={endDate ?? ''}
          min={new Date().toISOString().split('T')[0]}
          onChange={(e) => handleChangeEnd(e.target.value)}
          className={
            endDisable
              ? 'h-[42px] w-[155px] rounded-md bg-hana-gray-300 px-2 font-hana-regular'
              : 'h-[42px] w-[155px] rounded-md bg-hana-light-green px-2 font-hana-regular'
          }
        />
      </div>
    </div>
  );
}
