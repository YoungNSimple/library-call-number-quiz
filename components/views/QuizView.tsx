import React, { useState, useEffect, useCallback } from 'react';
import { QuizItem, QuizResult } from '../../types';
import { QUIZ_TEMPLATES } from '../../constants';
import { compareCallNumbers } from '../../utils/libraryLogic';
import { CallNumberDisplay } from '../CallNumberDisplay';

export const QuizView: React.FC = () => {
    const [quizItems, setQuizItems] = useState<QuizItem[]>([]);
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [result, setResult] = useState<QuizResult | null>(null);

    const generateQuiz = useCallback(() => {
        const randomIndex = Math.floor(Math.random() * QUIZ_TEMPLATES.length);
        const template = QUIZ_TEMPLATES[randomIndex];
        
        // Add random IDs and shuffle strictly for display (user has to sort them)
        const itemsWithIds = template.map(t => ({
            ...t,
            id: Math.random().toString(36).substring(2, 9)
        }));

        // Shuffle the array to ensure user has to do work
        const shuffled = [...itemsWithIds].sort(() => Math.random() - 0.5);

        setQuizItems(shuffled);
        setResult(null);
    }, []);

    useEffect(() => {
        generateQuiz();
    }, [generateQuiz]);

    // Drag Handlers
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
        setDraggedIndex(index);
        e.dataTransfer.effectAllowed = "move";
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
        e.preventDefault(); // Necessary to allow dropping
        if (draggedIndex === null || draggedIndex === index) return;

        const newItems = [...quizItems];
        const draggedItem = newItems[draggedIndex];
        
        // Remove from old pos
        newItems.splice(draggedIndex, 1);
        // Insert at new pos
        newItems.splice(index, 0, draggedItem);

        setQuizItems(newItems);
        setDraggedIndex(index);
        setResult(null); // Reset result if user moves things after checking
    };

    const handleDragEnd = () => {
        setDraggedIndex(null);
    };

    const checkAnswer = () => {
        // 1. Calculate the mathematically correct order from the current items
        const correctOrder = [...quizItems].sort((a, b) => compareCallNumbers(a, b));
        
        // 2. Compare user's current order with correct order
        const isCorrect = quizItems.every((item, index) => {
            const correctItem = correctOrder[index];
            return item.class === correctItem.class && 
                   item.author === correctItem.author && 
                   item.vol === correctItem.vol;
        });

        if (isCorrect) {
            setResult({
                correct: true,
                message: '🎉 정답입니다! 서가 정리의 달인이시네요!',
                correctOrder
            });
        } else {
            setResult({
                correct: false,
                message: '❌ 아쉽네요. 아래의 올바른 정답 순서를 확인해보세요.',
                correctOrder
            });
        }
    };

    return (
        <div className="p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">서가 정리 퀴즈 📚</h2>
            <p className="text-gray-500 mb-6">책을 드래그하여 올바른 KDC 순서대로 정리해주세요.</p>

            {/* Draggable Area */}
            <div className="bg-gray-50 rounded-2xl p-4 border-2 border-dashed border-gray-300 min-h-[300px] mb-6">
                {quizItems.map((item, index) => (
                    <div
                        key={item.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragOver={(e) => handleDragOver(e, index)}
                        onDragEnd={handleDragEnd}
                        className="cursor-grab active:cursor-grabbing transition-transform"
                        style={{ opacity: draggedIndex === index ? 0.5 : 1 }}
                    >
                        <CallNumberDisplay 
                            item={item} 
                            index={index} 
                            showLabel 
                        />
                    </div>
                ))}
            </div>

            {/* Controls */}
            <div className="flex gap-4 mb-8">
                <button 
                    onClick={generateQuiz}
                    className="flex-1 py-3 px-6 rounded-xl font-bold text-gray-600 bg-gray-200 hover:bg-gray-300 transition-colors shadow-sm"
                >
                    🔄 새 문제
                </button>
                <button 
                    onClick={checkAnswer}
                    className="flex-[2] py-3 px-6 rounded-xl font-bold text-white bg-fuchsia-600 hover:bg-fuchsia-700 shadow-lg shadow-fuchsia-200 transition-transform active:scale-95"
                >
                    ✅ 정답 확인
                </button>
            </div>

            {/* Result Feedback */}
            {result && (
                <div className={`rounded-2xl p-6 border-l-8 animate-fade-in-up ${result.correct ? 'bg-emerald-50 border-emerald-500' : 'bg-rose-50 border-rose-500'}`}>
                    <h3 className={`text-xl font-black mb-4 ${result.correct ? 'text-emerald-800' : 'text-rose-800'}`}>
                        {result.message}
                    </h3>

                    {!result.correct && (
                        <div>
                            <p className="text-sm font-bold text-rose-800/60 uppercase tracking-wider mb-2">정답 순서:</p>
                            <div className="space-y-2">
                                {result.correctOrder.map((item, i) => (
                                    <CallNumberDisplay 
                                        key={item.id + '_correct'} 
                                        item={item} 
                                        index={i} 
                                        variant="correct"
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};