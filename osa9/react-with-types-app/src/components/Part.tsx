import type { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <b>{part.name} {part.exerciseCount}</b>
          <br /> <i>{part.description}</i>
        </div>
      );
    case "group":
      return (
        <div>
          <b>{part.name} {part.exerciseCount}</b>
          <br /> project exercises {part.groupProjectCount}
        </div>
      );
    case "background":
      return (
        <div>
          <b>{part.name} {part.exerciseCount}</b>
          <br /> <i>{part.description}</i>
          <br /> background material: {part.backgroundMaterial}
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;