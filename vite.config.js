import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), svgr()],
	test: {
		environment: 'jsdom',
		setupFiles: ['./src/__tests__/setupTests.js'],
		include: [
			'**/__tests__/**/*.{test,spec}.?(c|m)[jt]s?(x)',
			'**/?(*.){test,spec}.?(c|m)[jt]s?(x)',
		],
		reporters: 'verbose',
		root: './',
	},
	build: {
		outDir: 'docs',
	},
});
