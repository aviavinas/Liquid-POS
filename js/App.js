import { useState } from 'react';
import Dashboard from './pages/Dashboard.js';
import Products from './pages/Products.js';
import Customers from './pages/Customers.js';
import Passbook from './pages/Passbook.js';
import Analytics from './pages/Analytics.js';
import { SidebarNav, BottomNav } from './components/Navigation.js';

export default function App() {
    const [activeTab, setActiveTab] = useState('dashboard');

    const tabs = [
        { id: 'dashboard', icon: 'house', label: 'Home' },
        { id: 'products', icon: 'package', label: 'Products' },
        { id: 'customers', icon: 'users', label: 'Customers' },
        { id: 'passbook', icon: 'wallet', label: 'Passbook' },
        { id: 'analytics', icon: 'chart-line', label: 'Analytics' }
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard': return <Dashboard />;
            case 'products': return <Products />;
            case 'customers': return <Customers />;
            case 'passbook': return <Passbook />;
            case 'analytics': return <Analytics />;
            default: return null;
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <SidebarNav
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
            <main className="flex-1 bg-gray-50 pb-16 md:pb-0 md:pl-64">
                {renderContent()}
            </main>
            <BottomNav
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
        </div>
    );
}
