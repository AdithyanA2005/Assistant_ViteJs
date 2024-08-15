import { ThemeProvider } from "@/components/providers/theme-provider.tsx";
function App() {
  return (
    <>
      <h1> Hi There</h1>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <h1> Hi There</h1>
      </ThemeProvider>
    </>
  );
}

export default App;
