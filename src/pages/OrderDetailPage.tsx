import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

interface OrderDetail {
    id: number;
    no_order: string;
    kode_barang: string;
    nama_barang: string;
    quantity: number;
    harga_per_unit: number;
    total_harga: number;
}

interface Product {
    id: number;
    nama_barang: string;
}

interface Customer {
    id: number;
    nama_customer: string;
}

const OrderDetailPage: React.FC = () => {
    const [orders, setOrders] = useState<OrderDetail[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [products, setProducts] = useState<Product[]>([]);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        product_id: '',
        quantity: '',
        customer_id: ''
    });

    useEffect(() => {
        fetchOrders();
        fetchProducts();
        fetchCustomers();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/orders');
            setOrders(response.data);
        } catch (error) {
            console.error('Gagal memuat data order detail:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Gagal memuat data produk:', error);
        }
    };

    const fetchCustomers = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/customers');
            setCustomers(response.data);
        } catch (error) {
            console.error('Gagal memuat data pelanggan:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/orders', formData);
            alert('Transaksi berhasil ditambahkan!');
            setFormData({ product_id: '', quantity: '', customer_id: '' });
            setShowForm(false);
            fetchOrders();
        } catch (error) {
            alert('Gagal menambahkan transaksi.');
            console.error(error);
        }
    };

    if (loading) {
        return <div className="text-center text-gray-500 p-10">Memuat data order detail...</div>;
    }

    return (
        <>
            <Navbar />
        <div className="min-h-screen bg-gray-100 p-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Daftar Order Detail</h1>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition"
                >
                    + Tambah Transaksi
                </button>
            </div>

            {showForm && (
                <div className="bg-white shadow-md rounded-2xl p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Tambah Transaksi Baru</h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700">Pilih Produk</label>
                            <select
                                name="product_id"
                                value={formData.product_id}
                                onChange={handleChange}
                                className="border p-2 rounded w-full"
                                required
                            >
                                <option value="">-- Pilih Produk --</option>
                                {products.map((product) => (
                                    <option key={product.id} value={product.id}>
                                        {product.nama_barang}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700">Pilih Customer</label>
                            <select
                                name="customer_id"
                                value={formData.customer_id}
                                onChange={handleChange}
                                className="border p-2 rounded w-full"
                                required
                            >
                                <option value="">-- Pilih Customer --</option>
                                {customers.map((cust) => (
                                    <option key={cust.id} value={cust.id}>
                                        {cust.nama_customer}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700">Quantity</label>
                            <input
                                type="number"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                                placeholder="Masukkan jumlah"
                                className="border p-2 rounded w-full"
                                required
                            />
                        </div>

                        <div className="flex gap-3 md:col-span-2">
                            <button
                                type="submit"
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                            >
                                Simpan
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
                            >
                                Batal
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="overflow-x-auto bg-white shadow-md rounded-2xl">
                <table className="w-full border-collapse text-sm text-left">
                    <thead className="bg-gray-200 text-gray-700">
                        <tr>
                            <th className="p-3 border">No Order</th>
                            <th className="p-3 border">Kode Barang</th>
                            <th className="p-3 border">Nama Barang</th>
                            <th className="p-3 border">Quantity</th>
                            <th className="p-3 border">Harga per Unit</th>
                            <th className="p-3 border">Total Harga</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-100">
                                    <td className="p-3 border">{order.no_order}</td>
                                    <td className="p-3 border">{order.kode_barang}</td>
                                    <td className="p-3 border">{order.nama_barang}</td>
                                    <td className="p-3 border">{order.quantity}</td>
                                    <td className="p-3 border">Rp {order.harga_per_unit.toLocaleString('id-ID')}</td>
                                    <td className="p-3 border font-semibold text-green-600">
                                        Rp {order.total_harga.toLocaleString('id-ID')}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="text-center p-4 text-gray-500">
                                    Tidak ada data order detail.
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

export default OrderDetailPage;
