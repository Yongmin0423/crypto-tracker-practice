import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  base: "/", // 서브디렉토리 경로로 설정
  plugins: [react()],
});
