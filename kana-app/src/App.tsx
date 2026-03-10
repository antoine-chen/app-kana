import { useState } from "react";
import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import StudyMode from "./components/StudyMode";
import QuizMode from "./components/QuizMode";
import { kanaData } from "./data/kana";
import "./App.css";

function App() {
    const [script, setScript] = useState<"hiragana" | "katakana">("hiragana");

    return (
        <div>
            <header className="app-header">
                <h1>Apprentissage du Japonais — <span>Kana</span></h1>
            </header>

            <nav className="tab-bar">
                <NavLink
                    to="/study"
                    className={({ isActive }) => isActive ? "tab-btn active" : "tab-btn"}
                >
                    Étude
                </NavLink>
                <NavLink
                    to="/quiz"
                    className={({ isActive }) => isActive ? "tab-btn active" : "tab-btn"}
                >
                    Quiz
                </NavLink>
            </nav>

            <main className="app-content">
                <div className="script-selector">
                    <label>
                        <input
                            type="radio"
                            checked={script === "hiragana"}
                            onChange={() => setScript("hiragana")}
                        />
                        Hiragana
                    </label>
                    <label>
                        <input
                            type="radio"
                            checked={script === "katakana"}
                            onChange={() => setScript("katakana")}
                        />
                        Katakana
                    </label>
                </div>

                <Routes>
                    <Route path="/" element={<Navigate to="/study" />} />
                    <Route path="/study" element={<StudyMode script={script} kanaData={kanaData} />} />
                    <Route path="/quiz" element={<QuizMode script={script} kanaData={kanaData} />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;