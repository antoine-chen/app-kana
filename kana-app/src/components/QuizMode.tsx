import { useState } from "react";
import type {Kana} from "../data/kana";

interface QuizModeProps {
    script: "hiragana" | "katakana";
    kanaData: Kana[];
}

function QuizMode({ script, kanaData }: QuizModeProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState("");
    const [score, setScore] = useState({ correct: 0, total: 0 });
    const [feedback, setFeedback] = useState("");

    const currentKana = kanaData[currentIndex];
    const displayChar = script === "hiragana" ? currentKana.hiragana : currentKana.katakana;
    const isWaiting = feedback !== "";

    function nextQuestion() {
        const nextIndex = (currentIndex + 1) % kanaData.length;
        setCurrentIndex(nextIndex);
        setFeedback("");
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const isCorrect = userAnswer.toLowerCase().trim() === currentKana.romanji.toLowerCase();
        const feedbackMessage = isCorrect ? "Correct !" : `Incorrect. C'était ${currentKana.romanji}`;

        setScore({
            correct: score.correct + (isCorrect ? 1 : 0),
            total: score.total + 1,
        });

        setFeedback(feedbackMessage);
        setUserAnswer("");

        setTimeout(nextQuestion, 1500);
    }

    return (
        <div className="quiz-container">
            <div className="quiz-score">
                Score : {score.correct} / {score.total}
            </div>

            <div className="quiz-character">
                {displayChar}
            </div>

            <form className="quiz-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Romanji..."
                    autoFocus
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