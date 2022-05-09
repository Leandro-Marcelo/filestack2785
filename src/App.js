import { BrowserRouter, Routes, Route } from "react-router-dom";
import Project from "./pages/Project";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Project />} />
                <Route path="/Project" element={<Project />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
