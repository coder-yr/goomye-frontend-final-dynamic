"use client";

import React, { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";

const MegaMenu: React.FC = () => {
  const [activeMain, setActiveMain] = useState<string | null>(null);
  const [activeSub, setActiveSub] = useState<string | null>(null);
  const [menuData, setMenuData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:8001/api/mega-menu")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch menu");
        return res.json();
      })
      .then((data) => {
        setMenuData(data.menu || {});
        setLoading(false);
      })
      .catch((err) => {
        setMenuData({});
        setError("Failed to load menu");
        setLoading(false);
      });
  }, []);

  return (
    <div
      className="relative w-full bg-gray-50 text-gray-900 font-[Inter]"
      onMouseLeave={() => {
        setActiveMain(null);
        setActiveSub(null);
      }}
    >
      {/* ===== Mega Menu Content: Sidebar + Panel ===== */}
      <div className="flex">
        <div className="w-64 bg-white border-r">
          <ul className="flex flex-col">
            {loading ? (
              <li className="px-5 py-3 text-gray-400">Loading menu...</li>
            ) : error ? (
              <li className="px-5 py-3 text-red-400">{error}</li>
            ) : menuData && Object.keys(menuData).length > 0 ? (
              Object.keys(menuData).map((main) => (
                <li
                  key={main}
                  className={`flex items-center justify-between px-5 py-3 cursor-pointer hover:bg-gray-100 ${
                    activeMain === main ? "bg-gray-100" : ""
                  }`}
                  onMouseEnter={() => {
                    setActiveMain(main);
                    setActiveSub(null);
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-gray-700 font-medium">{main}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </li>
              ))
            ) : (
              <li className="px-5 py-3 text-gray-400">No categories found.</li>
            )}
          </ul>
        </div>

        {/* ===== Mega Menu Panel (Right Side) ===== */}
        {activeMain && (
          <div
            className="w-[900px] bg-white shadow-lg border rounded-r-xl grid grid-cols-3 p-8 gap-6 z-50"
          >
            {/* ==== Column 1: Subcategories ==== */}
            <div className="border-r pr-6">
              <h3 className="font-semibold text-gray-800 mb-3 text-lg">
                {activeMain}
              </h3>
              <ul className="space-y-2">
                {Object.keys(menuData[activeMain]).map((sub) => (
                  <li
                    key={sub}
                    className={`cursor-pointer px-3 py-1 rounded-md hover:bg-blue-50 hover:text-blue-600 ${
                      activeSub === sub ? "bg-blue-100 text-blue-700" : ""
                    }`}
                    onMouseEnter={() => setActiveSub(sub)}
                  >
                    {sub}
                  </li>
                ))}
              </ul>
            </div>

            {/* ==== Column 2-3: Subcategory Items ==== */}
            <div className="col-span-2 pl-6">
              {activeSub ? (
                <div>
                  <h4 className="font-semibold text-lg mb-4 text-gray-800">
                    {activeSub}
                  </h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {menuData[activeMain][activeSub].map((item: string) => (
                      <li
                        key={item}
                        className="text-gray-700 hover:text-blue-600 cursor-pointer"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 italic">
                  Hover over a subcategory to view items
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MegaMenu;
