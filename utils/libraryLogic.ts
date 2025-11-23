import { CallNumber } from '../types';

// Extract sorting keys from a CallNumber object
export const getSortKey = (item: CallNumber): any[] => {
  const { class: classStr, author: authorStr, vol: volStr } = item;
  
  // 1. Classification Number (Float)
  const classNum = classStr ? (parseFloat(classStr) || 0) : 0; 
  
  // 2. Author Key [Hangul, Number, WorkMark]
  let authorKey: any[] = [];
  
  if (!authorStr) {
      authorKey = ['', 0, ''];
  } else {
      // Regex: (Hangul)? (Digits)? (Rest)?
      const authorMatch = authorStr.match(/^([ㄱ-ㅎㅏ-ㅣ가-힣]+)?(\d+)?(.*)$/);
      
      if (authorMatch) {
          const hangulPart = authorMatch[1] || '';
          const numberPart = parseInt(authorMatch[2], 10) || 0;
          const workPart = (authorMatch[3] || '').trim();
          
          authorKey.push(hangulPart);
          authorKey.push(numberPart);
          authorKey.push(workPart);
      } else {
          authorKey.push(authorStr);
          authorKey.push(0);
          authorKey.push('');
      }
  }

  // 3. Volume/Copy Key [TypePriority, Number]
  let volCopyKey: number[] = [];
  const volMatch = volStr.match(/v\.(\d+)/i);
  const copyMatch = volStr.match(/c\.(\d+)/i);

  if (volMatch) {
      // Volume (v) priority 1
      volCopyKey.push(1); 
      volCopyKey.push(parseInt(volMatch[1], 10) || 0);
  } else if (copyMatch) {
      // Copy (c) priority 2
      volCopyKey.push(2); 
      volCopyKey.push(parseInt(copyMatch[1], 10) || 0);
  } else {
      // Default
      volCopyKey.push(0);
      volCopyKey.push(0);
  }

  return [classNum, ...authorKey, ...volCopyKey];
};

export const compareCallNumbers = (itemA: CallNumber, itemB: CallNumber): number => {
  const keyA = getSortKey(itemA);
  const keyB = getSortKey(itemB);

  for (let i = 0; i < keyA.length; i++) {
    const a = keyA[i];
    const b = keyB[i];

    if (typeof a === 'number' && typeof b === 'number') {
      if (a < b) return -1;
      if (a > b) return 1;
    } else if (typeof a === 'string' && typeof b === 'string') {
      // String comparison handles Hangul unicode order naturally
      if (a < b) return -1;
      if (a > b) return 1;
    }
  }
  
  return 0;
};

export const getComparisonReason = (itemA: CallNumber, itemB: CallNumber): string => {
  const keyA = getSortKey(itemA);
  const keyB = getSortKey(itemB);

  const compareElements = [
    { type: '분류 기호', keyIndex: 0, priority: 1 },
    { type: '저자 한글', keyIndex: 1, priority: 2 },
    { type: '저자 번호', keyIndex: 2, priority: 2 },
    { type: '저작 기호', keyIndex: 3, priority: 2 },
    { type: '권/복본 종류', keyIndex: 4, priority: 3 },
    { type: '권/복본 번호', keyIndex: 5, priority: 3 },
  ];

  for (let i = 0; i < keyA.length; i++) {
    const a = keyA[i];
    const b = keyB[i];
    const { type, priority } = compareElements[i] || { type: '알 수 없음', priority: 0};

    if (a !== b) {
      const smaller = a < b ? 'A' : 'B';
      
      if (type === '분류 기호') {
        return `[1단계] 분류 기호(${a < b ? a : b})가 더 작으므로 책 ${smaller}가 먼저 옵니다.`;
      } else if (type === '저자 한글') {
        const orderType = (typeof a === 'string' && typeof b === 'string') 
            ? (a < b ? `'${a}'가 '${b}'보다` : `'${b}'가 '${a}'보다`) 
            : '가나다';
        return `[2단계] 저자명 한글 순서(${orderType})에 따라 책 ${smaller}가 먼저 옵니다.`;
      } else if (type === '저자 번호') {
        return `[2단계] 저자 번호(${a < b ? a : b})가 더 작으므로 책 ${smaller}가 먼저 옵니다.`;
      } else if (type === '권/복본 종류') {
         return `[3단계] 복본(c.)보다 권차(v.)가 우선하므로 책 ${smaller}가 먼저 옵니다.`;
      } else if (type === '권/복본 번호') {
          return `[3단계] 번호 순서상 책 ${smaller}가 더 앞섭니다.`;
      }
      return `[${priority}단계] ${type} 비교에서 차이가 있어 책 ${smaller}가 먼저 옵니다.`;
    }
  }
  return "두 청구기호가 동일하거나 구분할 수 없습니다.";
};