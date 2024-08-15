import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/providers/theme-provider.tsx";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Navbar />
        <h1> Hi There</h1>
      </ThemeProvider>
    </>
  );
}

export default App;
