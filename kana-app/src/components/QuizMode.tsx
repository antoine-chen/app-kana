import { useRef, useEffect, useMemo } from "react";
import type {Kana} from "../data/kana";
import useQuiz from "../hooks/useQuiz";
import useLocalStorage from "../hooks/useLocalStorage";

interface QuizModeProps {
    script: "hiragana" | "katakana";
    kanaData: Kana[];
}

function shuffleArray(array: Kana[]) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function QuizMode({ script, kanaData }: QuizModeProps) {
    // Exercice 4A : useMemo pour ne mélanger qu'une fois
    const shuffledKana = useMemo(() => shuffleArray(kanaData), [kanaData]);

    // Exercice 2 : toute la logique dans le hook
    const { currentKana, userAnswer, setUserAnswer, score, feedback, isWaiting, handleSubmit } = useQuiz(shuffledKana);

    // Exercice 3 : meilleur score persisté
    const [bestScore, setBestScore] = useLocalStorage("kana-best-score", 0);

    const percentage = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;

    if (percentage > bestScore && score.total > 0) {
        setBestScore(percentage);
    }

    // Exercice 1 : auto-focus à chaque nouvelle question
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, [currentKana]);

    const displayChar = script === "hiragana" ? currentKana.hiragana : currentKana.katakana;

    return (
        <div className="quiz-container">
            <div className="quiz-score">
                Score : {score.correct} / {score.total}
                {score.total > 0 && <span> ({percentage}%)</span>}
            </div>

            <div className="quiz-best-score">
                Meilleur score : {bestScore}%
            </div>

            <div className="quiz-character">
                {displayChar}
            </div>

            <form className="quiz-form" onSubmit={handleSubmit}>
                <input
                    ref={inputRef}
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Romanji..."
                    disabled={isWaiting}
                />
                <button type="submit" disabled={isWaiting}>
                    Valider
                </button>
            </form>

            {feedback !== "" && (
                <div className={`quiz-feedback ${feedback === "Correct !" ? "correct" : "incorrect"}`}>
                    {feedback}
                </div>
            )}
        </div>
    );
}

export default QuizMode;