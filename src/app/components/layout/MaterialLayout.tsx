"use client";
import React, { useState, useEffect, SetStateAction, Dispatch } from "react";
import AppButton from "../ui/Button";
import Modal from "../ui/Modal";
import { Material, Option } from "@/app/types/material";
import QuestionOption from "../ui/QuestionOption";

interface MaterialLayoutProps {
  pages?: number;
  materialId: number;
  setMaterialId: Dispatch<SetStateAction<number>>;
  materialSummary: any[];
}

const MaterialViewer: React.FC<MaterialLayoutProps> = ({ pages = 1, materialId, setMaterialId, materialSummary }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMaterial, setCurrentMaterial] = useState<Material | null>(null);
  const [questions, setQuestions] = useState<Material['questions']>([]);
  const [page, setPage] = useState(1);
  const [isQuiz, setIsQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [questionIndex, setQuestionIndex] = useState(0);

  // Update the URL query parameter for materialId
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set("id", materialId.toString());
      const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
      window.history.pushState({}, "", newUrl);
    }
  }, [materialId]);

  // Fetch the material details when materialId changes
  useEffect(() => {
    const fetchMaterial = async () => {
      try {
        const res = await fetch(`/api/material?id=${materialId}`);
        if (!res.ok) {
          throw new Error('Failed to fetch material');
        }
        const material: Material = await res.json();
        setCurrentMaterial(material);
        setQuestions(material.questions || []);
        setPage(1);
        setIsQuiz(false); // Reset quiz state when switching materials
      } catch (err) {
        console.error(err);
      }
    };

    fetchMaterial();
  }, [materialId]);

  // Handle page navigation
  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePreviousPage = () => setPage((prev) => prev - 1);

  // Handle material navigation
  const handleNextMaterial = () => {
    const nextMaterialIndex = materialSummary.findIndex((material) => material.id === materialId) + 1;
    if (nextMaterialIndex < materialSummary.length) {
      setMaterialId(materialSummary[nextMaterialIndex].id);
    }
  };

  const hasNextMaterial = () => {
    const nextMaterialIndex = materialSummary.findIndex((material) => material.id === materialId) + 1;
    return nextMaterialIndex < materialSummary.length;
  }

  const hasPrevMaterial = () => {
    const prevMaterialIndex = materialSummary.findIndex((material) => material.id === materialId) - 1;
    return prevMaterialIndex >= 0;
  };

  const handlePreviousMaterial = () => {
    const prevMaterialIndex = materialSummary.findIndex((material) => material.id === materialId) - 1;
    if (prevMaterialIndex >= 0) {
      setMaterialId(materialSummary[prevMaterialIndex].id);
    }
  };

  const handleStartQuiz = () => {
    setQuestionIndex(0); // Start from the first question
    setCurrentQuestion(questions[0]);
    setIsQuiz(true);
  };

  const handleNextQuestion = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex((prev) => prev + 1);
      setCurrentQuestion(questions[questionIndex + 1]); // Update after increment
    }
  };

  const handlePrevQuestion = () => {
    if (questionIndex > 0) {
      setQuestionIndex((prev) => prev - 1);
      setCurrentQuestion(questions[questionIndex - 1]); // Update after decrement
    }
  };

  const onBackToMaterial = () => {
    setIsQuiz(false);
  };

  const handleMaterialClick = (id: number) => {
    setMaterialId(id);
    setIsModalOpen(false);
  };

  const currentPage = currentMaterial?.pages.find((p: any) => p.page_number === page);
  if (!currentMaterial)
    return <div className="flex flex-col justify-center items-center h-full text-black">
  {/* Circular progress indicator */}
  <div className="relative w-16 h-16 border-4 border-green-500 border-dashed rounded-full animate-spin border-t-transparent mb-4"></div>
  
  {/* Text */}
  <div>Tunggu Bentar ya...</div>
</div>;

  return (
    <div className="flex flex-col justify-between h-full">
      {/* Title and button section */}
      <div className="flex gap-2 justify-between rounded-t bg-green-500">
        <h1 className="p-3 text text-white">{currentMaterial?.title}</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="m-1 p-1 border border-white box-border 
    transition-transform transform 
    active:scale-95 
    duration-100 ease-in-out"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      {/* Material or quiz content section */}
      <div className="flex-grow overflow-y-auto overflow-x-hidden p-2 m-2 text-sm break-words">
        {!isQuiz ? (
          <div dangerouslySetInnerHTML={{ __html: currentPage?.text.join("") || "" }} />
        ) : (
          <div>
            <div className="mb-4" dangerouslySetInnerHTML={{ __html: currentQuestion?.question.join("") || "" }} />
            <div>
              {currentQuestion?.options.map((option: Option, idx: number) => (
                <QuestionOption
                  key={idx}
                  option={option}
                  idx={idx}
                  currentQuestion={currentQuestion}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="m-3 flex justify-between">
        {!isQuiz ? (
          <>
            {page !== 1 ? (
              <AppButton
                onClick={handlePreviousPage}
                disabled={page === 1}
                text="Sebelumnya"
                additionalClasses=""
              />
            ) : (
              <AppButton
                onClick={handlePreviousMaterial}
                disabled={materialId === 1}
                text="Materi Sebelumnya"
                defaultColor="bg-purple-500"
                hoverColor="bg-purple-700"
                disabledColor="bg-purple-200"
                additionalClasses=""
              />
            )}
            {page !== currentMaterial.pages.length ? (
              <AppButton
                onClick={handleNextPage}
                disabled={page === currentMaterial.pages.length}
                text="Berikutnya"
                additionalClasses=""
              />
            ) : (
              <AppButton
                onClick={handleStartQuiz}
                disabled={false}
                text="Mulai Kuis"
                defaultColor="bg-blue-500"
                disabledColor="bg-blue-200"
                hoverColor="bg-blue-700"
                additionalClasses=""
              />
            )}
          </>
        ) : (
          <>
            {questionIndex !== 0 ? (
              <AppButton
                onClick={handlePrevQuestion}
                disabled={!hasPrevMaterial()}
                text="Sebelumnya"
              />
            ) : (
              <AppButton
                onClick={onBackToMaterial}
                disabled={false}
                text="Kembali ke materi"
                defaultColor="bg-pink-500"
                hoverColor="bg-pink-700"
                disabledColor="bg-pink-200"
              />
            )}
            {questionIndex < questions.length - 1 ? (
              <AppButton
                onClick={handleNextQuestion}
                disabled={false}
                text="Berikutnya"
              />
            ) : (
              <AppButton
                onClick={handleNextMaterial}
                disabled={!hasNextMaterial()}
                text="Materi Berikutnya"
                defaultColor="bg-purple-500"
                hoverColor="bg-purple-700"
                disabledColor="bg-purple-200"
              />
            )}
          </>
        )}
      </div>

      {/* Modal Component */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} materials={materialSummary} handleMaterialClick={handleMaterialClick} />
    </div>
  );
};

export default MaterialViewer;
