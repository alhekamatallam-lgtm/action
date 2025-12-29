
import React from 'react';

const UnderConstruction: React.FC = () => {
    return (
        <div className="min-h-screen bg-brand-gray flex flex-col items-center justify-center text-center p-4 font-sans">
            <img 
                src="https://rajhifoundation.org/wp-content/uploads/sites/2858/2024/11/Asset-6.svg" 
                alt="Rajhi Foundation Logo" 
                className="h-24 mb-8"
            />
            <h1 className="text-4xl font-bold text-brand-blue mb-4">
                تحت الإنشاء
            </h1>
            <p className="text-lg text-slate-600 max-w-md">
                نعمل حاليًا على تطوير هذه الواجهة لتقديم أفضل تجربة ممكنة. شكرًا لتفهمكم وصبركم.
            </p>
        </div>
    );
};

export default UnderConstruction;
