

// https://vitejs.dev/config/
export default {
  server: {
    proxy: {
      '/api': {
        target: 'https://sore-puce-butterfly-cap.cyclic.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
};
