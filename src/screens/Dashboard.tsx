import { useAuth } from "@//context/auth.context";
import { GradientPage } from "@/components/GradientPage";
import { firebaseAuth } from "@/firebase";
import { signOut } from "firebase/auth";

export const DashboardScreen = () => {
    // Use auth to show some user information
    const authCtx = useAuth();

    // one can safely assume that the user is there, since we won't be here if not
    const user = authCtx.currentUser!;

    return (
        <GradientPage>
            <div className="flex flex-col items-start justify-start bg-white w-1/2 p-12 rounded-lg shadow-lg mt-8 mx-auto">
                <div className="flex justify-between items-start w-full mb-4">
                    <img src="/logo.svg" className="max-w-[200px]" />
                    <button className="ml-3 bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-3 rounded" onClick={() => { void signOut(firebaseAuth); }}>
                        Sign Out
                    </button>
                </div>
                <p className="text-xl mb-4">Welcome back careibu!</p>
                <p>{user.email}</p>
            </div>
        </GradientPage>
    );
}