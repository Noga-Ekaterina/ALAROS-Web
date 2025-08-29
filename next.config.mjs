const nextConfig= {
   async rewrites() {
      return [
         {
            source: '/:path*/:file.:ext(png|jpg|jpeg|gif|ico|svg|pdf|doc|docx|xls|xlsx)',
            destination: '/public/:path*/:file.:ext',
         },
      ];
   },
};

export default nextConfig;
