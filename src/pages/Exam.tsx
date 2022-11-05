import { useParams, Link } from "react-router-dom";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db";

const Exam = () => {
  let { id } = useParams();

  const exam = useLiveQuery(async () => {
    if (id) {
      try {
        const exam = await db.exams.get({ examId: id });
        const tests = await db.tests
          .where("testId")
          .anyOf(exam.tests)
          .toArray();
        return { examId: exam.examId, tests };
      } catch (_) {}
    }
  }, []);

  return (
    <div className="container">
      {exam ? (
        <div>
          <div>Exam ID: {exam.examId}</div>

          {exam.tests.map((d: any, key: number) => (
            <div className="allExams" key={key}>
              <div className="eid">
                Test ID:{" "}
                <strong>
                  <Link to={`/print/${d.testId}`}>{d.testId}</Link>
                </strong>
                <div>
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
                            style={{ color: d.c ? "green" : "red" }}
                          >
                            <span className="num">{key + 1}) </span>
                            {d.a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>ID not found.</div>
      )}
    </div>
  );
};

export default Exam;
