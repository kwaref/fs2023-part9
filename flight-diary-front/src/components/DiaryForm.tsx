import { useState } from "react";
import { DiaryType } from "../types";

type AddHandler = (entry: Omit<DiaryType, 'id'>) => void;

interface DairyFormProps {
    addNew:AddHandler;
}

const DiaryForm = (props: DairyFormProps) => {
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [visibility, setVisibility] = useState('great');
    const [weather, setWeather] = useState('sunny');
    const [comment, setComment] = useState('');

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        evt.target.name === 'date' && setDate(evt.target.value);
        evt.target.name === 'visibility' && setVisibility(evt.target.value);
        evt.target.name === 'weather' && setWeather(evt.target.value);
        evt.target.name === 'comment' && setComment(evt.target.value);
    };

    const submit = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        const newEntry: Omit<DiaryType, 'id'> = {
            date,
            visibility,
            weather,
            comment
        };
        setVisibility('great');
        setWeather('sunny');
        setDate(new Date().toISOString().split("T")[0]);
        setComment('');
        console.log(newEntry);
        props.addNew(newEntry)
    };

    return (
        <div>
            <h3>Add new entry</h3>
            <form onSubmit={submit}>
                <div>date <input name="date" type="date" value={date} onChange={handleChange} /></div>
                <div>
                    visibility {' '}
                    <label>
                        great
                        <input type="radio" name="visibility" value="great" checked={visibility === 'great'} onChange={handleChange} />
                    </label>
                    <label>
                        good
                        <input type="radio" name="visibility" value="good" checked={visibility === 'good'} onChange={handleChange} />
                    </label>
                    <label>
                        ok
                        <input type="radio" name="visibility" value="ok" checked={visibility === 'ok'} onChange={handleChange} />
                    </label>
                    <label>
                        poor
                        <input type="radio" name="visibility" value="poor" checked={visibility === 'poor'} onChange={handleChange} />
                    </label>
                </div>
                <div>
                    weather {' '}
                    <label>
                        sunny
                        <input type="radio" name="weather" value="sunny" checked={weather === 'sunny'} onChange={handleChange} />
                    </label>
                    <label>
                        rainy
                        <input type="radio" name="weather" value="rainy" checked={weather === 'rainy'} onChange={handleChange} />
                    </label>
                    <label>
                        cloudy
                        <input type="radio" name="weather" value="cloudy" checked={weather === 'cloudy'} onChange={handleChange} />
                    </label>
                    <label>
                        stormy
                        <input type="radio" name="weather" value="stormy" checked={weather === 'stormy'} onChange={handleChange} />
                    </label>
                    <label>
                        windy
                        <input type="radio" name="weather" value="windy" checked={weather === 'windy'} onChange={handleChange} />
                    </label>
                </div>
                <div>comment <input name="comment" value={comment} type="text" onChange={handleChange} /></div>
                <div><button type="submit">add</button></div>
            </form>
        </div>
    );
};

export default DiaryForm;