export interface Topic {
  id: string;
  title: string;
  emoji: string;
  planet: string;
  description: string;
  color: string;
  gradient: string;
  shadow: string;
  levelCount: number;
}

export interface Exercise {
  question: string;
  options: string[];
  correct: string;
  tip: string;
}

export interface LevelProgress {
  completed: boolean;
  stars: number;
}

export interface TopicProgress {
  [levelIdx: number]: LevelProgress;
}

export interface Progress {
  [topicId: string]: TopicProgress;
}

export interface User {
  name: string;
  grade: string;
  email: string;
  password: string;
  avatar?: string;
}

export type ViewName = 'login' | 'dashboard' | 'profile' | 'constellation' | 'level' | 'result';
export type StarSize = 'sm' | 'md' | 'lg';
export type EncouragementType = 'correct' | 'wrong';
