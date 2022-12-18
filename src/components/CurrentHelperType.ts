import { questionType } from '../api/questions'

export type CurrentHelperType = {
  helper: ''|'fifty'|'crowd'|'phone',
  text?: string,
  current?: number,
  question?: questionType,
  currentQuestion?: questionType
}
