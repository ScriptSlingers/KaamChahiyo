import React from "react";

export const TabSelector = ({
    isActive,
    children,
    onClick,
}: {
    isActive: boolean;
    children: React.ReactNode;
    onClick: () => void;
}) => (
    <div>
        <div className="hidden lg:flex lg:bg-gray-50 w-5/6 p-2 gap-0 lg:gap-5 rounded-md cursor-pointer" onClick={onClick}>
            {children}
        </div>
        <button
            className={`mr-8 lg:hidden group inline-flex items-center px-2 py-4 border-b-2 font-medium text-sm leading-5 cursor-pointer whitespace-nowrap ${isActive
                ? "border-orange-500 text-orange-500 focus:outline-none focus:text-orange-500 focus:border-orange-500"
                : "border-transparent text-gray-500 hover:text-gray-600 hover:border-gray-300 focus:text-gray-600 focus:border-gray-300"
                }`}
            onClick={onClick}
        >
            {children}
        </button>
    </div>

);