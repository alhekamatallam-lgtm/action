
import React from 'react';

interface CompletionScreenProps {
    onFinish: () => void;
}

const CompletionScreen: React.FC<CompletionScreenProps> = ({ onFinish }) => {
    return (
        <div className="bg-white shadow-lg rounded-xl p-8 border border-slate-200 text-center flex flex-col items-center max-w-lg">
            <svg className="w-20 h-20 text-green-500 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <h2 className="text-2xl font-bold text-brand-blue">اكتمل الإعداد بنجاح</h2>
            <p className="text-slate-600 mt-4 max-w-md">
                تم تحديد وحفظ الزمن المقدر لجميع الإجراءات في سير العمل بنجاح.
            </p>
            <div className="mt-8 w-full">
                <button
                    onClick={onFinish}
                    className="w-full max-w-xs mx-auto px-8 py-3 text-lg font-bold text-white bg-brand-blue rounded-lg hover:bg-opacity-90 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                    إنهاء
                </button>
            </div>
        </div>
    );
};

export default CompletionScreen;
