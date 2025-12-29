
import React from 'react';

interface StartScreenProps {
    onStartWizard: () => void;
    onStartReview: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStartWizard, onStartReview }) => {
    return (
        <div className="bg-white shadow-lg rounded-xl p-8 border border-slate-200 text-center flex flex-col items-center">
            <img 
                src="https://rajhifoundation.org/wp-content/uploads/sites/2858/2024/11/Asset-6.svg" 
                alt="Rajhi Foundation Logo" 
                className="h-20 mb-6"
            />
            <h2 className="text-2xl font-bold text-brand-blue">واجهة تحديد الزمن المقدر للإجراءات</h2>
            <p className="text-slate-600 mt-4 max-w-md">
                أداة تفاعلية لتحديد ومراجعة المدة التقديرية (SLA) لكل إجراء في سير العمل بدقة وتركيز.
            </p>
            <div className="mt-8 w-full flex flex-col items-center gap-4">
                <button
                    onClick={onStartWizard}
                    className="w-full max-w-xs mx-auto px-8 py-3 text-lg font-bold text-white bg-brand-blue rounded-lg hover:bg-opacity-90 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                    بدء أو تعديل الإعداد
                </button>
                <button
                    onClick={onStartReview}
                    className="w-full max-w-xs mx-auto px-8 py-3 text-lg font-bold text-brand-blue bg-transparent border-2 border-brand-blue rounded-lg hover:bg-brand-blue/10 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                    استعراض ملخص الإجراءات
                </button>
            </div>
        </div>
    );
};

export default StartScreen;
