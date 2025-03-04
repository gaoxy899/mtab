// babel.config.js
module.exports = {
    presets: ['next/babel'],
    plugins: [
      [
        'import',
        {
          libraryName: 'antd',
          libraryDirectory: 'lib',
          style: 'true', // 如果需要自定义样式，可以修改为 'style'
        },
      ],
    ],

  };
  