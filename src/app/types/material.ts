// types/material.ts
export interface Page {
    page_number: number;
    text: string[];
}

export interface Question {
    question: string;
    options: string[];
    answer_index: number;
}

export interface Material {
    id: number;
    title: string;
    pages: Page[];
    questions: Question[];
}

export interface Option {
    text: string;
    feedback?: string;
}