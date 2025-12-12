
'use client';

import { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaShieldAlt } from 'react-icons/fa';

interface Admin {
    _id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
}

export default function AdminsPage() {
    const [admins, setAdmins] = useState<Admin[]>([]);
    const [loading, setLoading] = useState(true);
    const [showInviteModal, setShowInviteModal] = useState(false);

    // Invite Form State
    const [inviteEmail, setInviteEmail] = useState('');
    const [inviteName, setInviteName] = useState('');
    const [inviteLoading, setInviteLoading] = useState(false);
    const [inviteLink, setInviteLink] = useState('');
    const [inviteError, setInviteError] = useState('');

    useEffect(() => {
        fetchAdmins();
    }, []);

    const fetchAdmins = async () => {
        try {
            // We need an API endpoint to list admins. I haven't created one yet across my plan!
            // I'll create it in a separate tool call: app/api/admins/route.ts
            const res = await fetch('/api/admins');
            if (res.ok) {
                const data = await res.json();
                setAdmins(data.admins);
            }
        } catch (error) {
            console.error('Failed to fetch admins');
        } finally {
            setLoading(false);
        }
    };

    const handleInvite = async (e: React.FormEvent) => {
        e.preventDefault();
        setInviteLoading(true);
        setInviteError('');
        setInviteLink('');

        try {
            const res = await fetch('/api/admins/invite', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: inviteEmail, name: inviteName }),
            });
            const data = await res.json();
            if (res.ok) {
                setInviteLink(data.inviteUrl);
            } else {
                setInviteError(data.error || 'Failed to generate invite');
            }
        } catch (error) {
            setInviteError('Something went wrong');
        } finally {
            setInviteLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">Admins</h1>
                    <p className="text-gray-400 mt-1">Manage team members and permissions</p>
                </div>
                <button
                    onClick={() => setShowInviteModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors font-medium shadow-lg shadow-blue-500/20"
                >
                    <FaPlus size={14} />
                    Invite Admin
                </button>
            </div>

            <div className="bg-gray-900 border border-white/10 rounded-xl overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-white/5 border-b border-white/10 text-gray-400 text-sm uppercase tracking-wider">
                            <th className="px-6 py-4 font-medium">Name</th>
                            <th className="px-6 py-4 font-medium">Email</th>
                            <th className="px-6 py-4 font-medium">Role</th>
                            <th className="px-6 py-4 font-medium">Joined</th>
                            <th className="px-6 py-4 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {loading ? (
                            <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">Loading admins...</td></tr>
                        ) : admins.map((admin) => (
                            <tr key={admin._id} className="hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white">
                                            {admin.name.charAt(0)}
                                        </div>
                                        <span className="font-medium text-white">{admin.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-300">{admin.email}</td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                        <FaShieldAlt size={10} />
                                        {admin.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-400 text-sm">
                                    {new Date(admin.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4">
                                    <button className="text-gray-500 hover:text-red-400 transition-colors" title="Delete Admin">
                                        <FaTrash size={14} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Invite Modal */}
            {showInviteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="w-full max-w-md bg-gray-900 border border-white/10 rounded-2xl p-6 shadow-2xl relative">
                        <button
                            onClick={() => { setShowInviteModal(false); setInviteLink(''); setInviteError(''); }}
                            className="absolute top-4 right-4 text-gray-500 hover:text-white"
                        >
                            ✕
                        </button>

                        <h2 className="text-xl font-bold text-white mb-4">Invite New Admin</h2>

                        {!inviteLink ? (
                            <form onSubmit={handleInvite} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                                    <input
                                        type="text"
                                        value={inviteName}
                                        onChange={e => setInviteName(e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white focus:border-blue-500 outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                                    <input
                                        type="email"
                                        value={inviteEmail}
                                        onChange={e => setInviteEmail(e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white focus:border-blue-500 outline-none"
                                        required
                                    />
                                </div>
                                {inviteError && <p className="text-red-400 text-sm">{inviteError}</p>}
                                <button
                                    type="submit"
                                    disabled={inviteLoading}
                                    className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                                >
                                    {inviteLoading ? 'Generating Link...' : 'Generate Invite Link'}
                                </button>
                            </form>
                        ) : (
                            <div className="space-y-4">
                                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                                    <p className="text-green-400 text-sm font-medium mb-2">Invite link generated successfully!</p>
                                    <div className="bg-black/40 p-3 rounded border border-white/10 break-all text-xs text-gray-300 font-mono select-all">
                                        {inviteLink}
                                    </div>
                                </div>
                                <button
                                    onClick={() => { setShowInviteModal(false); setInviteLink(''); setInviteEmail(''); setInviteName(''); }}
                                    className="w-full py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
