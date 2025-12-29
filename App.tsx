
import React, { useState, useEffect } from 'react';
import { type WorkflowStep } from './types';
import { fetchSteps, updateStep } from './services/workflowService';

import Header from './components/Header';
import InitialLoadingScreen from './components/InitialLoadingScreen';
import StartScreen from './components/StartScreen';
import ActionCard from './components/ActionCard';
import ProgressBar from './components/ProgressBar';
import CompletionScreen from './components/CompletionScreen';
import ReviewScreen from './components/ReviewScreen';
import Toast from './components/Toast';

type AppState = 'loading' | 'start' | 'wizard' | 'review' | 'complete';

const App: React.FC = () => {
    const [appState, setAppState] = useState<AppState>('loading');
    const [steps, setSteps] = useState<WorkflowStep[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const [showToast, setShowToast] = useState<boolean>(false);

    useEffect(() => {
        const loadSteps = async () => {
            try {
                const fetchedSteps = await fetchSteps();
                setSteps(fetchedSteps);
                setAppState('start');
            } catch (err: any) {
                setError('فشل في تحميل بيانات سير العمل. الرجاء المحاولة مرة أخرى.');
                console.error(err);
            }
        };
        loadSteps();
    }, []);

    const handleStartWizard = () => {
        const firstUnsetIndex = steps.findIndex(step => !step["Estimated Action Duration"]);
        setCurrentIndex(firstUnsetIndex >= 0 ? firstUnsetIndex : 0);
        setAppState('wizard');
    };

    const handleStartReview = () => {
        setAppState('review');
    };

    const handleNext = () => {
        if (currentIndex < steps.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };
    
    const handleSave = async (stepNo: number, duration: number) => {
        try {
            await updateStep(stepNo, duration);
            const updatedSteps = steps.map(step =>
                step["Step No"] === stepNo ? { ...step, "Estimated Action Duration": duration } : step
            );
            setSteps(updatedSteps);

            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
            
            const allStepsCompleted = updatedSteps.every(step => !!step["Estimated Action Duration"]);

            if (allStepsCompleted) {
                 setAppState('complete');
            } else if (currentIndex < steps.length - 1) {
                handleNext();
            } else {
                const nextUnsetIndex = updatedSteps.findIndex(step => !step["Estimated Action Duration"]);
                if(nextUnsetIndex !== -1) {
                    setCurrentIndex(nextUnsetIndex);
                } else {
                    setAppState('review');
                }
            }
        } catch (err) {
            console.error("Save failed:", err);
            throw new Error("فشل حفظ البيانات. قد يكون بسبب قيود الشبكة مع Google Scripts.");
        }
    };

    const handleEditFromReview = (index: number) => {
        setCurrentIndex(index);
        setAppState('wizard');
    };

    const handleFinish = () => {
        setAppState('start');
    };

    const renderContent = () => {
        switch (appState) {
            case 'loading':
                return <InitialLoadingScreen />;
            case 'start':
                return <StartScreen onStartWizard={handleStartWizard} onStartReview={handleStartReview} />;
            case 'wizard':
                if (steps.length === 0) return <div>لا توجد خطوات لعرضها.</div>;
                const currentStep = steps[currentIndex];
                return (
                    <div className="w-full max-w-2xl mx-auto space-y-6">
                        <ProgressBar current={currentIndex + 1} total={steps.length} />
                        <ActionCard
                            step={currentStep}
                            onSave={handleSave}
                            onPrevious={handlePrevious}
                            onNext={handleNext}
                            isFirst={currentIndex === 0}
                            isLast={currentIndex === steps.length - 1}
                        />
                    </div>
                );
            case 'review':
                 return <ReviewScreen steps={steps} onEdit={handleEditFromReview} onFinish={handleFinish} />;
            case 'complete':
                return <CompletionScreen onFinish={handleFinish} />;
            default:
                return <div>حالة غير معروفة</div>;
        }
    };

    return (
        <div className="font-sans">
            <Header />
            <main className="min-h-screen bg-brand-gray flex items-center justify-center p-4 sm:p-6 lg:p-8">
                {error ? <div className="text-red-500 text-center">{error}</div> : renderContent()}
            </main>
            {showToast && <Toast message="تم حفظ المدة بنجاح" />}
        </div>
    );
};

export default App;
