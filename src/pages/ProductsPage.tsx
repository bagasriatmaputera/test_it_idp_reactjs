import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

interface Product {
    id: number;
    nama_barang: string;
    kode_barang: string;
    harga: number;
    jumlah_stok: number;
}

const ProductPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [searchName, setSearchName] = useState<string>('');
    const [formData, setFormData] = useState({
        nama_barang: '',
        harga: '',
        jumlah_stok: ''
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Gagal memuat data produk:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddProduct = () => {
        setShowForm(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/products', formData);
            alert('Produk berhasil ditambahkan!');
            setShowForm(false);
            setFormData({ nama_barang: '', harga: '', jumlah_stok: '' });
            fetchProducts();
        } catch (error) {
            alert('Gagal menambahkan produk.');
            console.error(error);
        }
    };

    const filteredProducts = products.filter((prod) =>
        prod.nama_barang.toLowerCase().includes(searchName.toLowerCase())
    );

    if (loading) {
        return <div className="text-center text-gray-500 p-10">Memuat data produk...</div>;
    }

    return (
        <>
            <Navbar />
        <div className="min-h-screen bg-gray-100 p-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Daftar Produk</h1>
                <button
                    onClick={handleAddProduct}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition"
                >
                    + Tambah Produk
                </button>
            </div>

            <div className="bg-white shadow-md rounded-2xl p-4 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                <input
                    type="text"
                    placeholder="Cari berdasarkan nama produk..."
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    className="border p-2 rounded w-full md:w-1/2"
                />
            </div>

            {showForm && (
                <div className="bg-white shadow-md rounded-2xl p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Tambah Produk Baru</h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="text" name="nama_barang" placeholder="Nama Produk" value={formData.nama_barang} onChange={handleChange} className="border p-2 rounded" required />
                        <input type="number" name="harga" placeholder="Harga" value={formData.harga} onChange={handleChange} className="border p-2 rounded" required />
                        <input type="number" name="jumlah_stok" placeholder="Jumlah Stok" value={formData.jumlah_stok} onChange={handleChange} className="border p-2 rounded" required />
                        <div className="flex gap-3 md:col-span-2">
                            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">Simpan</button>
                            <button type="button" onClick={() => setShowForm(false)} className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg">Batal</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="overflow-x-auto bg-white shadow-md rounded-2xl">
                <table className="w-full border-collapse text-sm text-left">
                    <thead className="bg-gray-200 text-gray-700">
                        <tr>
                            <th className="p-3 border">Nama Barang</th>
                            <th className="p-3 border">Kode Barang</th>
                            <th className="p-3 border">Harga</th>
                            <th className="p-3 border">Jumlah Stok</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((prod) => (
                                <tr key={prod.id} className="hover:bg-gray-100">
                                    <td className="p-3 border">{prod.nama_barang}</td>
                                    <td className="p-3 border">{prod.kode_barang}</td>
                                    <td className="p-3 border">Rp {prod.harga.toLocaleString('id-ID')}</td>
                                    <td className="p-3 border">{prod.jumlah_stok}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="text-center p-4 text-gray-500">
                                    Tidak ada produk ditemukan.
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

export default ProductPage;