import { importDB, exportDB } from "dexie-export-import";
import { db } from "../db";
import { useState } from "react";

const Settings = () => {
  const [loading, setLoading] = useState<number>(0);
  const [alert, setAlert] = useState<string>("");

  return (
    <div className="settings">
      <div className="page">Settings</div>

      <div className="windows">
        <div className="window">
          <div className="info">Back up your exams or import a backup</div>

          {loading < 2 ? (
            <input
              type="file"
              accept="application/json"
              onChange={async (e: any) => {
                const d = e.target.files[0];

                const file = new File([d], d.name, { type: d.type });
                setLoading(1);

                file.arrayBuffer().then(async (arrayBuffer) => {
                  const blob = new Blob([new Uint8Array(arrayBuffer)], {
                    type: file.type,
                  });

                  try {
                    await importDB(blob);
                    setLoading(2);
                  } catch (_error) {
                    setLoading(-2);
                  }
                });
              }}
            />
          ) : (
            <div style={{ color: "green" }}>Success!</div>
          )}

          <button
            className="btn"
            onClick={async () => {
              const blob = await exportDB(db);
              const url = URL.createObjectURL(blob);

              const el = document.createElement("a");
              el.href = url;
              el.download = "AECC-" + Date.now() + ".json";
              document.body.appendChild(el);
              el.click();
              //   URL.revokeObjectURL(url);
            }}
          >
            Export
          </button>

          {loading === -2 && (
            <div style={{ color: "red" }}>
              Error, delete the database and try import again
            </div>
          )}
        </div>

        <div className="window">
          <div className="info">Destroy all Exams</div>
          <button
            className="btn"
            onClick={() => {
              if (
                window.confirm(
                  "Do you really want to destroy database with all Exams?"
                )
              ) {
                db.delete()
                  .then(() => {
                    setAlert("Database successfully deleted");
                  })
                  .catch(() => {
                    setAlert("Could not delete database");
                  });
              }
            }}
          >
            Delete
          </button>
          <div>{alert}</div>
        </div>

        {/* <div className="window">
          <div className="info">Change barcode type</div>

          <select
            className="btn"
            name="barcode"
            onChange={(e) => {
              console.log(e.target.value);
            }}
          >
            <option value="CODE39">CODE39</option>
            <option value="CODE128">CODE128</option>
            <option value="MSI">MSI</option>
            <option value="codabar">Codabar</option>
          </select>
        </div> */}
      </div>
    </div>
  );
};

export default Settings;
