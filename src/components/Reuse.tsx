import { useNavigate } from "react-router-dom";
import { useData } from "../context/DataContext";
import { db } from "../db";

const Reuse = ({ testId }: any) => {
  const { setQuestions }: any = useData();
  const navigate = useNavigate();

  return (
    <button
      className="reuse btn"
      onClick={async () => {
        const exam = await db.tests.get({ testId });
        const stg: any = [];
        exam.qa.map((d: any) => {
          stg.push({ id: d.u - 1, question: d.q, answers: d.a });
        });
        setQuestions(stg);
        navigate("/create");
      }}
    >
      Reuse
    </button>
  );
};

export default Reuse;
