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
    let examId;
    let correctAnswers: number[] = [];

    let examQuestion: any = "";
    let examAnswers: any = [];

    copyArr.map((q: any, _idq: number) => {
      correctAnswers = [];

      examAnswers = arrayShuffle(q.answers);
      examQuestion = q.question;
      // examId = q.id;
      examId = i;

      examAnswers.map((a: any, id: number) => {
        if (a.correct) {
          correctAnswers.push(id);
        }
      });

      examTch.push({ examId, c: correctAnswers });
      examSdt.push({ examId, q: examQuestion, a: examAnswers });
    });

    exams.push([examTch]);
    examsStudent.push([examSdt]);
  }

  // console.log(examsStudent);
  // console.log(exams);

  return { exams, examsStudent };
};
