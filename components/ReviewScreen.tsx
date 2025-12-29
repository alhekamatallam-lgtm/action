
import React from 'react';
import { type WorkflowStep } from '../types';

interface ReviewScreenProps {
    steps: WorkflowStep[];
    onEdit: (index: number) => void;
    onFinish: () => void;
}

const ReviewScreen: React.FC<ReviewScreenProps> = ({ steps, onEdit, onFinish }) => {
    return (
        <div className="bg-white shadow-lg rounded-xl p-8 border border-slate-200">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-brand-blue">ملخص المدد الزمنية للإجراءات</h2>
                <p className="text-slate-600 mt-2">يمكنك مراجعة وتعديل المدد المحددة لكل إجراء.</p>
            </div>

            <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
                {steps.map((step, index) => (
                    <div key={step["Step No"]} className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex justify-between items-center">
                        <div>
                            <p className="text-sm font-medium text-brand-gold">الإجراء رقم ({step["Step No"]})</p>
                            <h3 className="text-md font-bold text-brand-blue">{step["Workflow State"]}</h3>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-lg font-bold text-brand-blue">
                                {step["Estimated Action Duration"]} أيام
                            </span>
                            <button 
                                onClick={() => onEdit(index)} 
                                className="text-brand-blue hover:text-brand-gold font-semibold flex items-center gap-1 text-sm p-2 bg-slate-200 rounded-md hover:bg-slate-300 transition"
                                aria-label={`تعديل الإجراء ${step["Step No"]}`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z" /></svg>
                                تعديل
                            </button>
                        </div>
                    </div>
                ))}
            </div>

             <div className="mt-8 border-t pt-6 text-center">
                <button
                    onClick={onFinish}
                    className="w-full max-w-xs mx-auto px-8 py-3 text-lg font-bold text-white bg-brand-blue rounded-lg hover:bg-opacity-90 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                    إنهاء والعودة للبداية
                </button>
            </div>
        </div>
    );
};

export default ReviewScreen;
