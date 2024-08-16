import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { LoadingWrapper } from "@/components/loading/loading-wrapper";
import { Navbar } from "@/components/navbar";
import { AuthWrapper } from "@/components/pages/auth/auth-wrapper";
import { SignInCard } from "@/components/pages/auth/signin-card";
import { SignUpCard } from "@/components/pages/auth/signup-card";
import { AppearanceSettings } from "@/components/pages/settings/appearance";
import { ProfileSettings } from "@/components/pages/settings/profile";
import { SettingsWrapper } from "@/components/pages/settings/settings-wrapper";
import { Protected } from "@/components/protected";
import { AuthProvider } from "@/components/providers/auth-provider";
import { OverlaysProvider } from "@/components/providers/overlays-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
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

            <Route path="/settings" element={<SettingsWrapper />}>
              <Route path="" element={<Navigate to="/settings/profile" />} />
              <Route path="profile" element={<ProfileSettings />} />
              <Route path="appearance" element={<AppearanceSettings />} />
              <Route path="*" element={<Navigate to="/settings/profile" />} />
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
