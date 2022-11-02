import { useState } from "react";
import { Trash, PlusCircle } from "react-feather";

const Create = () => {
  const [questions, setQuestions] = useState<any>([]);

  const addQuestion = () => {
    setQuestions((prev: any) => [...prev, { answers: [{}, {}, {}] }]);
  };

  return (
    <div className="App">
      <header>Header</header>
      <main>
        <button className="add-question" onClick={addQuestion}>
          Add Question
        </button>
        <div className="container">
          <div className="questions">
            {questions.map((question: string, i: number) => (
              <QForm
                key={i}
                id={i}
                question={question}
                questions={questions}
                setQuestions={setQuestions}
              />
            ))}
          </div>
        </div>
      </main>
      <footer>
        <div className="footer">Footer</div>
      </footer>
    </div>
  );
};

const QForm = ({ id, question, questions, setQuestions }: any) => {
  const [answers, setAnswers] = useState<any>(3);

  const addAnswer = () => {
    question.id = id;
    question.answers[answers] = {};

    setAnswers((prev: number) => prev + 1);
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
              question.answers[i].id = i;
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

      <PlusCircle color="#777" size={18} onClick={addAnswer} className="add" />
    </div>
  );
};

export default Create;

/*

[
  {
    id: 1,
    question: "A?",
    answers: [
      {id: 0, answer: "A", correct: true},
      {id: 1, answer: "B", correct: false},
      {id: 2, answer: "C", correct: false},
      {id: 3, answer: "D", correct: false},
    ],
  }
]


*/
