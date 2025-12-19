
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { UploadButton } from "@/utils/uploadthing";
import imageCompression from 'browser-image-compression';
import { FaCloudUploadAlt, FaImages, FaMagic, FaCheckCircle, FaSpinner, FaArrowRight, FaArrowLeft, FaCar, FaCogs, FaList, FaTachometerAlt, FaTrash } from 'react-icons/fa';
import { generateReactHelpers } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import clsx from 'clsx';

// Generate typed helpers for Uploadthing
const { useUploadThing } = generateReactHelpers<OurFileRouter>();

interface VehicleFormProps {
    initialData?: any;
    isEditMode?: boolean;
}

export default function VehicleForm({ initialData, isEditMode = false }: VehicleFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [savingDraft, setSavingDraft] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const isDraft = initialData?.status === 'draft';

    // Image State
    const [files, setFiles] = useState<File[]>([]);
    const [optimizedFiles, setOptimizedFiles] = useState<File[]>([]);
    const [existingImages, setExistingImages] = useState<string[]>(initialData?.images || []);
    const [isOptimizing, setIsOptimizing] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        make: '',
        vehicleModel: '',
        year: new Date().getFullYear(),
        price: '',
        mileage: '',
        bodyType: 'Sedan',
        transmission: 'Automatic',
        fuelType: 'Petrol',
        drivetrain: 'FWD',
        engineCapacity: '',
        exteriorColor: '',
        interiorColor: '',
        engine: '',
        horsepower: '',
        description: '',
        features: '',
        tradeInAccepted: false,
        isFeatured: false,
        isAvailable: true,
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                make: initialData.make || '',
                vehicleModel: initialData.vehicleModel || '',
                year: initialData.year || new Date().getFullYear(),
                price: initialData.price || '',
                mileage: initialData.mileage || '',
                bodyType: initialData.bodyType || 'Sedan',
                transmission: initialData.transmission || 'Automatic',
                fuelType: initialData.fuelType || 'Petrol',
                drivetrain: initialData.drivetrain || 'FWD',
                engineCapacity: initialData.engineCapacity || '',
                exteriorColor: initialData.exteriorColor || '',
                interiorColor: initialData.interiorColor || '',
                engine: initialData.engine || '',
                horsepower: initialData.horsepower || '',
                description: initialData.description || '',
                features: Array.isArray(initialData.features) ? initialData.features.join('\n') : initialData.features || '',
                tradeInAccepted: initialData.tradeInAccepted || false,
                isFeatured: initialData.isFeatured || false,
                isAvailable: initialData.isAvailable !== undefined ? initialData.isAvailable : true,
            });
            setExistingImages(initialData.images || []);
        }
    }, [initialData]);

    // Clipboard paste handler
    const handlePaste = useCallback((e: ClipboardEvent) => {
        // Only handle paste when on Media step (Step 4)
        if (currentStep !== 4) return;

        const clipboardItems = e.clipboardData?.items;
        if (!clipboardItems) return;

        const imageFiles: File[] = [];

        // Process clipboard items
        for (let i = 0; i < clipboardItems.length; i++) {
            const item = clipboardItems[i];

            // Check if the item is an image
            if (item.type.startsWith('image/')) {
                const file = item.getAsFile();
                if (file) {
                    // Create a new File with a better name
                    const timestamp = Date.now();
                    const extension = file.type.split('/')[1] || 'png';
                    const newFile = new File(
                        [file],
                        `pasted-image-${timestamp}.${extension}`,
                        { type: file.type }
                    );
                    imageFiles.push(newFile);
                }
            }
        }

        // Add pasted images to files state
        if (imageFiles.length > 0) {
            setFiles(prev => [...prev, ...imageFiles]);

            // Show feedback
            const message = imageFiles.length === 1
                ? '1 image pasted successfully!'
                : `${imageFiles.length} images pasted successfully!`;

            // Create a temporary toast notification
            const toast = document.createElement('div');
            toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 font-medium animate-fade-in';
            toast.textContent = message;
            document.body.appendChild(toast);

            setTimeout(() => {
                toast.style.opacity = '0';
                toast.style.transition = 'opacity 0.3s';
                setTimeout(() => toast.remove(), 300);
            }, 2000);
        }
    }, [currentStep]);

    // Add paste event listener
    useEffect(() => {
        document.addEventListener('paste', handlePaste);
        return () => document.removeEventListener('paste', handlePaste);
    }, [handlePaste]);

    const { startUpload } = useUploadThing("vehicleImage");

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFiles(prev => [...prev, ...Array.from(e.target.files!)]);
            // setOptimizedFiles([]); // Don't reset, just append? Logic implies optimizing new batch.
            // Simplified: Just replace or append. Let's append for better UX.
        }
    };

    const removeNewFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
        if (optimizedFiles.length > index) {
            setOptimizedFiles(prev => prev.filter((_, i) => i !== index));
        }
    };

    const removeExistingImage = (index: number) => {
        setExistingImages(prev => prev.filter((_, i) => i !== index));
    };

    const needsOptimization = files.some(file => file.size > 60 * 1024);

    const optimizeImages = async () => {
        setIsOptimizing(true);
        try {
            const compressedFiles = await Promise.all(
                files.map(async (file) => {
                    if (file.size <= 60 * 1024) return file;
                    const options = { maxSizeMB: 0.4, maxWidthOrHeight: 1920, useWebWorker: true };
                    try {
                        const compressedFile = await imageCompression(file, options);
                        return compressedFile.size < file.size ? compressedFile : file;
                    } catch (error) {
                        return file;
                    }
                })
            );
            setOptimizedFiles(compressedFiles);
        } catch (error) {
            console.error("Optimization failed", error);
        } finally {
            setIsOptimizing(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent, saveAs: 'draft' | 'published' = 'published') => {
        e.preventDefault();

        if (saveAs === 'draft') {
            setSavingDraft(true);
        } else {
            setLoading(true);
        }

        try {
            // For published, validate minimum images
            const totalImages = existingImages.length + files.length;
            if (saveAs === 'published' && totalImages < 4) {
                alert(`Please add at least 4 images before publishing. You currently have ${totalImages}.`);
                return;
            }

            let uploadedUrls: string[] = [...existingImages];
            const filesToUpload = optimizedFiles.length === files.length ? optimizedFiles : files;

            if (filesToUpload.length > 0) {
                const res = await startUpload(filesToUpload);
                if (res) {
                    uploadedUrls = [...uploadedUrls, ...res.map(f => f.ufsUrl)];
                } else {
                    alert("Image upload failed. Please try again.");
                    return;
                }
            }

            const vehicleData = {
                ...formData,
                price: formData.price ? Number(formData.price) : undefined,
                mileage: formData.mileage ? Number(formData.mileage) : undefined,
                engineCapacity: formData.engineCapacity ? Number(formData.engineCapacity) : undefined,
                horsepower: formData.horsepower ? Number(formData.horsepower) : undefined,
                features: formData.features.split('\n').map(f => f.trim()).filter(Boolean),
                images: uploadedUrls,
                status: saveAs,
            };

            const url = isEditMode ? `/api/vehicles/${initialData._id}` : '/api/vehicles';
            const method = isEditMode ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(vehicleData),
            });

            if (response.ok) {
                if (saveAs === 'draft') {
                    // Show success message and stay on page for drafts
                    const toast = document.createElement('div');
                    toast.className = 'fixed top-4 right-4 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 font-medium';
                    toast.textContent = 'Draft saved successfully!';
                    document.body.appendChild(toast);
                    setTimeout(() => toast.remove(), 2000);

                    // Optionally redirect to vehicles list
                    setTimeout(() => {
                        router.push('/motors/vehicles');
                        router.refresh();
                    }, 1500);
                } else {
                    router.push('/motors/vehicles');
                    router.refresh();
                }
            } else {
                const errorData = await response.json();
                alert(errorData.error || "Failed to save vehicle listing. Please try again.");
            }

        } catch (error) {
            console.error("Submission failed", error);
            alert("An error occurred. Please check your connection and try again.");
        } finally {
            setLoading(false);
            setSavingDraft(false);
        }
    };

    const handleSaveDraft = (e: React.FormEvent) => handleSubmit(e, 'draft');
    const handlePublish = (e: React.FormEvent) => handleSubmit(e, 'published');

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    const steps = [
        { id: 1, name: 'Essentials', icon: FaCar },
        { id: 2, name: 'Performance', icon: FaTachometerAlt },
        { id: 3, name: 'Features', icon: FaList },
        { id: 4, name: 'Media', icon: FaImages },
    ];

    const inputClasses = "w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors";
    const selectClasses = "w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none";
    const totalImagesCount = existingImages.length + files.length;

    // Only disable if loading, OR if creating new/publishing draft and less than 4 images
    const isSubmitDisabled = loading || (!isEditMode && totalImagesCount < 4) || (isDraft && totalImagesCount < 4);

    return (
        <form onSubmit={handlePublish} className="bg-gray-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-8 relative min-h-[500px]">

            {/* Draft Indicator */}
            {isDraft && (
                <div className="absolute top-4 right-4 bg-yellow-500/20 border border-yellow-500/50 text-yellow-300 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 z-10">
                    <FaSpinner className="w-4 h-4" />
                    DRAFT
                </div>
            )}

            {/* Step Progress UI (Simplified for component) */}
            <div className="mb-8">
                <div className="flex items-center justify-between relative max-w-3xl mx-auto">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-800 rounded-full -z-10"></div>
                    <div
                        className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-600 rounded-full -z-10 transition-all duration-500"
                        style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                    ></div>
                    {steps.map((step) => (
                        <div key={step.id} className="flex flex-col items-center gap-2 bg-gray-950 px-2 cursor-default">
                            <div className={clsx(
                                "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300",
                                currentStep >= step.id
                                    ? "bg-blue-600 border-blue-600 text-white"
                                    : "bg-gray-900 border-gray-700 text-gray-500"
                            )}>
                                <step.icon className="w-4 h-4" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Step 1: Essentials */}
            <div className={clsx("space-y-6 transition-all duration-300", currentStep === 1 ? "block opacity-100" : "hidden opacity-0 absolute top-0 left-0 w-full pointer-events-none")}>
                <h2 className="text-xl font-semibold text-white mb-6 border-b border-white/10 pb-4">Essential Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Make *</label>
                        <input type="text" required className={inputClasses}
                            value={formData.make} onChange={e => setFormData({ ...formData, make: e.target.value })} placeholder="e.g. Toyota" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Model *</label>
                        <input type="text" required className={inputClasses}
                            value={formData.vehicleModel} onChange={e => setFormData({ ...formData, vehicleModel: e.target.value })} placeholder="e.g. Land Cruiser" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Year *</label>
                        <input type="number" required className={inputClasses}
                            value={formData.year} onChange={e => setFormData({ ...formData, year: Number(e.target.value) })} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Price (KES) *</label>
                        <input type="number" required className={inputClasses}
                            value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} placeholder="e.g. 4500000" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Mileage (km) *</label>
                        <input type="number" required className={inputClasses}
                            value={formData.mileage} onChange={e => setFormData({ ...formData, mileage: e.target.value })} />
                    </div>

                    <div className="md:col-span-2 pt-4">
                        <h3 className="text-sm font-medium text-gray-300 mb-4">Availability & Status</h3>
                        <div className="flex flex-wrap gap-6">
                            <label className="flex items-center cursor-pointer p-3 rounded-lg border border-white/10 bg-black/20 hover:bg-black/40 transition-colors">
                                <input type="checkbox" className="w-5 h-5 rounded border-gray-600 text-blue-600 bg-gray-700"
                                    checked={formData.isAvailable} onChange={e => setFormData({ ...formData, isAvailable: e.target.checked })} />
                                <span className="ml-3 text-white">Available for Sale</span>
                            </label>
                            <label className="flex items-center cursor-pointer p-3 rounded-lg border border-white/10 bg-black/20 hover:bg-black/40 transition-colors">
                                <input type="checkbox" className="w-5 h-5 rounded border-gray-600 text-yellow-600 bg-gray-700"
                                    checked={formData.isFeatured} onChange={e => setFormData({ ...formData, isFeatured: e.target.checked })} />
                                <span className="ml-3 text-white">Featured Listing</span>
                            </label>
                            <label className="flex items-center cursor-pointer p-3 rounded-lg border border-white/10 bg-black/20 hover:bg-black/40 transition-colors">
                                <input type="checkbox" className="w-5 h-5 rounded border-gray-600 text-emerald-600 bg-gray-700"
                                    checked={formData.tradeInAccepted} onChange={e => setFormData({ ...formData, tradeInAccepted: e.target.checked })} />
                                <span className="ml-3 text-white">Trade-in Accepted</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Step 2: Performance */}
            <div className={clsx("space-y-6 transition-all duration-300", currentStep === 2 ? "block opacity-100" : "hidden opacity-0 absolute top-0 left-0 w-full pointer-events-none")}>
                <h2 className="text-xl font-semibold text-white mb-6 border-b border-white/10 pb-4">Engine & Performance</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Engine Capacity (CC)</label>
                        <input type="number" className={inputClasses}
                            value={formData.engineCapacity} onChange={e => setFormData({ ...formData, engineCapacity: e.target.value })} placeholder="e.g. 2800" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Engine Details</label>
                        <input type="text" className={inputClasses}
                            value={formData.engine} onChange={e => setFormData({ ...formData, engine: e.target.value })} placeholder="e.g. Diesel Engine" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Transmission *</label>
                        <select className={selectClasses}
                            value={formData.transmission} onChange={e => setFormData({ ...formData, transmission: e.target.value })}>
                            {['Automatic', 'Manual', 'CVT', 'Dual Clutch'].map(t => <option key={t} value={t} className="bg-gray-900">{t}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Fuel Type *</label>
                        <select className={selectClasses}
                            value={formData.fuelType} onChange={e => setFormData({ ...formData, fuelType: e.target.value })}>
                            {['Petrol', 'Diesel', 'Electric', 'Hybrid', 'Plug-in Hybrid', 'Gasoline'].map(t => <option key={t} value={t} className="bg-gray-900">{t}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Drivetrain</label>
                        <select className={selectClasses}
                            value={formData.drivetrain} onChange={e => setFormData({ ...formData, drivetrain: e.target.value })}>
                            {['FWD', 'RWD', 'AWD', '4WD'].map(t => <option key={t} value={t} className="bg-gray-900">{t}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Horsepower</label>
                        <input type="number" className={inputClasses}
                            value={formData.horsepower} onChange={e => setFormData({ ...formData, horsepower: e.target.value })} placeholder="e.g. 174" />
                    </div>
                </div>
            </div>

            {/* Step 3: Features & Specs */}
            <div className={clsx("space-y-6 transition-all duration-300", currentStep === 3 ? "block opacity-100" : "hidden opacity-0 absolute top-0 left-0 w-full pointer-events-none")}>
                <h2 className="text-xl font-semibold text-white mb-6 border-b border-white/10 pb-4">Features & Appearance</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Body Type *</label>
                        <select className={selectClasses}
                            value={formData.bodyType} onChange={e => setFormData({ ...formData, bodyType: e.target.value })}>
                            {['Sedan', 'SUV', '4x4', 'Luxury', 'Coupe', 'Truck', 'Convertible', 'Hatchback', 'Wagon'].map(t => <option key={t} value={t} className="bg-gray-900">{t}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Exterior Color</label>
                        <input type="text" className={inputClasses}
                            value={formData.exteriorColor} onChange={e => setFormData({ ...formData, exteriorColor: e.target.value })} placeholder="e.g. Pearl White" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Interior Color</label>
                        <input type="text" className={inputClasses}
                            value={formData.interiorColor} onChange={e => setFormData({ ...formData, interiorColor: e.target.value })} placeholder="e.g. Beige Leather" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Additional Features (One per line)</label>
                    <div className="p-4 bg-gray-900 rounded-xl border border-white/10">
                        <textarea
                            className="w-full bg-transparent border-0 text-white focus:ring-0 h-48 resize-none text-sm leading-relaxed"
                            value={formData.features}
                            onChange={e => setFormData({ ...formData, features: e.target.value })}
                            placeholder={"- Power Steering\n- Sunroof\n- Cruise Control\n- Leather Upholstery\n- ..."}
                        />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Enter features list manually. Press Enter for new line.</p>
                </div>
            </div>

            {/* Step 4: Media */}
            <div className={clsx("space-y-6 transition-all duration-300", currentStep === 4 ? "block opacity-100" : "hidden opacity-0 absolute top-0 left-0 w-full pointer-events-none")}>
                <h2 className="text-xl font-semibold text-white mb-6 border-b border-white/10 pb-4">Media & Description</h2>

                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                    <textarea className="w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors h-32 resize-none"
                        value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Detailed description of the vehicle condition and history..." />
                </div>

                <div className="bg-black/20 border border-dashed border-white/10 rounded-xl p-8 text-center hover:bg-black/30 transition-colors cursor-pointer relative">
                    <input type="file" multiple accept="image/*" onChange={handleFileSelect} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    <div className="flex flex-col items-center pointer-events-none">
                        <FaCloudUploadAlt className="w-12 h-12 text-blue-500 mb-4" />
                        <span className="text-xl font-bold text-white mb-2">Upload Vehicle Images</span>
                        <span className="text-sm text-gray-400">Drag & drop, click to browse, or paste (Ctrl+V)</span>
                        <span className="text-xs text-gray-500 mt-1">JPG, PNG, WebP supported</span>
                        {files.length > 0 && <div className="mt-4 text-blue-400 text-sm font-bold bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20">{files.length} new images selected</div>}
                    </div>
                </div>

                {existingImages.length > 0 && (
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-400">Existing Images</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {existingImages.map((url, idx) => (
                                <div key={idx} className="relative group rounded-lg overflow-hidden h-24 border border-white/10">
                                    <img src={url} alt="Vehicle" className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => removeExistingImage(idx)}
                                        className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <FaTrash className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Display New Files Preview */}
                {files.length > 0 && (
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-400">New Images ({files.length})</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {files.map((file, idx) => (
                                <div key={idx} className="relative group rounded-lg overflow-hidden h-24 border border-blue-500/30 bg-blue-500/5">
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={file.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeNewFile(idx)}
                                        className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <FaTrash className="w-3 h-3" />
                                    </button>
                                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-2 py-1 text-xs text-white truncate">
                                        {file.name}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Optimization Check */}
                {files.length > 0 && needsOptimization && (
                    <div className="flex items-center justify-between bg-yellow-500/10 p-4 rounded-xl border border-yellow-500/20">
                        <div className="flex items-center">
                            <FaMagic className="text-yellow-500 mr-3" />
                            <div className="text-left">
                                <p className="text-sm font-bold text-white">Large images detected</p>
                                <p className="text-xs text-gray-300">Optimize them for better mobile performance.</p>
                            </div>
                        </div>
                        {optimizedFiles.length > 0 ? (
                            <span className="flex items-center text-green-400 text-sm font-bold bg-green-500/10 px-3 py-1.5 rounded-lg border border-green-500/20"><FaCheckCircle className="mr-2" /> Optimized</span>
                        ) : (
                            <button type="button" onClick={optimizeImages} disabled={isOptimizing} className="bg-yellow-500 text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-yellow-400 flex items-center transition-colors">
                                {isOptimizing && <FaSpinner className="animate-spin mr-2" />} Optimize Images
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-12 pt-6 border-t border-white/10 relative z-10">
                <div>
                    {currentStep > 1 && (
                        <button type="button" onClick={prevStep} className="flex items-center text-gray-400 hover:text-white transition-colors font-medium">
                            <FaArrowLeft className="mr-2" /> Back
                        </button>
                    )}
                </div>

                <div>
                    {currentStep < 4 ? (
                        <button type="button" onClick={nextStep} className="flex items-center bg-white text-black px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors shadow-lg hover:shadow-white/10">
                            Next Step <FaArrowRight className="ml-2" />
                        </button>
                    ) : (
                        <div className="flex gap-3 items-end">
                            {/* Save as Draft Button */}
                            <button
                                type="button"
                                onClick={handleSaveDraft}
                                disabled={savingDraft || loading}
                                className="flex items-center px-6 py-3 rounded-xl font-bold transition-all border-2 border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {savingDraft ? <><FaSpinner className="animate-spin mr-2" /> Saving Draft...</> : 'Save as Draft'}
                            </button>

                            {/* Publish/Save Button */}
                            <div className="flex flex-col items-end">
                                <button
                                    type="submit"
                                    disabled={isSubmitDisabled}
                                    className={clsx(
                                        "flex items-center px-8 py-3 rounded-xl font-bold transition-all shadow-lg",
                                        isSubmitDisabled
                                            ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                                            : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 hover:shadow-blue-500/25"
                                    )}
                                >
                                    {loading ? <><FaSpinner className="animate-spin mr-2" /> Processing...</> : (isDraft ? 'Publish Listing' : isEditMode ? 'Save Changes' : 'Create Listing')}
                                </button>
                                {isSubmitDisabled && !loading && (
                                    <p className="text-xs text-red-400 mt-2 font-medium">Total images must be at least 4 to publish</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </form>
    );
}
