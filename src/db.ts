import Dexie from "dexie";

export const db: any = new Dexie("aecc-dev");

db.version(1).stores({
  exams: "++id, examId, tests, title",
  tests: "++id, testId, qa",
});
