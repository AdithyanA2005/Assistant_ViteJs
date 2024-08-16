import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { LoadingWrapper } from "@/components/loading/loading-wrapper.tsx";
import { Navbar } from "@/components/navbar";
import { AuthWrapper } from "@/components/pages/auth/auth-wrapper.tsx";
import { SignInCard } from "@/components/pages/auth/signin-card.tsx";
import { SignUpCard } from "@/components/pages/auth/signup-card.tsx";
import { Protected } from "@/components/protected.tsx";
import { AuthProvider } from "@/components/providers/auth-provider.tsx";
import { OverlaysProvider } from "@/components/providers/overlays-provider.tsx";
import { ThemeProvider } from "@/components/providers/theme-provider.tsx";
import { Home } from "./components/pages/home";

function App() {
  const navigate = useNavigate();

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Navbar />
        <Routes>
          <Route path="/" element={<LoadingWrapper />}>
            <Route path="/" element={<Protected />}>
              <Route path="/" element={<Home />} />
            </Route>

            <Route path="/" element={<AuthWrapper />}>
              <Route path="/signin" element={<SignInCard goToSignUp={() => navigate("/signup")} />} />
              <Route path="/signup" element={<SignUpCard goToSignIn={() => navigate("/signin")} />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace={true} />} />
          </Route>
        </Routes>

        <AuthProvider />
        <OverlaysProvider />
      </ThemeProvider>
    </>
  );
}

export default App;
