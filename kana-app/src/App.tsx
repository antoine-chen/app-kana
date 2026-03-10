import { useState } from "react";
import StudyMode from "./components/StudyMode";
import QuizMode from "./components/QuizMode";
import { kanaData } from "./data/kana";
import "./App.css";

function App() {
    const [mode, setMode] = useState<"study" | "quiz">("study");
    const [script, setScript] = useState<"hiragana" | "katakana">("hiragana");

    const switchMode = (newMode: "study" | "quiz") => {
        setMode(newMode);
    };

    return (
        <div>
            <header className="app-header">
                <h1>Apprentissage du Japonais — <span>Kana</span></h1>
            </header>

            <nav className="tab-bar">
                <button
                    className={mode === "study" ? "tab-btn active" : "tab-btn"}
                    onClick={() => switchMode("study")}
                >
                    Étude
                </button>
                <button
                    className={mode === "quiz" ? "tab-btn active" : "tab-btn"}
                    onClick={() => switchMode("quiz")}
                >
                    Quiz
                </button>
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

                {mode === "study" && <StudyMode script={script} kanaData={kanaData} />}
                {mode === "quiz" && <QuizMode script={script} kanaData={kanaData} />}
            </main>
        </div>
    );
}

export default App;