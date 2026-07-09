// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  // EasyPanel runs the build output as a plain Node process, not Cloudflare Workers,
  // so we need to override the wrapper's cloudflare-module default preset. Without
  // this, `.output/server/index.mjs` targets the Workers runtime and doesn't run
  // under plain `node` — which is why production was falling back to `vite dev`.
  nitro: {
    preset: "node-server",
  },
  vite: {
    server: {
      // Local `vite dev` sits behind EasyPanel's reverse proxy when running there,
      // and Vite rejects requests whose Host header isn't allow-listed. Production
      // itself runs the built Node server (see nixpacks.toml), which isn't subject
      // to this check, but we keep the allow-list for local/preview use on EasyPanel.
      allowedHosts: [".easypanel.host", "quizz.vemdafruta.com.br", "www.quizz.vemdafruta.com.br"],
    },
  },
});
