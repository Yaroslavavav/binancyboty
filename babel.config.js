/* eslint-env node */

module.exports = {
  presets: [
    '@babel/preset-react',
    '@babel/preset-env',
    // [
    //   '@babel/preset-env',
    //   {
    //     useBuiltIns: 'usage',
    //     // webpack will process modules for us
    //     // but for jest we should enable modules
    //     modules: process.env.NODE_ENV === 'test' ? 'auto' : false,
    //     shippedProposals: true,
    //     include: ['proposal-class-properties'],
    //   },
    // ],
    [
      '@babel/preset-typescript',
      {
        allowDeclareFields: true,
      },
    ],
  ],
};
