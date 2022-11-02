import { useState } from "react";
import { useData } from "../context/DataContext";
import { generateExams } from "../utils";
import QForm from "./QForm";

const Create = () => {
  const { questions, setQuestions }: any = useData();

  const [exams, setExams] = useState<any>([]);
  const [examsStudents, setExamsStudents] = useState<any>([]);

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
        <button
          onClick={() => {
            const c = generateExams(questions);

            setExams(c.exams);
            setExamsStudents(c.examsStudent);
          }}
        >
          Generate
        </button>

        <div>
          {examsStudents &&
            examsStudents.map((e: any, id: number) => (
              <div className="exam-main" key={id}>
                <h3>Exam ID: {e[0].examId}</h3>
                {e.map((a: any, k: number) => (
                  <div key={k} className="exam-question">
                    <h4>q{a.qid}</h4>
                    <em className="question">{a.q}</em>
                    <p>
                      {a.a.map((f: any, k: number) => (
                        <div key={k}>
                          <strong>{k + 1}</strong>){f.answer}
                        </div>
                      ))}
                    </p>
                  </div>
                ))}
              </div>
            ))}
        </div>

        {exams.length > 0 && (
          <div>
            <h2>Solutions:</h2>
            {exams.map((e: any, k: number) => (
              <div key={k}>
                {e.map((a: any, k: number) => (
                  <div style={{ border: "1px solid #ccc", margin: 10 }} key={k}>
                    <p>
                      {a.examId}q{a.qid}
                    </p>
                    <p>
                      {a.c.map((d: any, k: number) => (
                        <div key={k}>{d.toString()}</div>
                      ))}
                    </p>
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
