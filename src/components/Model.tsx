import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { generateExams } from "../utils";
import { useData } from "../context/DataContext";

const Model = ({ questions, setModalOpen, examTitle }: any) => {
  const [checked, setChecked] = useState<boolean>(false);
  const [numExams, setNumExams] = useState<number>(4);
  const { setQuestions }: any = useData();
  let navigate = useNavigate();

  return (
    <div className="modal">
      <div>
        <label>
          Number of exams
          <input
            type="number"
            defaultValue={4}
            onChange={(e: any) => setNumExams(Number(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          I checked that all the questions contain the marked correct answer.
          <input
            checked={checked}
            type="checkbox"
            onChange={(e) => {
              setChecked(e.target.checked);
            }}
          />
        </label>
      </div>
      <div>
        {checked && (
          <button
            className="btn"
            onClick={async () => {
              const c = generateExams(questions, numExams, examTitle);
              if (c.examId) {
                setQuestions([]);
                navigate(`/exam/${c.examId}`);
                setModalOpen(false);
              }
            }}
          >
            Generate
          </button>
        )}
      </div>
    </div>
  );
};

export default Model;
