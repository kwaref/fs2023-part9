import { DiaryType } from "../types";
import Diary from "./Diary";

interface DiaryListProps {
    diaries: DiaryType[];
}

const DiaryList = (props: DiaryListProps) => {
    return (
        <div>
            <h3>Diary Entries</h3>
            <ul>
                {
                    props.diaries.map(diary => <Diary key={diary.id} diary={diary} />)
                }
            </ul>
        </div>
    );
};

export default DiaryList;