import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
    const location = useLocation();

    const menuItems = [
        { path: "/", label: "Dashboard" },
        { path: "/customers", label: "Customers" },
        { path: "/products", label: "Products" },
        { path: "/orders", label: "Orders" },
        { path: "/summary", label: "Summary" },
    ];

    return (
        <nav className="bg-blue-700 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                <h1 className="text-lg font-semibold tracking-wide">🧾 Order Management</h1>

                <ul className="flex gap-6">
                    {menuItems.map((item) => (
                        <li key={item.path}>
                            <Link
                                to={item.path}
                                className={`${location.pathname === item.path
                                        ? "border-b-2 border-yellow-300 font-semibold"
                                        : "hover:text-yellow-300"
                                    } transition duration-200`}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
