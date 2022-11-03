import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("1234567890", 10);
import { db } from "./db";

const addToDb = async (examId: any, qa: any) => {
  return await db.exams.add({
    examId,
    qa,
  });
};

// Durstenfeld algorithm
export const arrayShuffle = (array: any) => {
  if (array.length === 0) return [];

  array = [...array];

  for (let index = array.length - 1; index > 0; index--) {
    const newIndex = Math.floor(Math.random() * (index + 1));
    [array[index], array[newIndex]] = [array[newIndex], array[index]];
  }

  return array;
};

export const generateExams = (array: any, howMany: number = 4) => {
  let copyArr = [...array];
  let examTch: any = [];
  let examSdt: any = [];
  const exams: any = [];
  const examsStudent: any = [];

  // eg. 5 versions of exam
  for (let i = 0; i < howMany; i++) {
    copyArr = arrayShuffle(copyArr);
    examTch = [];
    examSdt = [];
    let examId = nanoid();
    let correctAnswers: number[] = [];

    let examQuestion: any = "";
    let examAnswers: any = [];

    copyArr.map(async (q: any, uid: number) => {
      correctAnswers = [];

      examAnswers = arrayShuffle(q.answers);
      examQuestion = q.question;

      examAnswers.map((a: any, id: number) => {
        if (a.correct) {
          correctAnswers.push(id);
        }
      });

      examTch.push({
        // q: q.id,
        u: uid + 1,
        e: examId,
        c: correctAnswers,
      });

      examSdt.push({
        u: uid + 1,
        q: examQuestion,
        e: examId,
        a: examAnswers,
      });
    });

    addToDb(examId, examSdt);

    exams.push(examTch);
    examsStudent.push(examSdt);
  }

  return { exams, examsStudent };
};
