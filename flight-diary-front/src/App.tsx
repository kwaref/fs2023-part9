import { useEffect, useState } from "react";
import diaryService from './services/diaryService';
import { DiaryType } from "./types";
import DiaryList from "./components/DiaryList";
import DiaryForm from "./components/DiaryForm";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryType[]>([]);

  useEffect(() => {
    diaryService.getAll().then(dd => setDiaries(dd));
  }, []);

  const handleAddEntry = (newEntry: Omit<DiaryType, 'id'>) => {
    diaryService.addEntry(newEntry).then(entry => {
      const entries: DiaryType[] = diaries.concat(entry);
      setDiaries(entries);
    })
  }

  return (
    <div>
      <DiaryForm addNew={handleAddEntry} />
      <DiaryList diaries={diaries} />
    </div>
  );
};

export default App;