import { useState } from "react";
import { Trash, Trash2, PlusCircle } from "react-feather";
import { useData } from "../context/DataContext";

const QForm = ({ id, question }: any) => {
  const { questions, setQuestions }: any = useData();
  const [answers, setAnswers] = useState<any>(4);

  const addAnswer = () => {
    question.id = id;
    question.answers[answers] = {};

    setAnswers((prev: number) => prev + 1);
    setQuestions([...questions]);
  };

  const deleteQuestion = (id: number) => {
    // fixme
    questions.splice(id, 1);
    setQuestions([...questions]);
  };

  const handleDelete = (id: number, i: number) => {
    question.id = id;
    question.answers.splice(i, 1);

    setAnswers((prev: number) => prev - 1);
    setQuestions([...questions]);
  };

  return (
    <div className="question-form">
      <label>
        <p>Question</p>
        <input
          type="text"
          className="question"
          value={question.question}
          onChange={(e) => {
            question.id = id;
            question.question = e.target.value;
            setQuestions([...questions]);
          }}
        />
      </label>

      {questions[id].answers.map((_q: any, i: number) => (
        <div className="answer-row" key={i}>
          <input
            type="text"
            className="answer-input"
            value={question.answers[i].answer}
            onChange={(e) => {
              question.answers[i].answer = e.target.value;
              setQuestions([...questions]);
            }}
          />

          <input
            type="checkbox"
            checked={question.answers[i].correct}
            tabIndex={i + 1}
            onChange={(e) => {
              question.answers[i].correct = e.target.checked;
              setQuestions([...questions]);
            }}
          />

          <button tabIndex={i + 1} onClick={() => handleDelete(id, i)}>
            <Trash color="#999" size={16} />
          </button>
        </div>
      ))}

      <div className="add">
        <PlusCircle color="#777" size={18} onClick={addAnswer} />
        <Trash2
          color="#999"
          size={18}
          style={{ float: "right" }}
          onClick={() => {
            deleteQuestion(id);
          }}
        />
      </div>
    </div>
  );
};

export default QForm;
