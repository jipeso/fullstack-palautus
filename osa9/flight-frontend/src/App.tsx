import { useState, useEffect } from 'react'

import { type ValidationError, type Diary, type NewDiary } from "./types"
import diaryService from './services/diaries.ts'
import Diaries from './components/Diaries.tsx'
import DiaryForm from './components/DiaryForm.tsx'
import axios from 'axios'


const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([])
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    diaryService.getAll().then((diaries: Diary[]) =>
      setDiaries(diaries)
    ) 
  }, [])

  const addDiary = async (diaryObject : NewDiary) => {
    try {
      const returnedDiary = await diaryService.create(diaryObject)
      setDiaries(diaries.concat(returnedDiary))
      setErrorMessage('')
    } catch (error: any) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        setErrorMessage(error.response.data)
      } else {
        setErrorMessage(error)
      }

      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
  }

  return (
    <div>
      <DiaryForm addDiary={addDiary} errorMessage={errorMessage} />
      <Diaries diaries={diaries} />
    </div>
  )
}

export default App
