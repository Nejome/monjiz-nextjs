import { ReactNode } from "react";

type alertProps = {
    type: 'info' | 'success' | 'warning' | 'danger';
    className?: string
    children: ReactNode;
};

const types = {
    info: "text-blue-500 bg-blue-100 border border-blue-500",
    success: "text-green-500 bg-green-100 border border-green-500",
    warning: "text-yellow-500 bg-yellow-100 border border-yellow-500",
    danger: "text-red-500 bg-red-100 border border-red-500",
};

export default function Alert({type, children, className = ''}:alertProps) {
    return (
        <>
            <div
                className={`p-3 mb-4 text-xs ${types[type]} rounded ${className}`}
                role="alert"
            >
                {children}
            </div>
        </>
    );
}
