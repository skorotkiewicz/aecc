import { Link, useNavigate } from "react-router-dom";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "./../db";
import { useData } from "../context/DataContext";

const Exams = () => {
  const { setQuestions }: any = useData();
  const navigate = useNavigate();
  let exams = [];

  try {
    exams = useLiveQuery(() => db.exams.reverse().toArray());
  } catch (_) {}

  return (
    <div>
      {exams && exams.length > 0 ? (
        exams.map((d: any, key: number) => (
          <div className="allExams" key={key}>
            <div className="eid">
              Exam ID:{" "}
              <strong>
                <Link to={`/print/${d.examId}`}>{d.examId}</Link>

                <button
                  className="reuse btn"
                  onClick={async () => {
                    if (
                      window.confirm("Do you really want delete this exam?")
                    ) {
                      await db.exams.where("examId").equals(d.examId).delete();
                    }
                  }}
                >
                  Delete
                </button>

                <button
                  className="reuse btn"
                  onClick={async () => {
                    const exam = await db.exams.get({ examId: d.examId });
                    const stg: any = [];
                    exam.qa.map((d: any) => {
                      stg.push({ id: d.u - 1, question: d.q, answers: d.a });
                    });
                    setQuestions(stg);
                    navigate("/create");
                  }}
                >
                  Reuse
                </button>
              </strong>
            </div>

            {d.qa.map((d: any, key: number) => (
              <div className="exam-main" key={key}>
                <div>
                  <p className="id" style={{ fontSize: 10 }}>
                    ID: {d.u}
                  </p>
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
        ))
      ) : (
        <div style={{ margin: 15 }}>
          There are no exams yet. Try adding a new exams.
        </div>
      )}
    </div>
  );
};

export default Exams;
