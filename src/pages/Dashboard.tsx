import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

interface KPIData {
    total_customers: number;
    total_orders: number;
    total_products: number;
    max_payment: number;
}

const Dashboard: React.FC = () => {
    const [kpi, setKpi] = useState<KPIData | null>(null);

    useEffect(() => {
        const fetchKpi = async () => {
            try {
                // Ganti URL sesuai dengan endpoint backend kamu
                const response = await axios.get('http://localhost:8000/api/dashboard');
                setKpi(response.data);
            } catch (error) {
                console.error('Gagal mengambil data KPI:', error);
            }
        };

        fetchKpi();
    }, []);

    if (!kpi) {
        return <div className="text-center text-gray-500 p-10">Memuat data dashboard... pastikan laravel sudah berjalan di local anda</div>;
    }

    return (
        <>
            <Navbar />
        <div className="min-h-screen bg-gray-100 p-10">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Dashboard Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white shadow-md rounded-2xl p-6 text-center">
                    <h2 className="text-xl font-semibold text-gray-700">Customers</h2>
                    <p className="text-3xl font-bold text-blue-600 mt-2">{kpi.total_customers}</p>
                </div>

                <div className="bg-white shadow-md rounded-2xl p-6 text-center">
                    <h2 className="text-xl font-semibold text-gray-700">Total Orders</h2>
                    <p className="text-3xl font-bold text-green-600 mt-2">{kpi.total_orders}</p>
                </div>

                <div className="bg-white shadow-md rounded-2xl p-6 text-center">
                    <h2 className="text-xl font-semibold text-gray-700">Products</h2>
                    <p className="text-3xl font-bold text-purple-600 mt-2">{kpi.total_products}</p>
                </div>

                <div className="bg-white shadow-md rounded-2xl p-6 text-center">
                    <h2 className="text-xl font-semibold text-gray-700">Pembelian Terbesar</h2>
                    <p className="text-lg font-bold text-green-600 mt-2">Rp {kpi.max_payment}</p>
                </div>
            </div>
        </div>
        </>
    );
};

export default Dashboard;