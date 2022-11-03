import { useParams } from "react-router-dom";
import { useLiveQuery } from "dexie-react-hooks";
import Barcode from "react-barcode";
import { db } from "../db";

const Print = () => {
  let { eid } = useParams();

  const exam = useLiveQuery(async () => {
    if (eid) {
      return await db.exams.get({ examId: eid });
    }
  }, []);

  return (
    <div className="print">
      {exam && (
        <div className="main">
          <div className="barcode">
            <Barcode
              format="CODE128"
              width={2}
              height={40}
              value={exam.examId}
            />
          </div>
          <div className="q">
            {exam.qa.map((d: any, key: number) => (
              <div className="qa" key={key}>
                <p>
                  <span>{d.u}</span>
                  {d.q}
                </p>

                <ol>
                  {d.a.map((d: any, key: number) => (
                    <li key={key}>{d.answer}</li>
                  ))}
                </ol>
              </div>
            ))}
          </div>

          {/*  */}
          <div className="answers">
            <div className="barcode">
              <Barcode
                format="CODE128"
                width={2}
                height={40}
                value={exam.examId}
              />
            </div>
            {exam.qa.map((d: any, key: number) => (
              <div className="cube" key={key}>
                <span>{d.u})</span>
                {d.a.map((_d: any, key: number) => (
                  <span key={key} className="circle">
                    {(key + 1 + 9).toString(36).toUpperCase()}
                  </span>
                ))}
              </div>
            ))}
          </div>
          {/*  */}
        </div>
      )}
    </div>
  );
};

export default Print;
