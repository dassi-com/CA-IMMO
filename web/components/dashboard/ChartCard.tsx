
'use client';

import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface ChartCardProps {
  title: string;
  icon: any;
  children?: React.ReactNode;
  delay?: number;
}

export default function ChartCard({ title, icon: Icon, children, delay = 0 }: ChartCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-red-50 rounded-lg">
          <Icon className="w-5 h-5 text-red-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="h-80">{children}</div>
    </motion.div>
  );
}

export { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer };