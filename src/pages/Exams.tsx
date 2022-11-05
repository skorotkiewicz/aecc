import { Link } from "react-router-dom";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "./../db";
import Reuse from "../components/Reuse";

const Exams = () => {
  let exams = [];

  try {
    exams = useLiveQuery(() => db.exams.reverse().toArray());
  } catch (_) {}

  return (
    <div>
      {exams && exams.length > 0 ? (
        <div>
          {exams.map((d: any, key: number) => (
            <div className="allExams" key={key}>
              <button
                className="reuse btn"
                onClick={async () => {
                  if (
                    window.confirm(
                      "Do you really want delete this exam included all test?"
                    )
                  ) {
                    await db.exams.where("examId").equals(d.examId).delete();
                    await db.tests.where("testId").anyOf(d.tests).delete();
                  }
                }}
              >
                Delete
              </button>
              <Reuse testId={d.tests[0]} />

              <p style={{ marginBottom: 10 }}>{d.title}</p>
              <strong>
                <p className="examsa">
                  Exam Id: <Link to={`/exam/${d.examId}`}>{d.examId}</Link>
                </p>
              </strong>
              <p>Exam with {d.tests.length} tests</p>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ margin: 15 }}>
          There are no exams yet. Try adding a new exams.
        </div>
      )}
    </div>
  );
};

export default Exams;
