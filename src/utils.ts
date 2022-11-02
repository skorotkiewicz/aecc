// Fisher-Yates shuffle algorithm
export const fy = (a: any) => {
  let b;
  let c;
  let d;

  c = a.length;
  while (c)
    (b = (Math.random() * c--) | 0), (d = a[c]), (a[c] = a[b]), (a[b] = d);
};

export const generateExams = (array: any, howMany: number = 4) => {
  const copyArr = [...array];
  let examTch: any = [];
  let examSdt: any = [];
  const exams: any = [];
  const examsStudent: any = [];

  // eg. 5 versions of exam
  for (let i = 0; i < howMany; i++) {
    fy(copyArr);
    examTch = [];
    examSdt = [];
    let examId;
    let correctAnswers: number[] = [];
    // let questions: any = [];

    let examQuestion: any = "";
    let examAnswers: any = [];

    copyArr.map((q: any, _idq: number) => {
      correctAnswers = [];

      fy(q.answers); // <-- fixme
      examAnswers = q.answers;
      examQuestion = q.question;
      // examId = q.id;
      examId = i;

      q.answers.map((a: any, id: number) => {
        if (a.correct) {
          correctAnswers.push(id);
        }
      });

      // questions.push({ i: examId, c: correctAnswers });
      // examTch.push({ examId, q: questions });

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
