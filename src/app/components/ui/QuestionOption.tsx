import { Option } from '@/app/types/material';
import React, { useState, useEffect } from 'react';



interface QuestionOptionProps {
    option: Option;
    idx: number;
    currentQuestion: {
        answer_index: number;
        options: Option[];
    };
}

const QuestionOption: React.FC<QuestionOptionProps> = ({ option, idx, currentQuestion }) => {
    const [clicked, setClicked] = useState<boolean>(false);
    const [correct, setCorrect] = useState<boolean>(false);

    // Reset the state when currentQuestion changes
    useEffect(() => {
        setClicked(false);
        setCorrect(false);
    }, [currentQuestion]);

    const handleClick = (isCorrect: boolean) => {
        if (clicked) return; // Prevent further clicks after the first click
        setClicked(true);
        setCorrect(isCorrect);
    };

    return (
        <div>
            <button
                key={idx}
                className={`w-full text-left btn active:scale-95 btn p-2 mb-1 border border-gray-300 rounded block hover:cursor transition-all duration-300 transform ${clicked
                    ? correct
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                    : 'hover:bg-gray-200 bg-white transition-none'
                    }`}
                onClick={() => handleClick(idx === currentQuestion.answer_index)}
                disabled={clicked}
            >
                {option.text}
            </button>

            {/* Display feedback after an option is clicked */}
            {clicked && option.feedback && (
                <div className={`mb-2 text-sm ${correct ? 'text-green-500' : 'text-red-500'}`}>
                    {option.feedback}
                </div>
            )}
        </div>
    );
};

export default QuestionOption;
