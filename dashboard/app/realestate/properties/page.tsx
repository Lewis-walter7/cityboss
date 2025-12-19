
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaPlus, FaSearch, FaHome, FaMapMarkerAlt, FaBed, FaBath, FaEdit, FaTrash, FaExternalLinkAlt } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

export default function PropertiesListPage() {
    const [properties, setProperties] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        try {
            const response = await fetch('/api/properties');
            const data = await response.json();
            if (response.ok) {
                setProperties(data);
            } else {
                toast.error(data.error || 'Failed to fetch properties');
            }
        } catch (error) {
            console.error('Error fetching properties:', error);
            toast.error('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this property?')) return;

        try {
            const response = await fetch(`/api/properties/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                toast.success('Property deleted successfully');
                fetchProperties();
            } else {
                const data = await response.json();
                toast.error(data.error || 'Failed to delete property');
            }
        } catch (error) {
            console.error('Error deleting property:', error);
            toast.error('An error occurred');
        }
    };

    const filteredProperties = properties.filter(property =>
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Properties</h1>
                    <p className="text-gray-400 mt-1">Manage your Kenyan luxury estate portfolio</p>
                </div>
                <Link
                    href="/realestate/properties/add"
                    className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-lg transition-all shadow-lg shadow-emerald-600/20 font-medium"
                >
                    <FaPlus size={14} />
                    <span>Add Property</span>
                </Link>
            </div>

            <div className="bg-gray-900 border border-white/10 rounded-xl overflow-hidden shadow-xl">
                {/* Filters/Search */}
                <div className="p-4 border-b border-white/10 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-96">
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search properties..."
                            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:border-emerald-500/50 focus:outline-none transition-colors"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white/5 text-gray-400 text-xs uppercase tracking-wider">
                                <th className="px-6 py-4 font-semibold">Listing</th>
                                <th className="px-6 py-4 font-semibold">Location</th>
                                <th className="px-6 py-4 font-semibold">Category</th>
                                <th className="px-6 py-4 font-semibold">Price</th>
                                <th className="px-6 py-4 font-semibold">Details</th>
                                <th className="px-6 py-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                                            <span>Loading properties...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredProperties.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                        No properties found.
                                    </td>
                                </tr>
                            ) : (
                                filteredProperties.map((property) => (
                                    <tr key={property._id} className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-lg bg-gray-800 overflow-hidden shrink-0 border border-white/5">
                                                    {property.images?.[0] ? (
                                                        <img src={property.images[0]} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-600">
                                                            <FaHome size={20} />
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors uppercase tracking-tight">{property.title}</div>
                                                    <div className="text-xs text-gray-500 mt-1 capitalize">{property.category}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                                <FaMapMarkerAlt className="text-emerald-500/50" size={12} />
                                                {property.location}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-xs font-medium text-gray-300 bg-white/5 px-2.5 py-1 rounded-md border border-white/10 uppercase tracking-widest leading-none">
                                                {property.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-bold text-emerald-400 font-mono tracking-tighter">
                                                {property.price}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4 text-xs text-gray-500">
                                                <div className="flex items-center gap-1.5">
                                                    <FaBed className="text-emerald-500/30" size={14} />
                                                    {property.beds > 0 ? property.beds : 'N/A'}
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <FaBath className="text-emerald-500/30" size={14} />
                                                    {property.baths > 0 ? property.baths : 'N/A'}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/realestate/properties/${property._id}`}
                                                    className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                                    title="Edit Property"
                                                >
                                                    <FaEdit size={16} />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(property._id)}
                                                    className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                                    title="Delete Property"
                                                >
                                                    <FaTrash size={16} />
                                                </button>
                                                <a
                                                    href={`http://localhost:3000/properties/${property._id}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-colors"
                                                    title="View on Site"
                                                >
                                                    <FaExternalLinkAlt size={14} />
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
