import { useAuth } from "@//context/auth.context";
import { GradientPage } from "@/components/GradientPage";

export const DashboardScreen = () => {
    // Use auth to show some user information
    const authCtx = useAuth();

    // one can safely assume that the user is there, since we won't be here if not
    const user = authCtx.currentUser!;

    return (
        <GradientPage>
            <div className="rounded-lg bg-white m-w-full m-4">
                {user.email}
            </div>
        </GradientPage>
    );
}