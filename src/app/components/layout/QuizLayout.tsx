"use client";
import React, { useState, useEffect } from "react";
import AppButton from "../ui/Button";

const QuizViewer = ({
  materialId,
  onBackToMaterial,
  onNextMaterial,
  onPreviousMaterial,
  hasNextMaterial,
  hasPreviousMaterial,
}: {
  materialId: number;
  onBackToMaterial: () => void;
  onNextMaterial: () => void;
  onPreviousMaterial: () => void;
  hasNextMaterial: boolean;
  hasPreviousMaterial: boolean;
}) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [quiz, setQuiz] = useState<any>(null);

  useEffect(() => {
    fetch(`/data/quizzes.json`)
      .then((res) => res.json())
      .then((data) => {
        const currentQuiz = data.find((item: any) => item.material_id === materialId);
        setQuiz(currentQuiz);
        setQuestionIndex(0); // Reset to first question on material change
      });
  }, [materialId]);

  const handleNextQuestion = () => setQuestionIndex((prev) => prev + 1);

  const currentQuestion = quiz?.questions[questionIndex];
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!quiz) return <div>Loading...</div>;

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <div className="flex gap-2 justify-between rounded-t bg-green-500">
          <h1 className="p-3 text text-white">Quiz {materialId}</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="m-1 p-1 border border-white box-border"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 0 24 24"
              stroke="white"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
        <div className="p-2 m-2 text-sm">
          <p className="mb-4">{currentQuestion?.question}</p>
          <div>
            {currentQuestion?.options.map((option: string, idx: number) => (
              <button key={idx} className="btn mb-2 block" onClick={() => alert(idx === currentQuestion.answer_index ? "Correct!" : "Wrong!")}>
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between m-3">
        {
          questionIndex !== 0 ? (
            <AppButton
              onClick={handleNextQuestion}
              disabled={questionIndex === 1}
              text="Sebelumnya"
            />
          ) : (
            <AppButton
              onClick={onBackToMaterial}
              disabled={false}
              text="Kembali ke materi"
            />
          )
        }
        {questionIndex === quiz.questions.length - 1 ?
          (<AppButton
            onClick={handleNextQuestion}
            disabled={false}
            text="Berikutnya" />
          ) : (
            <AppButton
              onClick={onNextMaterial}
              disabled={!hasNextMaterial}
              text="Materi Berikutnya" />)
        }
      </div>
    </div>
  );
};

export default QuizViewer;
