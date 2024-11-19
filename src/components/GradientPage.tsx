import { PropsWithChildren } from "react";

export const GradientPage: React.FC<PropsWithChildren> = ({ children }) => (
    <div className="w-screen h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
        <div className="flex items-start justify-start h-full">
            {children}
        </div>
    </div>
);