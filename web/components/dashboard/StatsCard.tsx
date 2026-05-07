
'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: any;
  trend?: number;
  trendLabel?: string;
  color: string;
  delay?: number;
}

export default function StatsCard({ title, value, icon: Icon, trend, trendLabel, color, delay = 0 }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
    >
      <div className="relative z-10 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${color} bg-opacity-10`}>
            <Icon className={`w-6 h-6 text-${color.split(' ')[1]}`} />
          </div>
          {trend !== undefined && (
            <div className={`flex items-center gap-1 text-sm ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {trend >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              <span className="font-semibold">{Math.abs(trend)}%</span>
            </div>
          )}
        </div>
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
        <p className="text-sm text-gray-600 mt-1">{title}</p>
        {trendLabel && <p className="text-xs text-gray-400 mt-2">{trendLabel}</p>}
      </div>
      <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${color} opacity-10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500`} />
    </motion.div>
  );
}