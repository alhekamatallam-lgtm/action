
import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-white shadow-md w-full sticky top-0 z-10">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center">
                         <img 
                            className="h-12 w-auto" 
                            src="https://rajhifoundation.org/wp-content/uploads/sites/2858/2024/11/Asset-6.svg" 
                            alt="Rajhi Foundation Logo" 
                         />
                         <h1 className="text-brand-blue text-lg font-bold mr-4 hidden sm:block">
                            مؤسسة الراجحي – واجهة تحديد الزمن المقدر للإجراءات
                         </h1>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
