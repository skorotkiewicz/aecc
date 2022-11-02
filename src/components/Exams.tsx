import { useLiveQuery } from "dexie-react-hooks";
import { db } from "./../db";

const Exams = () => {
  const exams = useLiveQuery(() => db.exams.toArray());

  return (
    <div>
      <h1>WIP</h1>
      {exams !== undefined && (
        <div>
          {exams.map((d: any, key: number) => (
            <div key={key}>
              {d.examStudents.map((d: any, key: number) => (
                <div key={key}>
                  <div>{JSON.stringify(d)}</div>
                </div>
              ))}
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Exams;
