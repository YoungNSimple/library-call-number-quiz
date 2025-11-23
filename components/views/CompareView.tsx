import React, { useState } from 'react';
import { CallNumber, ComparisonResult } from '../../types';
import { compareCallNumbers, getComparisonReason } from '../../utils/libraryLogic';

const InputGroup = ({ 
    label, 
    value, 
    onChange, 
    colorClass 
}: { 
    label: string, 
    value: CallNumber, 
    onChange: (val: CallNumber) => void,
    colorClass: string 
}) => {
    const handleChange = (field: keyof CallNumber, txt: string) => {
        onChange({ ...value, [field]: txt });
    };

    return (
        <div className={`p-6 rounded-2xl border-2 ${colorClass} bg-opacity-30 bg-white shadow-sm transition-all hover:shadow-md`}>
            <h3 className="text-xl font-black text-gray-800 mb-4 flex items-center gap-2">
                {label}
            </h3>
            <div className="space-y-3">
                <input
                    className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-fuchsia-400 focus:border-fuchsia-400 outline-none transition font-medium text-lg placeholder-gray-400"
                    value={value.class}
                    onChange={(e) => handleChange('class', e.target.value)}
                    placeholder="1. 분류 기호 (예: 813.6)"
                />
                <input
                    className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-fuchsia-400 focus:border-fuchsia-400 outline-none transition font-medium text-lg placeholder-gray-400"
                    value={value.author}
                    onChange={(e) => handleChange('author', e.target.value)}
                    placeholder="2. 저자 기호 (예: 김294)"
                />
                <input
                    className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-fuchsia-400 focus:border-fuchsia-400 outline-none transition font-medium text-lg placeholder-gray-400"
                    value={value.vol}
                    onChange={(e) => handleChange('vol', e.target.value)}
                    placeholder="3. 권/복본 (예: v.1)"
                />
            </div>
        </div>
    );
}

export const CompareView: React.FC = () => {
    const [inputA, setInputA] = useState<CallNumber>({ class: '', author: '', vol: '' });
    const [inputB, setInputB] = useState<CallNumber>({ class: '', author: '', vol: '' });
    const [result, setResult] = useState<ComparisonResult | null>(null);

    const handleCompare = () => {
        // Validation: At least one field needed
        const isEmpty = (obj: CallNumber) => !obj.class.trim() && !obj.author.trim() && !obj.vol.trim();
        if (isEmpty(inputA) && isEmpty(inputB)) {
            setResult({ message: '비교할 책의 정보를 하나 이상 입력해주세요.', reason: '', isError: true });
            return;
        }

        const comp = compareCallNumbers(inputA, inputB);
        const reason = getComparisonReason(inputA, inputB);
        
        let message = '';
        if (comp < 0) message = '책 A가 책 B보다 먼저 옵니다.';
        else if (comp > 0) message = '책 B가 책 A보다 먼저 옵니다.';
        else message = '두 책의 정리 순서가 같습니다.';

        setResult({ message, reason, isError: false });
    };

    const handleClear = () => {
        setInputA({ class: '', author: '', vol: '' });
        setInputB({ class: '', author: '', vol: '' });
        setResult(null);
    };

    return (
        <div className="p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">두 권의 책 비교하기</h2>
            <p className="text-gray-500 mb-8">청구기호를 입력하여 어떤 책이 서가에 먼저 꽂혀야 하는지 확인해보세요.</p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
                <InputGroup 
                    label="📘 책 A" 
                    value={inputA} 
                    onChange={(val) => { setInputA(val); setResult(null); }}
                    colorClass="border-blue-200" 
                />
                <InputGroup 
                    label="📙 책 B" 
                    value={inputB} 
                    onChange={(val) => { setInputB(val); setResult(null); }}
                    colorClass="border-orange-200" 
                />
            </div>

            <div className="flex gap-4 justify-center mb-8">
                <button 
                    onClick={handleCompare}
                    className="flex-1 max-w-[200px] bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-fuchsia-200 transition-transform active:scale-95"
                >
                    순서 확인
                </button>
                <button 
                    onClick={handleClear}
                    className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors"
                >
                    초기화
                </button>
            </div>

            {result && (
                <div className={`p-6 rounded-2xl border-l-8 shadow-lg animate-fade-in-up ${result.isError ? 'bg-red-50 border-red-400 text-red-800' : 'bg-emerald-50 border-emerald-500 text-gray-800'}`}>
                    <div className="flex items-start gap-4">
                        <div className={`text-3xl ${result.isError ? 'grayscale' : ''}`}>
                            {result.message.includes('A') ? '👈' : result.message.includes('B') ? '👉' : '⚖️'}
                        </div>
                        <div>
                            <h3 className="text-xl font-black mb-1">{result.message}</h3>
                            <p className="font-medium opacity-80">{result.reason}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};