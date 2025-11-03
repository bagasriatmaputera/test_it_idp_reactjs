import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

interface Customer {
    id: number;
    nama_customer: string;
    alamat: string;
    kodepos: string;
    no_handphone: string;
    email: string;
    tanggal_bergabung: string;
}

const CustomersPage: React.FC = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [searchName, setSearchName] = useState<string>('');
    const [filterDate, setFilterDate] = useState<string>('');
    const [formData, setFormData] = useState({
        nama_customer: '',
        alamat: '',
        kodepos: '',
        no_handphone: '',
        email: '',
        tanggal_bergabung: ''
    });

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/customers');
            setCustomers(response.data);
        } catch (error) {
            console.error('Gagal memuat data pelanggan:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddCustomer = () => {
        setShowForm(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/customers', formData);
            alert('Customer berhasil ditambahkan!');
            setShowForm(false);
            setFormData({ nama_customer: '', alamat: '', kodepos: '', no_handphone: '', email: '', tanggal_bergabung: '' });
            fetchCustomers();
        } catch (error) {
            alert('Gagal menambahkan customer.');
            console.error(error);
        }
    };

    const filteredCustomers = customers.filter((cust) => {
        const matchName = cust.nama_customer.toLowerCase().includes(searchName.toLowerCase());
        const matchDate = filterDate ? cust.tanggal_bergabung.startsWith(filterDate) : true;
        return matchName && matchDate;
    });

    if (loading) {
        return <div className="text-center text-gray-500 p-10">Memuat data pelanggan...</div>;
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 p-10">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Daftar Pelanggan</h1>
                    <button
                        onClick={handleAddCustomer}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition"
                    >
                        + Tambah Customer
                    </button>
                </div>

                <div className="bg-white shadow-md rounded-2xl p-4 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <input
                        type="text"
                        placeholder="Cari berdasarkan nama customer..."
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                        className="border p-2 rounded w-full md:w-1/2"
                    />
                    <div className="flex items-center gap-2">
                        <label className="text-gray-600">Filter tanggal bergabung:</label>
                        <input
                            type="date"
                            value={filterDate}
                            onChange={(e) => setFilterDate(e.target.value)}
                            className="border p-2 rounded"
                        />
                    </div>
                </div>

                {showForm && (
                    <div className="bg-white shadow-md rounded-2xl p-6 mb-6">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Tambah Customer Baru</h2>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input type="text" name="nama_customer" placeholder="Nama Customer" value={formData.nama_customer} onChange={handleChange} className="border p-2 rounded" required />
                            <input type="text" name="kodepos" placeholder="Kode Pos" value={formData.kodepos} onChange={handleChange} className="border p-2 rounded" required />
                            <input type="text" name="no_handphone" placeholder="No Handphone" value={formData.no_handphone} onChange={handleChange} className="border p-2 rounded" required />
                            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="border p-2 rounded" required />
                            <textarea name="alamat" placeholder="Alamat" value={formData.alamat} onChange={handleChange} className="border p-2 rounded md:col-span-2" required />
                            <input type="date" name="tanggal_bergabung" value={formData.tanggal_bergabung} onChange={handleChange} className="border p-2 rounded" required />
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
                                <th className="p-3 border">Nama Customer</th>
                                <th className="p-3 border">Alamat</th>
                                <th className="p-3 border">Kodepos</th>
                                <th className="p-3 border">No Handphone</th>
                                <th className="p-3 border">Email</th>
                                <th className="p-3 border">Tanggal Bergabung</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCustomers.length > 0 ? (
                                filteredCustomers.map((cust) => (
                                    <tr key={cust.id} className="hover:bg-gray-100">
                                        <td className="p-3 border">{cust.nama_customer}</td>
                                        <td className="p-3 border">{cust.alamat}</td>
                                        <td className="p-3 border">{cust.kodepos}</td>
                                        <td className="p-3 border">{cust.no_handphone}</td>
                                        <td className="p-3 border">{cust.email}</td>
                                        <td className="p-3 border">{new Date(cust.tanggal_bergabung).toLocaleDateString('id-ID')}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="text-center p-4 text-gray-500">
                                        Tidak ada data pelanggan yang sesuai.
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

export default CustomersPage;
