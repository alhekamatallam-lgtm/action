
import React, { useState, useEffect } from 'react';
import { type WorkflowStep } from '../types';
import { generateDescription } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';

interface ActionCardProps {
    step: WorkflowStep;
    onSave: (stepNo: number, duration: number) => Promise<void>;
    onPrevious: () => void;
    onNext: () => void;
    isFirst: boolean;
    isLast: boolean;
}

const ActionCard: React.FC<ActionCardProps> = ({ step, onSave, onPrevious, onNext, isFirst, isLast }) => {
    const hasInitialDuration = !!step["Estimated Action Duration"];
    const [isEditing, setIsEditing] = useState(!hasInitialDuration);
    const [duration, setDuration] = useState<string>(step["Estimated Action Duration"]?.toString() || '');
    const [description, setDescription] = useState<string>('');
    const [isGenerating, setIsGenerating] = useState<boolean>(true);
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        setIsEditing(!step["Estimated Action Duration"]);
        setDuration(step["Estimated Action Duration"]?.toString() || '');
    }, [step]);
    
    useEffect(() => {
        const fetchDescription = async () => {
            setIsGenerating(true);
            const desc = await generateDescription(step);
            setDescription(desc);
            setIsGenerating(false);
        };
        fetchDescription();
    }, [step]);

    const handleSaveClick = async () => {
        setError('');
        const durationNum = parseInt(duration, 10);
        if (isNaN(durationNum) || durationNum <= 0) {
            setError('الرجاء إدخال عدد صحيح موجب للأيام.');
            return;
        }
        setIsSaving(true);
        try {
            await onSave(step["Step No"], durationNum);
            // After save, the parent will handle navigation or view change
        } catch (err: any) {
            setError(err.message || 'حدث خطأ غير متوقع أثناء الحفظ.');
        } finally {
            setIsSaving(false);
        }
    };
    
    return (
        <div className="bg-white shadow-lg rounded-xl p-8 border border-slate-200 transition-all duration-300">
            <div className="text-center mb-6">
                <p className="text-sm font-medium text-brand-gold">الإجراء رقم ({step["Step No"]})</p>
                <h2 className="text-2xl font-bold text-brand-blue mt-1">{step["Workflow State"]}</h2>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 min-h-[120px] flex items-center justify-center">
                {isGenerating ? (
                    <LoadingSpinner />
                ) : (
                    <p className="text-slate-700 text-center leading-relaxed">{description}</p>
                )}
            </div>

            <div className="mt-8">
                <label htmlFor="duration" className="block text-md font-bold text-slate-700 mb-2 text-center">المدة التقديرية للإجراء (بالأيام)</label>
                {isEditing ? (
                    <div>
                        <input
                            id="duration"
                            type="number"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            placeholder="مثال: 3"
                            min="1"
                            className="w-full px-4 py-3 text-lg text-center border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition"
                            disabled={isSaving}
                        />
                        <p className="text-sm text-slate-500 mt-2 text-center">المدة المتوقعة لإنهاء هذا الإجراء دون تأخير.</p>
                        {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
                    </div>
                ) : (
                    <div className="flex items-center justify-center gap-4 bg-slate-100 border border-slate-200 rounded-lg p-4">
                        <span className="text-2xl font-bold text-brand-blue">⏱️ {duration} أيام</span>
                        <button onClick={() => setIsEditing(true)} className="text-brand-blue hover:text-brand-gold font-semibold flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z" /></svg>
                            تعديل
                        </button>
                    </div>
                )}
            </div>
            
            <div className="mt-8 flex justify-between items-center">
                 <button onClick={onPrevious} disabled={isFirst} className="px-6 py-2 text-slate-700 bg-slate-200 rounded-lg hover:bg-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition">السابق</button>
                 
                 {isEditing && (
                    <button 
                        onClick={handleSaveClick}
                        disabled={isSaving || !duration}
                        className="px-8 py-3 text-lg font-bold text-white bg-brand-blue rounded-lg hover:bg-opacity-90 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:bg-opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px]">
                        {isSaving ? <LoadingSpinner size="sm" /> : 'حفظ'}
                    </button>
                 )}

                 <button onClick={onNext} disabled={isLast} className="px-6 py-2 text-slate-700 bg-slate-200 rounded-lg hover:bg-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition">التالي</button>
            </div>

        </div>
    );
};

export default ActionCard;
