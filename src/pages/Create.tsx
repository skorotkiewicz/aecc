import { useState } from "react";
import { XCircle } from "react-feather";
import Model from "../components/Model";
import QForm from "../components/QForm";
import { useData } from "../context/DataContext";

const Create = () => {
  const { questions, setQuestions }: any = useData();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [examTitle, setExamTitle] = useState<string>("");

  const addQuestion = () => {
    setQuestions((prev: any) => [...prev, { answers: [{}, {}, {}, {}] }]);
  };

  return (
    <div>
      <button className="add-question" onClick={addQuestion}>
        Add Question
      </button>

      <div className="container">
        {questions.length > 0 && (
          <div className="examTitle">
            <label>
              <p>Exam title</p>
              <input
                type="text"
                onChange={(e) => setExamTitle(e.target.value)}
              />
            </label>
          </div>
        )}

        <div className="questions">
          {questions.map((question: string, i: number) => (
            <QForm key={i} id={i} question={question} />
          ))}
        </div>
        {modalOpen && (
          <Model
            examTitle={examTitle}
            modalOpen={modalOpen}
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
      </div>
    </div>
  );
};

export default Create;
