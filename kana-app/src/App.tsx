import { useState } from "react";
import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import StudyMode from "./components/StudyMode";
import QuizMode from "./components/QuizMode";
import LoginPage from "./components/Loginpage.tsx";
import RegisterPage from "./components/Registerpage.tsx";
import { kanaData } from "./data/kana";
import "./css/App.css";

function App() {
    const [script, setScript] = useState<"hiragana" | "katakana">("hiragana");

    return (
        <div>
            <header className="app-header">
                <h1>Apprentissage du Japonais — <span>Kana</span></h1>
            </header>

            <nav className="tab-bar">
                <NavLink to="/study" className={({ isActive }) => isActive ? "tab-btn active" : "tab-btn"}>
                    Étude
                </NavLink>
                <NavLink to="/quiz" className={({ isActive }) => isActive ? "tab-btn active" : "tab-btn"}>
                    Quiz
                </NavLink>
                <NavLink to="/login" className={({ isActive }) => isActive ? "tab-btn active" : "tab-btn"}>
                    Connexion
                </NavLink>
                <NavLink to="/register" className={({ isActive }) => isActive ? "tab-btn active" : "tab-btn"}>
                    Inscription
                </NavLink>
            </nav>

            <Routes>
                <Route path="/" element={<Navigate to="/study" />} />

                <Route path="/study" element={
                    <main className="app-content">
                        <div className="script-selector">
                            <label>
                                <input type="radio" checked={script === "hiragana"} onChange={() => setScript("hiragana")} />
                                Hiragana
                            </label>
                            <label>
                                <input type="radio" checked={script === "katakana"} onChange={() => setScript("katakana")} />
                                Katakana
                            </label>
                        </div>
                        <StudyMode script={script} kanaData={kanaData} />
                    </main>
                } />

                <Route path="/quiz" element={
                    <main className="app-content">
                        <div className="script-selector">
                            <label>
                                <input type="radio" checked={script === "hiragana"} onChange={() => setScript("hiragana")} />
                                Hiragana
                            </label>
                            <label>
                                <input type="radio" checked={script === "katakana"} onChange={() => setScript("katakana")} />
                                Katakana
                            </label>
                        </div>
                        <QuizMode script={script} kanaData={kanaData} />
                    </main>
                } />

                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Routes>
        </div>
    );
}

export default App;