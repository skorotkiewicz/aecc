import Dexie from "dexie";

export const db: any = new Dexie("aecc-test");

db.version(1).stores({
  exams: "++id, examTeacher, examStudents",
});
