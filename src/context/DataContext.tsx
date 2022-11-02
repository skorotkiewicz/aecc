import React, { useContext, useState } from "react";

const DataContext = React.createContext(null);

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }: any) {
  const [questions, setQuestions] = useState<any>([]);

  const value: any = {
    questions,
    setQuestions,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
