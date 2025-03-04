/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['antd', '@ant-design', 'rc-util', 'rc-pagination', 'rc-picker', 'rc-notification', 'rc-tooltip', 'rc-table'],
  // 如果使用了 Ant Design 图标，也需要添加
  swcMinify: true,
};

export default nextConfig;
