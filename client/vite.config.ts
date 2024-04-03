import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
// https://vitejs.dev/config/

interface VitePluginSvgrOptions {
  exportAsDefault?: boolean;
  svgrOptions?: {
    icon?: boolean;
  };
}
export default defineConfig({
  plugins: [
    react(),
    vanillaExtractPlugin({}),
    svgr({
      exportAsDefault: true,
      svgrOptions: {
        icon: true,
      },
    } as VitePluginSvgrOptions), // 여기서 타입 강제 변환을 적용합니다.
  ],
  optimizeDeps: {
    exclude: ["js-big-decimal"],
  },
});
