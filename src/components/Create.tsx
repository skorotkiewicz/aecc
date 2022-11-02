import { useData } from "../context/DataContext";
import QForm from "./QForm";

const Create = () => {
  const { questions, setQuestions }: any = useData();

  const addQuestion = () => {
    setQuestions((prev: any) => [...prev, { answers: [{}, {}, {}] }]);
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
      </div>
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
