import { Link } from "react-router-dom";
import { useState } from "react";
import { XCircle } from "react-feather";
import Model from "../components/Model";
import QForm from "../components/QForm";
import { useData } from "../context/DataContext";

const Create = () => {
  const { questions, setQuestions }: any = useData();
  const [exams, setExams] = useState<any>([]);
  const [examsStudents, setExamsStudents] = useState<any>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const addQuestion = () => {
    setQuestions((prev: any) => [...prev, { answers: [{}, {}, {}, {}] }]);
  };

  return (
    <div>
      <button className="add-question" onClick={addQuestion}>
        Add Question
      </button>

      <div className="container">
        <div className="questions">
          {questions.map((question: string, i: number) => (
            <QForm key={i} id={i} question={question} />
          ))}
        </div>
        {modalOpen && (
          <Model
            modalOpen={modalOpen}
            setExams={setExams}
            setExamsStudents={setExamsStudents}
            questions={questions}
            setModalOpen={setModalOpen}
          />
        )}
        {questions.length > 0 ? (
          <>
            <button
              className="btn clear"
              onClick={() => {
                if (window.confirm("Do you really want to clear form?")) {
                  setQuestions([]);
                }
              }}
            >
              Clear form
            </button>

            <button
              className={!modalOpen ? "generateBtn" : "fixedBtn"}
              onClick={() => setModalOpen((prev) => !prev)}
            >
              {modalOpen ? <XCircle width={22} /> : <span>Generate</span>}
            </button>
          </>
        ) : (
          <div>
            To add a question to the exam, click on &quot;Add Question&quot; at
            the top of the page.
          </div>
        )}

        <div>
          {examsStudents.map((e: any, id: number) => (
            <div className="exam-main" key={id}>
              <h3 className="h3l">
                Exam ID: <Link to={`/print/${e[0].e}`}>{e[0].e}</Link>
              </h3>
              {e.map((a: any, k: number) => (
                <div key={k} className="exam-question">
                  <h4>Question: {a.u}</h4>
                  <em className="question">{a.q}</em>
                  <div>
                    {a.a.map((f: any, k: number) => (
                      <div key={k}>
                        <strong>{k + 1}</strong>){f.answer}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        {exams.length > 0 && (
          <div>
            <h2>Solutions:</h2>
            {exams.map((e: any, k: number) => (
              <div style={{ border: "1px solid #aaa", margin: 10 }} key={k}>
                <h3 className="h3l">
                  Exam ID: <Link to={`/print/${e[0].e}`}>{e[0].e}</Link>
                </h3>
                {e.map((a: any, k: number) => (
                  <div style={{ border: "1px solid #ccc", margin: 7 }} key={k}>
                    Question: {a.u}
                    <ul>
                      {a.c.map((d: any, k: number) => (
                        <li key={k}>{d + 1}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Create;
