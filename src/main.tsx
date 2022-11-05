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
import Search from "./pages/Search";
import E404 from "./components/E404";
import Print from "./pages/Print";
import Settings from "./pages/Settings";
import Exam from "./pages/Exam";

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
            <Route path="settings" element={<Settings />} />
            <Route path="search" element={<Search />}>
              <Route path=":id" element={<Search />} />
            </Route>
            <Route path="exam/:id" element={<Exam />} />
            <Route path="print/:tid" element={<Print />} />
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
