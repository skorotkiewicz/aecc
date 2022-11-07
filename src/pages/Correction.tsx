import { useParams } from "react-router-dom";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db";
import { useState } from "react";
import { useKeypress } from "../utils";
import SearchForm from "../components/SearchForm";

const Correction = () => {
  let { tid } = useParams();
  const [clicked, setClicked] = useState<any>([-1]);

  const test = useLiveQuery(async () => {
    if (tid) {
      setClicked([-1]);
      return await db.tests.get({ testId: tid });
    }
  }, [tid]);

  useKeypress(
    " ", // space
    () => {
      setClicked((prev: any) => {
        return [...prev, Math.max(...clicked) + 1];
      });
    },
    undefined
  );

  return (
    <div className="correction">
      <SearchForm type="c" />

      {!test && tid && (
        <div style={{ margin: 15 }}>No tests found under the given ID.</div>
      )}

      {test && test.testId && (
        <div>
          <h3>
            Correction
            <div>Test ID: {test.testId}</div>
          </h3>

          {test.qa.map((d: any, key: number) => (
            <div
              className={`solutions ${clicked.includes(key) ? "clicked" : ""}`}
              key={key}
              onClick={() => {
                if (clicked.includes(key)) {
                  setClicked(clicked.filter((e: number) => e !== key));
                } else {
                  setClicked((prev: any) => {
                    return [...prev, key];
                  });
                }
              }}
            >
              {d.u})
              {d.a.map((s: any, key: number) => (
                <div key={key}>
                  {s.c && (
                    <span className="cube">
                      {s.c && (
                        <span>{(key + 1 + 9).toString(36).toUpperCase()}</span>
                      )}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Correction;
