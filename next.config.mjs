const nextConfig = {
   webpack: (config, { isServer, dev }) => {
      if (!isServer && !dev) {
         config.optimization.splitChunks = {
            chunks: 'all',
            minSize: 30 * 1024,    // 30KB
            maxSize: 150 * 1024,   // 150KB (меньше!)
            cacheGroups: {
               default: false,
               // КРИТИЧЕСКИЕ библиотеки - маленький чанк
               critical: {
                  name: 'critical',
                  test: /[\\/]node_modules[\\/](react|react-dom|next)[\\/]/,
                  priority: 100,
                  minSize: 0,
                  maxSize: 100 * 1024, // 100KB максимум
               },
               // Остальные библиотеки - можно крупнее
               lib: {
                  name: 'lib',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 50,
                  minSize: 50 * 1024,
                  maxSize: 200 * 1024,
               },
               // Код приложения
               app: {
                  name: 'app',
                  test: /[\\/]src[\\/]/,
                  minChunks: 2,
                  priority: 30,
                  minSize: 20 * 1024,
                  maxSize: 100 * 1024,
               },
            },
         };
      }
      return config;
   },
};