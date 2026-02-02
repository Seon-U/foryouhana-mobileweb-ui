'use client';

export default function BankBookRegisterPage() {
  return (
    <div className="min-h-screen bg-gray-100 px-4 pt-6">
      {/* 카드 영역 */}
      <div className="divide-y rounded-2xl bg-white px-6">
        {/* 통장 만들기 */}
        <button
          type="button"
          className="flex w-full items-center justify-between py-5 text-left"
          onClick={() => {}}
        >
          <div>
            <div className="mb-1 font-semibold text-base">통장 만들기</div>
            <p className="text-gray-500 text-sm">
              입출금/적금/청약/외화통장과 전자금융 신청
            </p>
          </div>
          <span className="text-gray-400 text-lg">{'>'}</span>
        </button>

        {/* 통장 + 카드 만들기 */}
        <button
          type="button"
          className="flex w-full items-center justify-between py-5 text-left"
          onClick={() => {}}
        >
          <div>
            <div className="mb-1 flex items-center gap-2">
              <span className="font-semibold text-base">통장+카드만들기</span>
              <span className="rounded-full bg-purple-100 px-2 py-0.5 font-medium text-purple-600 text-xs">
                만 12세 이상
              </span>
            </div>
            <p className="text-gray-500 text-sm">
              입출금통장과 체크카드 한 번에 신청
            </p>
          </div>
          <span className="text-gray-400 text-lg">{'>'}</span>
        </button>

        {/* 카드 만들기 */}
        <button
          type="button"
          className="flex w-full items-center justify-between py-5 text-left"
          onClick={() => {}}
        >
          <div>
            <div className="mb-1 flex items-center gap-2">
              <span className="font-semibold text-base">카드만들기</span>
              <span className="rounded-full bg-purple-100 px-2 py-0.5 font-medium text-purple-600 text-xs">
                만 12세 이상
              </span>
            </div>
            <p className="text-gray-500 text-sm">
              이미 통장이 있다면, 체크카드만 신청
            </p>
          </div>
          <span className="text-gray-400 text-lg">{'>'}</span>
        </button>
      </div>
    </div>
  );
}
