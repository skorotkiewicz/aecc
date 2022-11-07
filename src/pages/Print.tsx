import { useParams } from "react-router-dom";
import { useLiveQuery } from "dexie-react-hooks";
import Barcode from "react-barcode";
import { db } from "../db";
import ReactToPrint from "react-to-print";
import { useRef } from "react";

const PrintButton = () => {
  const componentRef = useRef<any>(null);

  return (
    <div>
      <ReactToPrint
        trigger={() => <button className="btn">Print</button>}
        content={() => componentRef.current}
      />
      <div ref={componentRef}>
        <Print />
      </div>
    </div>
  );
};

const Print = () => {
  let { tid } = useParams();

  const test = useLiveQuery(async () => {
    if (tid) {
      return await db.tests.get({ testId: tid });
    }
  }, []);

  return (
    <div className="print">
      {test ? (
        <div className="main">
          <div className="barcode">
            <Barcode
              format="CODE128"
              width={2}
              height={40}
              value={test.testId}
            />
          </div>
          <div className="q">
            {test.qa.map((d: any, key: number) => (
              <div className="qa" key={key}>
                <p>
                  <span>{d.u}</span>
                  {d.q}
                </p>

                <ol>
                  {d.a.map((d: any, key: number) => (
                    <li key={key}>{d.a}</li>
                  ))}
                </ol>
                <div className="page-break" />
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
                value={test.testId}
              />
            </div>
            {test.qa.map((d: any, key: number) => (
              <div className="cube" key={key}>
                <span className="cubeid">{d.u})</span>

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
      ) : (
        <div>ID not found.</div>
      )}
    </div>
  );
};

export default PrintButton;
