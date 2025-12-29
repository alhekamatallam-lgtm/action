
import React, { useState, useEffect, useCallback } from 'react';
import { fetchSteps, updateStep } from './services/workflowService';
import { type WorkflowStep } from './types';
import ActionCard from './components/ActionCard';
import ProgressBar from './components/ProgressBar';
import LoadingSpinner from './components/LoadingSpinner';
import Toast from './components/Toast';
import Header from './components/Header';
import StartScreen from './components/StartScreen';
import ReviewScreen from './components/ReviewScreen';

type View = 'start' | 'wizard' | 'review';

const App: React.FC = () => {
    const [steps, setSteps] = useState<WorkflowStep[]>([]);
    const [currentStepIndex, setCurrentStepIndex] = useState<number | null>(null);
    const [initialDataLoaded, setInitialDataLoaded] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [toastMessage, setToastMessage] = useState<string>('');
    const [view, setView] = useState<View>('start');
    const [returnToReview, setReturnToReview] = useState<boolean>(false);

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const fetchedSteps = await fetchSteps();
                setSteps(fetchedSteps);
            } catch (err) {
                setError('فشل في تحميل بيانات سير العمل. يرجى المحاولة مرة أخرى.');
                console.error(err);
            } finally {
                setInitialDataLoaded(true);
            }
        };
        loadInitialData();
    }, []);

    const showToast = (message: string) => {
        setToastMessage(message);
        setTimeout(() => setToastMessage(''), 3000);
    };

    const handleSave = useCallback(async (stepNo: number, duration: number) => {
        try {
            await updateStep(stepNo, duration);
            const newSteps = steps.map(step =>
                step["Step No"] === stepNo
                    ? { ...step, "Estimated Action Duration": duration.toString() }
                    : step
            );
            setSteps(newSteps);
            showToast('تم حفظ المدة بنجاح');

            if (returnToReview) {
                setView('review');
                setReturnToReview(false);
                return;
            }

            const allComplete = newSteps.every(step => step["Estimated Action Duration"]);
            if (allComplete) {
                setView('review');
            } else {
                setTimeout(() => {
                     const nextIncompleteIndex = newSteps.findIndex((step, index) => index > (currentStepIndex ?? -1) && !step["Estimated Action Duration"]);
                     if (nextIncompleteIndex !== -1) {
                         setCurrentStepIndex(nextIncompleteIndex);
                     } else {
                        const firstIncompleteIndex = newSteps.findIndex(step => !step["Estimated Action Duration"]);
                        if (firstIncompleteIndex !== -1) {
                           setCurrentStepIndex(firstIncompleteIndex);
                        } else {
                           setView('review');
                        }
                     }
                }, 500);
            }
        } catch (err) {
            console.error('Save failed:', err);
            throw new Error('فشل في حفظ البيانات. يرجى التحقق من اتصالك بالإنترنت.');
        }
    }, [currentStepIndex, steps, returnToReview]);

    const handlePrevious = () => {
        if (currentStepIndex !== null && currentStepIndex > 0) {
            setCurrentStepIndex(currentStepIndex - 1);
        }
    };

    const handleNext = () => {
        if (currentStepIndex !== null && currentStepIndex < steps.length - 1) {
            setCurrentStepIndex(currentStepIndex + 1);
        }
    };

    const handleEditStep = (stepIndex: number) => {
        setReturnToReview(true);
        setCurrentStepIndex(stepIndex);
        setView('wizard');
    };

    const handleStartWizard = () => {
        setReturnToReview(false);
        const firstUnsetIndex = steps.findIndex(step => !step["Estimated Action Duration"]);
        setCurrentStepIndex(firstUnsetIndex !== -1 ? firstUnsetIndex : 0);
        setView('wizard');
    };

    const handleStartReview = () => {
        setView('review');
    };

    const renderContent = () => {
        if (!initialDataLoaded) {
            return (
                <div className="flex items-center justify-center min-h-[50vh]">
                    <LoadingSpinner />
                </div>
            );
        }

        if (error) {
            return <div className="flex items-center justify-center min-h-[50vh] text-red-600 text-xl">{error}</div>;
        }

        if (view === 'start') {
            return <StartScreen onStartWizard={handleStartWizard} onStartReview={handleStartReview} />;
        }
        
        if (view === 'review') {
            return <ReviewScreen steps={steps} onEdit={handleEditStep} onFinish={() => setView('start')} />;
        }

        const currentStep = currentStepIndex !== null ? steps[currentStepIndex] : null;

        return currentStep ? (
             <>
                <ActionCard
                    key={currentStep["Step No"]}
                    step={currentStep}
                    onSave={handleSave}
                    onPrevious={handlePrevious}
                    onNext={handleNext}
                    isFirst={currentStepIndex === 0}
                    isLast={currentStepIndex === steps.length - 1}
                />
                {steps.length > 0 && currentStepIndex !== null && (
                    <div className="mt-8">
                        <ProgressBar current={currentStepIndex + 1} total={steps.length} />
                    </div>
                )}
            </>
        ) : (
           <p>لا توجد إجراءات لعرضها أو حدث خطأ في التحميل.</p>
        );
    };

    return (
        <div className="min-h-screen bg-brand-gray flex flex-col font-sans">
            <Header />
            <main className="flex-grow flex flex-col items-center justify-center p-4">
                <div className="w-full max-w-2xl mx-auto">
                    {renderContent()}
                </div>
            </main>
            {toastMessage && <Toast message={toastMessage} />}
        </div>
    );
};

export default App;
