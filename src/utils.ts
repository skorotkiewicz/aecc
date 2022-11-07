import { DependencyList, useEffect } from "react";
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("1234567890", 10);
import { db } from "./db";

export const useKeypress = (
  key: string,
  action: () => void,
  deps: DependencyList | undefined
) => {
  useEffect(() => {
    function onKeyup(e: { key: string }) {
      if (e.key === key) action();
    }
    window.addEventListener("keyup", onKeyup);
    return () => window.removeEventListener("keyup", onKeyup);
  }, deps);
};

const addToDb = async (exam: any, examTitle: string) => {
  if (exam.examId && exam.testsIds) {
    await db.exams.add({
      examId: exam.examId,
      tests: exam.testsIds,
      title: examTitle,
    });
  }

  if (exam.tests) {
    exam.tests.map(async (d: any) => {
      await db.tests.add({ testId: d.testId, qa: d.qa });
    });
  }
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

export const generateExams = (
  array: any,
  howMany: number = 4,
  examTitle: string
) => {
  let copyArr = [...array];

  let testsIds: any = [];
  let questions: any = [];
  const tests: any = [];

  // eg. 5 versions of exam
  for (let i = 0; i < howMany; i++) {
    copyArr = arrayShuffle(copyArr);
    questions = [];
    const testId = nanoid();

    let examQuestion: any = "";
    let examAnswers: any = [];

    copyArr.map(async (q: any, uid: number) => {
      examAnswers = arrayShuffle(q.answers);
      examQuestion = q.question;

      questions.push({
        u: uid + 1,
        q: examQuestion,
        a: examAnswers,
      });
    });

    tests.push({ testId, qa: questions });
    testsIds.push(testId);
  }

  let examId = nanoid();

  addToDb({ examId, testsIds, tests }, examTitle);

  return { examId };
};

/*
exams DB
{
  examId: 123,
  tests: [123, 345]
}

tests DB
{
  testId: 345, 
  qa: [
    {
      u: 1, 
      q: "QQQ", 
      a: []
    },
    {
      u: 2, 
      q: "CCC", 
      a: []
    }
  ]
}
*/
