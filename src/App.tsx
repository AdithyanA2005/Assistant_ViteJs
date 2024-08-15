import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { AuthWrapper } from "@/components/auth/auth-wrapper.tsx";
import { SignInCard } from "@/components/auth/signin-card.tsx";
import { SignUpCard } from "@/components/auth/signup-card.tsx";
import { LoadingWrapper } from "@/components/loading/loading-wrapper.tsx";
import { Navbar } from "@/components/navbar";
import { Protected } from "@/components/protected.tsx";
import { AuthProvider } from "@/components/providers/auth-provider.tsx";
import { ThemeProvider } from "@/components/providers/theme-provider.tsx";

function App() {
  const navigate = useNavigate();

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Navbar />
        <Routes>
          <Route path="/" element={<LoadingWrapper />}>
            <Route path="/" element={<Protected />}>
              <Route path="/" element={<h1> Hello World</h1>} />
            </Route>

            <Route path="/" element={<AuthWrapper />}>
              <Route path="/signin" element={<SignInCard goToSignUp={() => navigate("/signup")} />} />
              <Route path="/signup" element={<SignUpCard goToSignIn={() => navigate("/signin")} />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace={true} />} />
          </Route>
        </Routes>

        <AuthProvider />
      </ThemeProvider>
    </>
  );
}

export default App;
