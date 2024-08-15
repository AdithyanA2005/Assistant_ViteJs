import { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { AuthWrapper } from "@/components/auth/auth-wrapper.tsx";
import { SignInCard } from "@/components/auth/signin-card.tsx";
import { SignUpCard } from "@/components/auth/signup-card.tsx";
import { Navbar } from "@/components/navbar";
import { AuthProvider } from "@/components/providers/auth-provider.tsx";
import { ThemeProvider } from "@/components/providers/theme-provider.tsx";
import { useAuth } from "@/store/use-auth.ts";

function App() {
  const { authStatus, isAuthLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // if
  }, [isAuthLoading, authStatus]);

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Navbar />
        {isAuthLoading && <h1> Hi There</h1>}

        <Routes>
          <Route path="/" element={<AuthWrapper />}>
            <Route path="/signin" element={<SignInCard goToSignUp={() => navigate("/signup")} />} />
            <Route path="/signup" element={<SignUpCard goToSignIn={() => navigate("/signin")} />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>

        <AuthProvider />
      </ThemeProvider>
    </>
  );
}

export default App;
