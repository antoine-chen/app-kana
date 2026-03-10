import { useState } from "react";
import type {Kana} from "../data/kana";

function useQuiz(kanaData: Kana[]) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState("");
    const [score, setScore] = useState({ correct: 0, total: 0 });
    const [feedback, setFeedback] = useState("");

    const currentKana = kanaData[currentIndex];
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

    return {
        currentKana,
        userAnswer,
        setUserAnswer,
        score,
        feedback,
        isWaiting,
        handleSubmit,
    };
}

export default useQuiz;