import { CoursePart } from "../types";

interface PartProps {
    part: CoursePart;
}

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const Part = (props: PartProps) => {
    switch (props.part.kind) {
        case 'basic':
            return (<>
                <h3 style={{ marginBottom: "0" }}>{props.part.name} {props.part.exerciseCount} </h3>
                <em>{props.part.description}</em>
            </>);
        case 'group':
            return (<>
                <h3 style={{ marginBottom: "0" }}>{props.part.name} {props.part.exerciseCount} </h3>
                <em>project exercises: {props.part.groupProjectCount}</em>
            </>);
        case 'background':
            return (<>
                <h3 style={{ marginBottom: "0" }}>{props.part.name} {props.part.exerciseCount} </h3>
                <em>{props.part.description}</em>
                <em>{props.part.backgroundMaterial}</em>
            </>);
        case 'special':
            return (<>
                <h3 style={{ marginBottom: "0" }}>{props.part.name} {props.part.exerciseCount} </h3>
                <em>{props.part.description}</em>
                <p>
                    required skills: {props.part.requirements.join(', ')}
                </p>
            </>);
        default:
            return assertNever(props.part);
    }
};

export default Part;