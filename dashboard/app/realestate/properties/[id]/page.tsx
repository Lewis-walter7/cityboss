
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { FaArrowLeft, FaSave, FaPlus, FaTrash, FaImage } from 'react-icons/fa';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { UploadButton } from "@/utils/uploadthing";

export default function EditPropertyPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id;
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [images, setImages] = useState<string[]>([]);

    const [formData, setFormData] = useState({
        title: '',
        location: '',
        price: '',
        beds: 0,
        baths: 0,
        sqft: '',
        category: 'Mansion',
        description: '',
        features: [''],
        isFeatured: false
    });

    useEffect(() => {
        if (id) {
            fetchProperty();
        }
    }, [id]);

    const fetchProperty = async () => {
        try {
            const response = await fetch(`/api/properties/${id}`);
            const data = await response.json();
            if (response.ok) {
                setFormData({
                    title: data.title,
                    location: data.location,
                    price: data.price,
                    beds: data.beds,
                    baths: data.baths,
                    sqft: data.sqft,
                    category: data.category,
                    description: data.description,
                    features: data.features.length > 0 ? data.features : [''],
                    isFeatured: data.isFeatured || false
                });
                setImages(data.images || []);
            } else {
                toast.error(data.error || 'Failed to fetch property');
                router.push('/realestate/properties');
            }
        } catch (error) {
            console.error('Error fetching property:', error);
            toast.error('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? Number(value) : value
        }));
    };

    const handleFeatureChange = (index: number, value: string) => {
        const newFeatures = [...formData.features];
        newFeatures[index] = value;
        setFormData(prev => ({ ...prev, features: newFeatures }));
    };

    const addFeature = () => {
        setFormData(prev => ({ ...prev, features: [...prev.features, ''] }));
    };

    const removeFeature = (index: number) => {
        const newFeatures = formData.features.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, features: newFeatures }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (images.length === 0) {
            toast.error('Please upload at least one image');
            return;
        }

        setSaving(true);

        try {
            const response = await fetch(`/api/properties/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    images,
                    features: formData.features.filter(f => f.trim() !== '')
                }),
            });

            if (response.ok) {
                toast.success('Property updated successfully');
                router.push('/realestate/properties');
            } else {
                const data = await response.json();
                toast.error(data.error || 'Failed to update property');
            }
        } catch (error) {
            console.error('Error updating property:', error);
            toast.error('An error occurred');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/realestate/properties" className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-all">
                        <FaArrowLeft />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-white">Edit Property</h1>
                        <p className="text-gray-400 mt-1">Refining elite listing: {formData.title}</p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="bg-gray-900 border border-white/10 rounded-xl p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Property Title</label>
                            <input
                                required
                                name="title"
                                type="text"
                                placeholder="e.g. The Muthaiga Manor"
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-emerald-500/50 focus:outline-none transition-colors"
                                value={formData.title}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Category</label>
                            <select
                                name="category"
                                className="w-full bg-gray-900 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-emerald-500/50 focus:outline-none transition-colors"
                                value={formData.category}
                                onChange={handleInputChange}
                            >
                                <option value="Mansion" className="bg-gray-900">Mansion</option>
                                <option value="Beachfront Villa" className="bg-gray-900">Beachfront Villa</option>
                                <option value="Luxury Estate" className="bg-gray-900">Luxury Estate</option>
                                <option value="Contemporary" className="bg-gray-900">Contemporary</option>
                                <option value="Townhouse" className="bg-gray-900">Townhouse</option>
                                <option value="Penthouse" className="bg-gray-900">Penthouse</option>
                                <option value="Prime Land" className="bg-gray-900">Prime Land</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Location</label>
                            <input
                                required
                                name="location"
                                type="text"
                                placeholder="e.g. Muthaiga, Nairobi"
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-emerald-500/50 focus:outline-none transition-colors"
                                value={formData.location}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Price (KES/USD)</label>
                            <input
                                required
                                name="price"
                                type="text"
                                placeholder="e.g. KES 450,000,000"
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-emerald-500/50 focus:outline-none transition-colors"
                                value={formData.price}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {formData.category !== 'Prime Land' && (
                            <>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Bedrooms</label>
                                    <input
                                        name="beds"
                                        type="number"
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-emerald-500/50 focus:outline-none transition-colors"
                                        value={formData.beds}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Bathrooms</label>
                                    <input
                                        name="baths"
                                        type="number"
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-emerald-500/50 focus:outline-none transition-colors"
                                        value={formData.baths}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </>
                        )}
                        <div className={formData.category === 'Prime Land' ? "md:col-span-3 space-y-2" : "space-y-2"}>
                            <label className="text-sm font-medium text-gray-300">
                                {formData.category === 'Prime Land' ? 'Total Area (e.g. 5 Acres)' : 'Area (sqft)'}
                            </label>
                            <input
                                required
                                name="sqft"
                                type="text"
                                placeholder={formData.category === 'Prime Land' ? "e.g. 2.5 Acres" : "e.g. 12,000"}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-emerald-500/50 focus:outline-none transition-colors"
                                value={formData.sqft}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Description</label>
                        <textarea
                            required
                            name="description"
                            rows={4}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-emerald-500/50 focus:outline-none transition-colors resize-none"
                            placeholder="Describe the property's unique features..."
                            value={formData.description}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Visual Media */}
                    <div className="bg-gray-900 border border-white/10 rounded-xl p-8 space-y-6">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <FaImage className="text-emerald-500" />
                            Visual Media
                        </h2>

                        <div className="space-y-4">
                            <UploadButton
                                endpoint="propertyImage"
                                onClientUploadComplete={(res) => {
                                    const urls = res.map(file => file.url);
                                    setImages(prev => [...prev, ...urls]);
                                    toast.success('Images uploaded');
                                }}
                                onUploadError={(error: Error) => {
                                    toast.error(`Error: ${error.message}`);
                                }}
                            />

                            <div className="grid grid-cols-3 gap-4">
                                {images.map((url, index) => (
                                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-white/10 group">
                                        <img src={url} alt="" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => setImages(images.filter((_, i) => i !== index))}
                                            className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-red-400"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Features Component */}
                    <div className="bg-gray-900 border border-white/10 rounded-xl p-8 space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-white">Elite Features</h2>
                            <button
                                type="button"
                                onClick={addFeature}
                                className="p-2 text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-colors"
                            >
                                <FaPlus />
                            </button>
                        </div>

                        <div className="space-y-3">
                            {formData.features.map((feature, index) => (
                                <div key={index} className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="e.g. Infinity Pool"
                                        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-emerald-500/50 focus:outline-none transition-colors"
                                        value={feature}
                                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeFeature(index)}
                                        className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                                    >
                                        <FaTrash size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <Link href="/realestate/properties" className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-all font-medium">
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-600/50 text-white px-8 py-3 rounded-lg transition-all shadow-lg shadow-emerald-600/20 font-bold"
                    >
                        {saving ? 'Updating...' : (
                            <>
                                <FaSave />
                                <span>Save Changes</span>
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
