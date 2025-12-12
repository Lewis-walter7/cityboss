
import { FaCar, FaChartLine, FaWrench } from 'react-icons/fa';
import dbConnect from '@/lib/db';
import Vehicle from '@/models/Vehicle';

export default async function MotorsDashboardHome() {
    await dbConnect();
    const vehicleCount = await Vehicle.countDocuments();

    const stats = [
        { label: 'Active Listings', value: vehicleCount.toString(), icon: FaCar, change: '+12' },
        { label: 'Dealerships', value: '8', icon: FaWrench, change: '+1' },
        { label: 'Total Views', value: '1.2k', icon: FaChartLine, change: '+15%' },
    ];

    return (
        <div className="max-w-6xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white">Motors Dashboard</h1>
                <p className="text-gray-400 mt-1">Manage your automotive empire</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-gray-900 border border-white/10 p-6 rounded-xl hover:border-blue-500/50 transition-colors group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-blue-500/10 text-blue-400 rounded-lg group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                <stat.icon size={20} />
                            </div>
                            <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20">
                                {stat.change} this week
                            </span>
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                        <p className="text-gray-400 text-sm">{stat.label}</p>
                    </div>
                ))}
            </div>

            <div className="bg-gray-900 border border-white/10 rounded-xl p-6 h-64 flex items-center justify-center text-gray-500">
                Motors Activity Chart
            </div>
        </div>
    );
}
