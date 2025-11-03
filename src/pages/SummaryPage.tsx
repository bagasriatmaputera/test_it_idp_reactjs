import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

interface OrderSummary {
    id: number;
    no_order: string;
    tanggal_transaksi: string;
    nama_customer: string;
    total_harga: number;
}

const SummaryPage: React.FC = () => {
    const [summaries, setSummaries] = useState<OrderSummary[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filterDate, setFilterDate] = useState<string>('');

    useEffect(() => {
        fetchSummaries();
    }, []);

    const fetchSummaries = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/summary');
            setSummaries(response.data);
        } catch (error) {
            console.error('Gagal memuat data summary:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Apakah Anda yakin ingin menghapus data ini?')) return;
        try {
            await axios.delete(`http://localhost:8000/api/summary/${id}`);
            alert('Data berhasil dihapus!');
            fetchSummaries();
        } catch (error) {
            alert('Gagal menghapus data.');
            console.error(error);
        }
    };

    const filteredSummaries = summaries.filter((summary) => {
        const matchOrder = summary.no_order.toLowerCase().includes(searchTerm.toLowerCase());
        const matchName = summary.nama_customer.toLowerCase().includes(searchTerm.toLowerCase());
        const matchDate = filterDate ? summary.tanggal_transaksi.startsWith(filterDate) : true;
        return (matchOrder || matchName) && matchDate;
    });

    if (loading) {
        return <div className="text-center text-gray-500 p-10">Memuat data order summary...</div>;
    }

    return (
        <>
            <Navbar />
        <div className="min-h-screen bg-gray-100 p-10">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Daftar Order Summary</h1>

            <div className="bg-white shadow-md rounded-2xl p-4 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                <input
                    type="text"
                    placeholder="Cari berdasarkan No Order atau Nama Customer..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border p-2 rounded w-full md:w-1/2"
                />
                <div className="flex items-center gap-2">
                    <label className="text-gray-600">Filter Tanggal Transaksi:</label>
                    <input
                        type="date"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                        className="border p-2 rounded"
                    />
                </div>
            </div>

            <div className="overflow-x-auto bg-white shadow-md rounded-2xl">
                <table className="w-full border-collapse text-sm text-left">
                    <thead className="bg-gray-200 text-gray-700">
                        <tr>
                            <th className="p-3 border">No Order</th>
                            <th className="p-3 border">Tanggal Transaksi</th>
                            <th className="p-3 border">Nama Customer</th>
                            <th className="p-3 border">Total Harga</th>
                            <th className="p-3 border text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSummaries.length > 0 ? (
                            filteredSummaries.map((summary) => (
                                <tr key={summary.id} className="hover:bg-gray-100">
                                    <td className="p-3 border">{summary.no_order}</td>
                                    <td className="p-3 border">{new Date(summary.tanggal_transaksi).toLocaleDateString('id-ID')}</td>
                                    <td className="p-3 border">{summary.nama_customer}</td>
                                    <td className="p-3 border font-semibold text-green-600">Rp {summary.total_harga.toLocaleString('id-ID')}</td>
                                    <td className="p-3 border text-center">
                                        <button
                                            onClick={() => handleDelete(summary.id)}
                                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md"
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center p-4 text-gray-500">
                                    Tidak ada data order summary yang sesuai.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    );
};

export default SummaryPage;