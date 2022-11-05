import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "./../db";

const Search = () => {
  let { id } = useParams();
  let navigate = useNavigate();
  const [search, setSearch] = useState<string>("");

  const test = useLiveQuery(async () => {
    if (id) {
      const tId = await db.tests.get({ testId: id });

      if (tId) {
        return tId;
      } else {
        return await db.exams.get({ examId: id });
      }
    }
  }, [id]);

  return (
    <div>
      <input
        type="text"
        className="search"
        value={search}
        placeholder="Type Exam or Test ID and press Enter"
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e: any) => {
          if (e.key === "Enter") {
            navigate("/search/" + e.target.value);
            setSearch("");
          }
        }}
      />

      {!test && id && (
        <div style={{ margin: 15 }}>
          No exams or tests found under the given ID.
        </div>
      )}

      {test && test.examId && (
        <div className="allExams">
          <div className="eid">
            <p style={{ marginBottom: 10 }}>{test.title}</p>
            Exam ID:{" "}
            <strong>
              <Link to={`/exam/${test.examId}`}>{test.examId}</Link>
            </strong>
          </div>
        </div>
      )}

      {test && test.testId && (
        <div className="allExams">
          <p className="eid">
            Test ID:{" "}
            <strong>
              <Link to={`/print/${test.testId}`}>{test.testId}</Link>
            </strong>
          </p>

          {test.qa.map((d: any, key: number) => (
            <div className="exam-main" key={key}>
              <div>
                <p className="title">{d.q}</p>
                <p className="id" style={{ fontSize: 10 }}>
                  ID: {d.u}
                </p>
              </div>

              <ul>
                {d.a.map((d: any, key: number) => (
                  <li style={{ color: d.c ? "green" : "red" }} key={key}>
                    <span className="num">{key + 1}) </span>
                    {d.a}
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

export default Search;
