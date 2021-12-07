import "./App.css";
import { Routes, Route, Link } from "react-router-dom";

import Projects from "./pages/Projects";
import Images from "./pages/Images";

function App() {
  return (
    <div className="App">
      <header class="text-gray-600 body-font">
        <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link
            class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
            to="/"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span class="ml-3 text-xl">Image Annotator</span>
          </Link>
          <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <Link class="mr-5 hover:text-gray-900" to={"/"}>
              Projects
            </Link>
            <Link class="mr-5 hover:text-gray-900" to={"/images"}>
              Images
            </Link>
          </nav>
        </div>
      </header>
      <Routes>
        <Route path="/" element={<Projects />} />
        <Route path="/projects/:id" element={<Projects />} />
        <Route path="/images" element={<Images />} />
        <Route path="/images/:id" element={<Images />} />
      </Routes>
    </div>
  );
}

export default App;
