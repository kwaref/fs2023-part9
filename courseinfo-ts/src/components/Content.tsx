import { CoursePart } from '../types';
import Part from './Part';

interface ContentProps {
    parts: CoursePart[];
}

const Content = (props: ContentProps): JSX.Element => {
    return (
        <>
            {
                props.parts.map(part => <Part key={part.name} part={part}/>)
            }
        </>
    );
};

export default Content;