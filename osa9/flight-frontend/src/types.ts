export interface Diary {
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comment?: string;
}

export type NewDiary = Omit<Diary, 'id'>

export interface DiaryFormProps {
  addDiary: (diary: NewDiary) => Promise<void>;
  errorMessage: string;
}

export interface ValidationError {
  message: string;
  errors: Record<string, string[]>
}