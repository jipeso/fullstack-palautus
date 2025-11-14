import { useState, useEffect } from 'react'

import { type Diary, type NewDiary } from "./types"
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
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data;
        
        if (typeof message === 'string') {
          setErrorMessage(message.split('Something went wrong. ')[1] ?? message)
        }

      } else {
        setErrorMessage("Unknown error from server")
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
