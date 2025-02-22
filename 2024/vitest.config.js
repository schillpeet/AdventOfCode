import { defineConfig } from 'vitest/config';
import viteTsconfigPaths from 'vite-tsconfig-paths';
export default defineConfig({
    plugins: [viteTsconfigPaths()],
    test: {
        globals: true,
        include: ['**/*.test.ts'],
        watch: true
    }
});
