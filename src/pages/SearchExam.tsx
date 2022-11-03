import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "./../db";

const SearchExam = () => {
  let { eid } = useParams();
  let navigate = useNavigate();
  const [search, setSearch] = useState<string>("");

  const exam = useLiveQuery(async () => {
    if (eid) {
      return await db.exams.get({ examId: eid });
    }
  }, [eid]);

  return (
    <div>
      <input
        type="text"
        className="search"
        value={search}
        placeholder="Type ExamID and press Enter"
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e: any) => {
          if (e.key === "Enter") {
            navigate("/search/" + e.target.value);
            setSearch("");
          }
        }}
      />

      {!exam && eid && (
        <div style={{ margin: 15 }}>No exam found under the given ID.</div>
      )}

      {exam && (
        <div className="allExams">
          <p className="eid">
            Exam ID: <strong>{exam.examId}</strong>
          </p>

          {exam.qa.map((d: any, key: number) => (
            <div className="exam-main" key={key}>
              <div>
                <p className="title">{d.q}</p>
                <p className="id" style={{ fontSize: 10 }}>
                  ID: {d.u}
                </p>
              </div>

              <ul>
                {d.a.map((d: any, key: number) => (
                  <li style={{ color: d.correct ? "green" : "red" }} key={key}>
                    <span className="num">{key + 1}) </span>
                    {d.answer}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchExam;
