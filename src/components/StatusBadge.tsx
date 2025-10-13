import React from "react";

interface StatusBadgeProps {
  status: string;
}

const statusColors: Record<string, string> = {
  "Confirmed": "bg-green-100 text-green-800 border-green-300",
  "Pre-order": "bg-yellow-100 text-yellow-800 border-yellow-300",
  "In transit": "bg-blue-100 text-blue-800 border-blue-300",
  "Cancelled": "bg-red-100 text-red-800 border-red-300",
  "Created": "bg-gray-100 text-gray-800 border-gray-300",
  "Delivered": "bg-teal-100 text-teal-800 border-teal-300",
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const colorClass = statusColors[status] || "bg-gray-100 text-gray-800 border-gray-300";
  return (
    <span className={`inline-block px-3 py-1 rounded-full border text-xs font-semibold ${colorClass}`}>{status}</span>
  );
};
