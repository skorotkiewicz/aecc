import { useLiveQuery } from "dexie-react-hooks";
import { db } from "./../db";

const Exams = () => {
  const exams = useLiveQuery(() => db.exams.toArray());

  return (
    <div>
      {exams &&
        exams.map((d: any, key: number) => (
          <div className="allExams" key={key}>
            <div className="eid">
              Exam ID: <strong>{d.examId}</strong>
            </div>

            {d.qa.map((d: any, key: number) => (
              <div className="exam-main" key={key}>
                <div>
                  <p style={{ fontSize: 10 }}>ID: {d.u}</p>
                  <p className="title">{d.q}</p>
                </div>
                <ul>
                  {d.a.map((d: any, key: number) => (
                    <li
                      key={key}
                      style={{ color: d.correct ? "green" : "red" }}
                    >
                      <span className="num">{key + 1}) </span>
                      {d.answer}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

export default Exams;
