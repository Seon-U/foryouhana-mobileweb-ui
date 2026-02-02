/**
 * @page: 계좌번호 생성 유틸리티
 * @description: 하나은행 형식의 계좌번호를 생성합니다. 형식: 123-456789-12345
 * @author: 권순범
 * @date: 2026-01-26
 */

import { randomInt } from 'node:crypto';

/**
 * 하나은행 형식 계좌번호 생성
 * 형식: 123-456789-12345 (3자리-6자리-5자리)
 */
export function generateAccountNumber(): string {
  const part1 = randomInt(100, 1000).toString();
  const part2 = randomInt(100000, 1000000).toString();
  const part3 = randomInt(10000, 100000).toString();

  return `${part1}-${part2}-${part3}`;
}
