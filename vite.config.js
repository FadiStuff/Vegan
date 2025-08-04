import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // ✅ deploys cleanly to the root
  plugins: [react()],
});
