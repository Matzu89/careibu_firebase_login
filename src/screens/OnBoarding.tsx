import { Divider } from "@/components/Divider";
import { GradientPage } from "@/components/GradientPage";
import { AuthForm, AuthMode } from "@/components/AuthForm";
import { useState } from "react";

export const OnBoarding = () => {
    const [authMode, setAuthMode] = useState<AuthMode>(AuthMode.SIGN_UP);

    return (
        <GradientPage>
            <div className="flex justify-between items-stretch w-full h-full">
                <div className="hidden flex-shrink-0 lg:flex w-1/2 p-8 h-full" style={{ backgroundImage: `url('/foto${authMode === AuthMode.SIGN_UP ? 2 : 3}.webp')`, backgroundSize: 'cover' }}>
                </div>
                <div className="flex flex-col items-center justify-start bg-white w-full lg:w-1/2 p-12 shadow-lg">
                    <ModeSwitcher currentMode={authMode} switchMode={setAuthMode} />
                    <img src="/logo.svg" className="max-w-[200px] mb-4" />
                    <h1 className="text-xl mb-0">Welcome to careibu!</h1>
                    <Divider />
                    <AuthForm mode={authMode} />
                </div>
            </div>
        </GradientPage>
    );
}

export const ModeSwitcher: React.FC<{ currentMode: AuthMode, switchMode: (mode: AuthMode) => void }> = ({ currentMode, switchMode }) => {
    if (currentMode == AuthMode.LOGIN) {
        return (
            <div className="flex min-w-full justify-end items-end mb-12">
                <p>Need an account? </p>
                <button className="ml-3 bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-3 rounded" onClick={() => switchMode(AuthMode.SIGN_UP)}>
                    Sign Up
                </button>
            </div>
        );
    }

    return (
        <div className="flex min-w-full justify-end items-end mb-12">
            <p>Already have an account? </p>
            <button className="ml-3 bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-3 rounded" onClick={() => switchMode(AuthMode.LOGIN)}>
                Sign In
            </button>
        </div>
    );
}