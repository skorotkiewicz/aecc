import { useData } from "../context/DataContext";
import { generateExams } from "../utils";
import QForm from "./QForm";

const Create = () => {
  const { questions, setQuestions }: any = useData();

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
            console.log(c);
          }}
        >
          Generate
        </button>
      </div>
    </div>
  );
};

export default Create;

/*

Generated:
[
  {
    examId: 123,
    q: [
      {i: 1, c: [3]}, // question `Id 1` correct answer is answer `Id 3`
      {i: 2, c: [4,5]}, // question `Id 2` correct answers is answer `Id 4` and `Id 5
    ]
  }
]


Storage:
[
  {
    id: 1,
    question: "A?",
    answers: [
      {answer: "A", correct: true},
      {answer: "B", correct: false},
      {answer: "C", correct: false},
      {answer: "D", correct: false},
    ],
  }
]


*/
