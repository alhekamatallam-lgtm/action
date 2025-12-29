
import React from 'react';

const CompletionScreen: React.FC = () => {
    return (
        <div className="bg-white shadow-lg rounded-xl p-8 border border-slate-200 text-center flex flex-col items-center">
            <img 
                src="https://rajhifoundation.org/wp-content/uploads/sites/2858/2024/11/Asset-6.svg" 
                alt="Rajhi Foundation Logo" 
                className="h-16 mb-6"
            />
            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
                <svg className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
            </div>
            <h2 className="text-2xl font-bold text-brand-blue">اكتمل الإعداد بنجاح</h2>
            <p className="text-slate-600 mt-2">تم تحديد الزمن المقدر لجميع الإجراءات في سير العمل بنجاح.</p>
            <div className="mt-8 w-full">
                <button
                    className="w-full max-w-xs mx-auto px-8 py-3 text-lg font-bold text-white bg-brand-blue rounded-lg hover:bg-opacity-90 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                    إنهاء
                </button>
            </div>
        </div>
    );
};

export default CompletionScreen;
