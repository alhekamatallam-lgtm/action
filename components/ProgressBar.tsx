
import React from 'react';

interface ProgressBarProps {
    current: number;
    total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
    const progressPercentage = (current / total) * 100;

    return (
        <div className="w-full px-4">
            <div className="flex justify-center mb-2">
                <span className="text-sm font-medium text-brand-blue">⦿ الإجراء {current} من {total}</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2.5">
                <div 
                    className="bg-brand-blue h-2.5 rounded-full transition-all duration-500" 
                    style={{ width: `${progressPercentage}%` }}
                ></div>
            </div>
        </div>
    );
};

export default ProgressBar;
