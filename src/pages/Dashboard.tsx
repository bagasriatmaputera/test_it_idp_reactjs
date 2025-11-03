import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface KPIData {
    customers: number;
    totalOrders: number;
    products: number;
    topProduct: string;
}

const Dashboard: React.FC = () => {
    const [kpi, setKpi] = useState<KPIData | null>(null);

    useEffect(() => {
        const fetchKpi = async () => {
            try {
                // Ganti URL sesuai dengan endpoint backend kamu
                const response = await axios.get('http://localhost:8000/api/dashboard-kpi');
                setKpi(response.data);
            } catch (error) {
                console.error('Gagal mengambil data KPI:', error);
            }
        };

        fetchKpi();
    }, []);

    if (!kpi) {
        return <div className="text-center text-gray-500 p-10">Memuat data dashboard...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-10">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Dashboard Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white shadow-md rounded-2xl p-6 text-center">
                    <h2 className="text-xl font-semibold text-gray-700">Customers</h2>
                    <p className="text-3xl font-bold text-blue-600 mt-2">{kpi.customers}</p>
                </div>

                <div className="bg-white shadow-md rounded-2xl p-6 text-center">
                    <h2 className="text-xl font-semibold text-gray-700">Total Orders</h2>
                    <p className="text-3xl font-bold text-green-600 mt-2">{kpi.totalOrders}</p>
                </div>

                <div className="bg-white shadow-md rounded-2xl p-6 text-center">
                    <h2 className="text-xl font-semibold text-gray-700">Products</h2>
                    <p className="text-3xl font-bold text-purple-600 mt-2">{kpi.products}</p>
                </div>

                <div className="bg-white shadow-md rounded-2xl p-6 text-center">
                    <h2 className="text-xl font-semibold text-gray-700">Produk Terbanyak Dibeli</h2>
                    <p className="text-lg font-bold text-orange-600 mt-2">{kpi.topProduct}</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;