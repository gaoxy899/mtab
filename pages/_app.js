import "@/styles/globals.css";

// pages/_app.js
import { useState, useEffect } from 'react';
import { Layout, Menu, Tabs } from 'antd';
import { useRouter } from 'next/router';
import { 
  MenuFoldOutlined, 
  MenuUnfoldOutlined,
  DashboardOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  SettingOutlined
} from '@ant-design/icons';


const { Header, Sider, Content } = Layout;
const { TabPane } = Tabs;

// 菜单配置
const menuItems = [
  {
    key: 'dashboard',
    icon: <DashboardOutlined />,
    label: '仪表盘',
    path: '/dashboard'
  },
  {
    key: 'users',
    icon: <UserOutlined />,
    label: '用户管理',
    path: '/users'
  },
  {
    key: 'products',
    icon: <ShoppingCartOutlined />,
    label: '产品管理',
    path: '/products'
  },
  {
    key: 'settings',
    icon: <SettingOutlined />,
    label: '系统设置',
    path: '/settings'
  }
];

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [tabs, setTabs] = useState([]);
  const [activeKey, setActiveKey] = useState('');
  
  // 检查用户登录状态
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('token');
    if (!isLoggedIn && router.pathname !== '/login') {
      router.push('/login');
    }
  }, [router]);

  // 处理路由变化，添加新标签页
  useEffect(() => {
    if (router.pathname === '/login') return;
    
    const path = router.pathname;
    const menuItem = menuItems.find(item => item.path === path);
    
    if (menuItem && !tabs.some(tab => tab.key === menuItem.key)) {
      setTabs([...tabs, {
        key: menuItem.key,
        label: menuItem.label,
        path: menuItem.path
      }]);
    }
    
    if (menuItem) {
      setActiveKey(menuItem.key);
    }
  }, [router.pathname]);

  // 切换菜单折叠状态
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  // 处理菜单点击
  const handleMenuClick = (item) => {
    const menuItem = menuItems.find(menu => menu.key === item.key);
    if (menuItem) {
      router.push(menuItem.path);
    }
  };

  // 切换标签页
  const onChange = (activeKey) => {
    setActiveKey(activeKey);
    const tab = tabs.find(tab => tab.key === activeKey);
    if (tab) {
      router.push(tab.path);
    }
  };

  // 移除标签页
  const onEdit = (targetKey, action) => {
    if (action === 'remove') {
      const newTabs = tabs.filter(tab => tab.key !== targetKey);
      setTabs(newTabs);
      
      // 如果关闭的是当前激活的标签，则切换到最后一个标签
      if (targetKey === activeKey && newTabs.length) {
        const lastTab = newTabs[newTabs.length - 1];
        setActiveKey(lastTab.key);
        router.push(lastTab.path);
      }
    }
  };

  // 如果是登录页，直接显示登录组件
  if (router.pathname === '/login') {
    return <Component {...pageProps} />;
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.3)' }} />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[activeKey]}
          onClick={handleMenuClick}
          items={menuItems}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {collapsed ? 
            <MenuUnfoldOutlined className="trigger" onClick={toggleCollapsed} style={{ marginLeft: 16 }} /> : 
            <MenuFoldOutlined className="trigger" onClick={toggleCollapsed} style={{ marginLeft: 16 }} />
          }
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          {tabs.length > 0 ? (
            <Tabs
              hideAdd
              onChange={onChange}
              activeKey={activeKey}
              type="editable-card"
              onEdit={onEdit}
            >
              {tabs.map(tab => (
                <TabPane key={tab.key} tab={tab.label}>
                  {activeKey === tab.key && <Component {...pageProps} />}
                </TabPane>
              ))}
            </Tabs>
          ) : (
            <Component {...pageProps} />
          )}
        </Content>
      </Layout>
    </Layout>
  );
}

export default MyApp;