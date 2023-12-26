import { DiaryType } from "../types";

interface DiaryProps {
    diary: DiaryType;
}

const Diary = (props: DiaryProps) => {
  return (
    <div>
        <h3 style={{marginBottom: '5px'}}>{props.diary.date}</h3>
        <p style={{margin: '0'}}>visibility: {props.diary.visibility}</p>
        <p style={{marginTop: '0'}}>weather: {props.diary.weather}</p>
    </div>
  )
}

export default Diary