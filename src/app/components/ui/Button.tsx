import React from 'react';

interface AppButtonProps {
    onClick: () => void;
    disabled: boolean;
    text: string;
    additionalClasses?: string;
    defaultColor?: string;
    disabledColor?: string;
    hoverColor?: string;
}

const AppButton: React.FC<AppButtonProps> = ({ onClick, disabled, text, additionalClasses = '', defaultColor = 'bg-green-500', disabledColor = 'bg-green-200', hoverColor = 'bg-green-700'}) => {
    return (
        <button
            className={`btn text-left text-sm ${disabled ? `${disabledColor} cursor-not-allowed` : `${defaultColor} hover:${hoverColor}`} text-white py-2 px-2 rounded ${additionalClasses} 
            transition-all duration-200 ease-in-out 
            shadow-md active:shadow-lg active:translate-y-1`}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    );
};

export default AppButton;
