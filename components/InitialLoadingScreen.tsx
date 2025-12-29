
import React from 'react';
import LoadingSpinner from './LoadingSpinner';

const InitialLoadingScreen: React.FC = () => {
    return (
        <div className="bg-brand-gray min-h-screen flex flex-col items-center justify-center">
            <img 
                src="https://rajhifoundation.org/wp-content/uploads/sites/2858/2024/11/Asset-6.svg" 
                alt="Rajhi Foundation Logo" 
                className="h-24 mb-8"
            />
            <LoadingSpinner size="lg" />
            <p className="text-brand-blue font-semibold mt-4">...جاري تحميل البيانات</p>
        </div>
    );
};

export default InitialLoadingScreen;
