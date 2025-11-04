const nextConfig = {
   webpack: (config, { isServer, dev }) => {
      if (!isServer && !dev) {
         config.optimization.splitChunks = {
            chunks: 'all',
            minSize: 200 * 1024,
            maxSize: 2000 * 1024,
            cacheGroups: {
               default: false,
               // Просто объединяем все node_modules в один чанк
               vendors: {
                  name: 'vendors',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 20,
                  enforce: true,
                  reuseExistingChunk: true,
               },
            },
         };
      }
      return config;
   },
   experimental: {
      optimizeCss: false,
   },
};

export default nextConfig;