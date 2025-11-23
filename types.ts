export type TabType = 'compare' | 'rules' | 'quiz';

export interface CallNumber {
  class: string;
  author: string;
  vol: string;
}

export interface QuizItem extends CallNumber {
  id: string;
}

export interface KDCExample {
  title: string;
  note: string;
}

export interface KDCRule {
  title: string;
  color: string;
  explanation: string;
  examples: KDCExample[];
}

export interface ComparisonResult {
  message: string;
  reason: string;
  isError?: boolean;
}

export interface QuizResult {
  correct: boolean;
  message: string;
  correctOrder: QuizItem[];
}