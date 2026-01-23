'use client';
import { ExternalLink, FileDownIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '../ui/button';

/**
 * @page: HometaxReportCard
 * @description: 유기정기금 홈택스 신고 내역 표시 및 신고 관리 카드 컴포넌트 (파일 탐색기 및 신고 완료 기능 포함)
 * @example <HometaxReportCard onReportComplete={() => console.log('완료')} />
 * @author: minyoung
 * @date: 2026-01-23
 */

interface HometaxReportCardProps {
  onReportComplete: () => void;
}

export const HometaxReportCard = ({
  onReportComplete,
}: HometaxReportCardProps) => {
  return (
    <Card className="h-43 w-80.6 border-0 bg-hana-gray-50">
      {' '}
      <div className="space-y-2">
        <CardContent className="flex flex-col gap-1">
          <p className="font-hana-medium text-[10px]">
            1. 아래의 신고 서류를 다운받으세요.
          </p>
          <CardContent className="flex items-center gap-1 font-hana-medium text-[8px] text-hana-gray-600">
            <div className="flex gap-1">
              <label
                htmlFor="file-upload"
                className="flex cursor-pointer items-center gap-1 font-hana-medium text-[8px] text-hana-gray-600 tracking-tight hover:opacity-80"
              >
                <span>유기정기금 신고 자료 다운</span>
                <FileDownIcon className="h-3 w-3" />
              </label>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={(e) => console.log(e.target.files?.[0])}
              />
            </div>
          </CardContent>
        </CardContent>

        <CardContent className="flex flex-col gap-1">
          <p className="font-hana-medium text-[10px]">
            2. 홈택스에서 유기정기금 신고를 진행하세요.
          </p>
          <CardContent className="font-hana-medium text-[8px]">
            <a
              href="https://www.hometax.go.kr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[8px] text-hana-gray-600 underline underline-offset-4"
            >
              <span>홈택스 바로가기</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </CardContent>
        </CardContent>

        <CardContent className="flex flex-col gap-1">
          <p className="font-hana-medium text-[10px]">
            3. 신고 후 아래의 버튼을 눌러 본 서비스에 변경 내용을 적용해주세요.
          </p>
        </CardContent>
        <div className="flex justify-center">
          <Button
            onClick={onReportComplete}
            className="h-6.75 w-52.5 bg-hana-blue font-hana-cm text-[10px] hover:bg-hana-blue"
          >
            신고 완료
          </Button>
        </div>
      </div>
    </Card>
  );
};
