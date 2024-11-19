import { useAuth } from '@/context/auth.context';

import { DashboardScreen } from '@/screens/Dashboard';
import { OnBoarding } from '@/screens/OnBoarding'

import { GradientPage } from './components/GradientPage';

function App() {
  const authCtx = useAuth();

  // Show a empty page while loading auth state from firebase
  if (authCtx.loading) {
    return <GradientPage />;
  }
  // I assume two states: Signed In and Not Signed In.
  // When the user is signed in, I'll show some content
  // When the user is not signed in, I'll show a Onboarding (Sign Up/Sign In) screen.

  // When the user is signed in show Dashboard
  if (authCtx.currentUser) {
    return (
      <DashboardScreen />
    )
  }

  // When the user is not signed in show Onboarding screen
  return (
    <OnBoarding />
  )
}

export default App
