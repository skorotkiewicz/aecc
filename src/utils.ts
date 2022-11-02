// Fisher-Yates shuffle algorithm
export const fy = (a: any) => {
  let b;
  let c;
  let d;

  c = a.length;
  while (c)
    (b = (Math.random() * (--c + 1)) | 0),
      (d = a[c]),
      (a[c] = a[b]),
      (a[b] = d);
};

export const generateExams = (array: any, howMany: number = 4) => {
  const copyArr = [...array];
  const exams: any = [{}];

  // eg. 5 versions of exam
  for (let i = 0; i < howMany; i++) {
    fy(copyArr);
    let examId;
    let questionId;
    let correctAnswers: number[] = [];
    let questions: any = [];

    copyArr.map((q: any, _idq: number) => {
      correctAnswers = [];

      fy(q.answers);

      examId = i;
      questionId = q.id;

      q.answers.map((a: any, id: number) => {
        if (a.correct) {
          correctAnswers.push(id);
        }
      });

      questions.push({ i: questionId, c: correctAnswers });
    });

    exams.push({ examId, q: questions });
  }
  // console.log(exams);
  return exams;
};
