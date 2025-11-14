import type { Diary } from '../types'

const Diaries = ({ diaries }: { diaries: Diary[] }) => {
  return (
    <div>
      <h2>Diary entries</h2>
      <ul style={{listStyle: 'none', padding: 0}}>
        {diaries.map(diary => (
          <li key={diary.id}>
            <h3>{diary.date} </h3>
            <p>visibility: {diary.visibility}</p>
            <p>weather: {diary.weather}</p>
            <p>comment: {diary.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Diaries