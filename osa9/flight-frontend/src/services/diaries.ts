import axios from 'axios'
import type { Diary, NewDiary } from '../types'

const baseUrl = '/api/diaries'

const getAll = async (): Promise<Diary[]> => {
  const response = await axios.get<Diary[]>(baseUrl)
  return response.data
}

const create = async (diaryObject : NewDiary): Promise<Diary> => {
  const response = await axios.post<Diary>(baseUrl, diaryObject)
  return response.data
}

export default { getAll, create }