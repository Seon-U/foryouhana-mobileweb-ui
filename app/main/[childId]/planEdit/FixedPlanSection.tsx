'use client';
import { CustomButton } from '@/components/cmm/CustomButton';
import { HometaxReportCard } from '@/components/cmm/HometaxSupportCard';
import TitlePlanSelect from '@/components/cmm/TitlePlanSelect';

export default function FixedPlanSection({
  isFixed,
  prev,
  onChange,
  onBlockedChange,
}: {
  isFixed: boolean;
  onChange: (v: boolean) => void;
  prev: boolean;
  onBlockedChange: (v: boolean) => void;
}) {
  return (
    <div>
      <TitlePlanSelect title="유기정기금" />
      {prev ? (
        <div>
          {isFixed ? (
            <CustomButton
              preset="redlong"
              onClick={() => {
                onChange(!isFixed);
                onBlockedChange(true);
              }}
            >
              중단 및 변경하기
            </CustomButton>
          ) : (
            <div>
              <CustomButton
                preset="greenlong"
                onClick={() => {
                  onChange(!isFixed);
                  onBlockedChange(false);
                }}
              >
                변경 취소하기
              </CustomButton>
              <div className="flex items-center justify-center pt-4">
                <HometaxReportCard
                  onReportComplete={() => onBlockedChange(false)}
                />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          {!isFixed ? (
            <CustomButton
              preset="lightgreenlong"
              onClick={() => {
                onChange(!isFixed);
                onBlockedChange(true);
              }}
            >
              신고하기
            </CustomButton>
          ) : (
            <CustomButton
              preset="lightgreenlong"
              onClick={() => {
                onChange(!isFixed);
                onBlockedChange(false);
              }}
            >
              신고하지 않기
            </CustomButton>
          )}
          {isFixed && (
            <div className="flex items-center justify-center pt-4">
              <HometaxReportCard
                onReportComplete={() => onBlockedChange(false)}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
