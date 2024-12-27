// main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";
import App from "./App.tsx";
import { lightTheme, theme as darkTheme } from "./theme.ts";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot, useRecoilValue } from "recoil";
import { isDarkAtom } from "./recoil.ts";

const queryClient = new QueryClient();

function Root() {
  const isDark = useRecoilValue(isDarkAtom); // 다크 모드 상태 가져오기
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <App />
    </ThemeProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Root />
      </RecoilRoot>
    </QueryClientProvider>
  </StrictMode>
);
