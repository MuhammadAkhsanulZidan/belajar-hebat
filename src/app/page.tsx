"use client";

import React, { useEffect, useState } from 'react';
import QuizViewer from './components/layout/QuizLayout';
import MaterialViewer from './components/layout/MaterialLayout';
import { useRouter } from 'next/router';

const MainPage: React.FC = () => {
  const [materialId, setMaterialId] = useState<number>(1);
  const [materialSummary, setMaterialSummary] = useState<any[]>([]);

  useEffect(() => {
    const fetchMaterialSummary = async () => {
      try {
        const res = await fetch(`/api/material/summary`);
        if (!res.ok) {
          throw new Error('Failed to fetch material summary');
        }
        const materialSummary = await res.json();
        setMaterialSummary(materialSummary.materials);
        
        // Set the initial materialId after the materialSummary is loaded
        const urlParams = new URLSearchParams(window.location.search);
        const initialMaterialId = Number(urlParams.get('id')) || materialSummary.materials[0]?.id || 1;
        setMaterialId(initialMaterialId);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMaterialSummary();
  }, []);

  return (
    <div className="flex items-center justify-center h-full bg-blue-200">
      <div className="bg-white text-black w-full h-3/4 max-h-md rounded-lg shadow-lg max-w-md relative m-4">
        <MaterialViewer
          materialId={materialId}
          setMaterialId={setMaterialId}
          materialSummary={materialSummary}
        />
      </div>
    </div>
  );
};

export default MainPage;
