import { useState } from "react";
import { generateExams } from "../utils";

const Model = ({
  setExams,
  setExamsStudents,
  questions,
  setModalOpen,
}: any) => {
  const [checked, setChecked] = useState<boolean>(false);
  const [numExams, setNumExams] = useState<number>(4);

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
              const c = generateExams(questions, numExams);
              if (c.exams[0].length > 0) {
                setExams(c.exams);
                setExamsStudents(c.examsStudent);
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
