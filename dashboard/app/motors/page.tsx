import { FaCar } from 'react-icons/fa';
import dbConnect from '@/lib/db';
import Vehicle from '@/models/Vehicle';
import DashboardChart from '@/components/DashboardChart';

export default async function MotorsDashboardHome() {
    await dbConnect();
    const vehicleCount = await Vehicle.countDocuments();

    // Calculate vehicles added this week
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    const addedThisWeek = await Vehicle.countDocuments({
        createdAt: { $gte: lastWeek }
    });

    const stats = [
        { label: 'Active Listings', value: vehicleCount.toString(), icon: FaCar, change: `+${addedThisWeek}` },
    ];

    // Fetch daily activity for the chart (last 7 days)
    const chartData = await Promise.all([...Array(7)].map(async (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - i));
        date.setHours(0, 0, 0, 0);

        const nextDate = new Date(date);
        nextDate.setDate(date.getDate() + 1);

        const count = await Vehicle.countDocuments({
            createdAt: { $gte: date, $lt: nextDate }
        });

        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        return { label: dayName, value: count };
    }));

    return (
        <div className="max-w-6xl mx-auto">
            <div className="mb-6 md:mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-white">Motors Dashboard</h1>
                <p className="text-sm md:text-base text-gray-400 mt-1">Manage your automotive empire</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-gray-900 border border-white/10 p-5 md:p-6 rounded-xl hover:border-blue-500/50 transition-colors group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-blue-500/10 text-blue-400 rounded-lg group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                <stat.icon size={20} />
                            </div>
                            <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20">
                                {stat.change} this week
                            </span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</h3>
                        <p className="text-gray-400 text-xs md:text-sm">{stat.label}</p>
                    </div>
                ))}
            </div>

            <DashboardChart
                data={chartData}
                title="7-Day Listing Activity"
                color="blue"
            />
        </div>
    );
}
