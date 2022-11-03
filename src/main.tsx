import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Create from "./pages/Create";
import Index from "./pages/Index";
import "./App.scss";
import Header from "./components/core/Header";
import Footer from "./components/core/Footer";
import Exams from "./pages/Exams";
import { DataProvider } from "./context/DataContext";
import SearchExam from "./pages/SearchExam";
import E404 from "./components/E404";
import Print from "./pages/Print";

ReactDOM.createRoot(document.getElementById("App") as HTMLElement).render(
  <React.StrictMode>
    <DataProvider>
      <BrowserRouter>
        <header>
          <Header />
        </header>
        <main>
          <Routes>
            <Route index element={<Index />} />
            <Route path="create" element={<Create />} />
            <Route path="exams" element={<Exams />} />
            <Route path="search" element={<SearchExam />} />
            <Route path="search/:eid" element={<SearchExam />} />
            <Route path="print/:eid" element={<Print />} />
            <Route path="*" element={<E404 />} />
          </Routes>
        </main>
        <footer>
          <Footer />
        </footer>
      </BrowserRouter>
    </DataProvider>
  </React.StrictMode>
);
