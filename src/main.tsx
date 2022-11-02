import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Create from "./components/Create";
import Index from "./components/Index";
import "./App.scss";
import Header from "./components/core/Header";
import Footer from "./components/core/Footer";
import { DataProvider } from "./context/DataContext";

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
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </main>
        <footer>
          <Footer />
        </footer>
      </BrowserRouter>
    </DataProvider>
  </React.StrictMode>
);
