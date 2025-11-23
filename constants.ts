import { KDCRule, CallNumber } from './types';

export const KOREAN_CONSONANTS = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
export const KOREAN_VOWELS = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];

export const KDC_RULES: KDCRule[] = [
  { 
    title: "1단계: 분류 기호 (십진법 순서)", 
    color: "text-blue-600",
    explanation: "책의 주제를 나타내는 번호입니다. 숫자의 크기대로 정렬하되, 소수점 이하는 자릿수별로 비교해야 합니다. (예: 0.1이 0.01보다 큼)",
    examples: [
        { title: "530.5 vs 530.49", note: "530.49는 530.50보다 작으므로 530.49가 먼저 옵니다." },
        { title: "813.1 vs 813.01", note: "0.01은 0.1보다 작으므로 813.01이 먼저 옵니다." },
    ]
  },
  { 
    title: "2단계: 저자 기호 (한글 → 숫자 → 기호)", 
    color: "text-fuchsia-600",
    explanation: "분류 기호가 같으면 저자 기호로 정렬합니다. 순서: 1) 한글(가나다순) → 2) 숫자(작은 수 우선) → 3) 저작 기호(가나다순).",
    examples: [
        { title: "가294 vs 각294", note: "받침이 없는 '가'가 받침이 있는 '각'보다 먼저 옵니다." },
        { title: "김099 vs 김100", note: "99가 100보다 작으므로 김099가 먼저 옵니다." },
        { title: "동6가 vs 동61ㄱ", note: "숫자 6이 61보다 작으므로 동6가가 먼저 옵니다." } 
    ]
  },
  { 
    title: "3단계: 권차 및 복본 (시리즈 우선)", 
    color: "text-rose-600",
    explanation: "저자 기호까지 같다면: 1) 권차(v.)가 복본(c.)보다 먼저 오며, 2) 그 다음 숫자가 작은 순서대로 정렬합니다.",
    examples: [
        { title: "v.1 vs v.2", note: "1권이 2권보다 먼저 옵니다." },
        { title: "v.1 vs c.1", note: "보통 권차(v.)가 복본(c.)보다 우선합니다." },
    ]
  },
];

export const QUIZ_TEMPLATES: CallNumber[][] = [
    // 1. Complex Vowels & Batchim
    [
        { class: "813.5", author: "갤300", vol: "" },    
        { class: "813.5", author: "게300", vol: "" },
        { class: "813.5", author: "길300", vol: "" }
    ],
    // 2. Double Vowels & Decimals
    [
        { class: "500.1", author: "왜20", vol: "v.1" },    
        { class: "500.1", author: "월20", vol: "c.1" },
        { class: "500.01", author: "와20", vol: "v.1" }
    ],
    // 3. Batchim & Numbers
    [
        { class: "630.01", author: "앋100", vol: "ㄱ" },
        { class: "630.01", author: "안099", vol: "ㄱ" },
        { class: "630.001", author: "암100", vol: "ㄴ" }
    ],
    // 4. No Batchim, Vowels, Author Num
    [
        { class: "100", author: "겨100", vol: "" },
        { class: "100", author: "게050", vol: "" },
        { class: "100", author: "갸050", vol: "" }
    ],
    // 5. Complex Mix
    [
        { class: "911.3", author: "간10", vol: "v.1" },      
        { class: "911.29", author: "달10", vol: "c.1" },
        { class: "911.3", author: "갈10", vol: "v.2" }
    ],
    // 6. Work Mark & Decimals
    [
        { class: "700.5", author: "장20", vol: "ㄱ" }, 
        { class: "700.49", author: "장20", vol: "" },
        { class: "700.5", author: "장20", vol: "" }
    ]
];