import React from 'react';
import { KDC_RULES, KOREAN_CONSONANTS, KOREAN_VOWELS } from '../../constants';

export const RulesView: React.FC = () => {
    return (
        <div className="p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">정리 규칙 마스터하기 🧠</h2>
            
            {/* Quick Reference Card */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl border border-indigo-100 mb-8 shadow-sm">
                <h3 className="text-lg font-black text-indigo-900 mb-4 uppercase tracking-wider">한글 정렬 순서</h3>
                <div className="space-y-4">
                    <div>
                        <span className="text-xs font-bold text-indigo-400 uppercase mb-1 block">자음 (초성)</span>
                        <div className="flex flex-wrap gap-1">
                            {KOREAN_CONSONANTS.map(c => (
                                <span key={c} className="w-8 h-8 flex items-center justify-center bg-white rounded-md shadow-sm text-indigo-700 font-bold border border-indigo-100">{c}</span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <span className="text-xs font-bold text-purple-400 uppercase mb-1 block">모음 (중성)</span>
                        <div className="flex flex-wrap gap-1">
                            {KOREAN_VOWELS.map(v => (
                                <span key={v} className="w-8 h-8 flex items-center justify-center bg-white rounded-md shadow-sm text-purple-700 font-bold border border-purple-100">{v}</span>
                            ))}
                        </div>
                    </div>
                </div>
                <p className="mt-4 text-sm text-indigo-600 font-medium italic">
                    * 정렬 순서: 자음 → 모음 → 받침 순으로 비교합니다.
                </p>
            </div>

            {/* Detailed Rules */}
            <div className="space-y-6">
                {KDC_RULES.map((rule, idx) => (
                    <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
                        <div className="flex items-center gap-3 mb-3">
                            <span className={`flex items-center justify-center w-8 h-8 rounded-full text-white font-bold text-sm ${rule.color.replace('text-', 'bg-')}`}>
                                {idx + 1}
                            </span>
                            <h3 className={`text-xl font-black ${rule.color}`}>
                                {rule.title}
                            </h3>
                        </div>
                        
                        <p className="text-gray-600 leading-relaxed mb-4 pl-11">
                            {rule.explanation}
                        </p>

                        <div className="pl-11">
                            <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">헷갈리는 예시</h4>
                            <div className="grid gap-2">
                                {rule.examples.map((ex, i) => (
                                    <div key={i} className="flex flex-col sm:flex-row sm:items-center bg-gray-50 p-3 rounded-lg text-sm">
                                        <span className="font-bold text-gray-800 sm:mr-3 whitespace-nowrap mb-1 sm:mb-0 bg-white px-2 py-0.5 rounded border border-gray-200 shadow-sm">{ex.title}</span>
                                        <span className="text-gray-500 font-medium">{ex.note}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};