import type { Config } from '@react-router/dev/config';

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: false,
  // Pre-render all routes at build time
  async prerender() {
    return ['/', '/about', '/projects', '/contact'];
  },
} satisfies Config;
