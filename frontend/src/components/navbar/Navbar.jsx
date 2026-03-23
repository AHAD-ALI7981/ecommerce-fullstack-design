import React from "react";
import { CountryDropdown } from "./Dropdown.flag ";
import LanguageDropdown from "./Dropdown.languages";
import { Menu, LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../stores/auth.store";


export default function Navbar() {
  const { authUser } = useAuthStore();

  return (
    <div className=" hidden md:flex w-full h-auto  justify-center items-center bg-base-100 shadow-sm mb-0.5">
      <div className="navbar  w-full max-w-[1180px] min-h-auto mx-0 px-0">
        <div className="flex-1">
          <div className="flex items-center space-x-4">
            <button>
              <Menu />
            </button>
            <Link to={"/category/AllCategory"} className="link link-hover">All category</Link>
            <a className="link link-hover">Hot offers</a>
            <a className="link link-hover">Gift boxes</a>
            <a className="link link-hover">Projects</a>
            <a className="hidden lg:block link link-hover">Menu item</a>

            <ul className="hidden lg:block menu menu-horizontal bg-none p-0 ">
              <li>
                <summary className="p-0.5 text-[16px]">Help</summary>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 py-0">
            <div className="flex gap-4 items-center">
              {/* Language Dropdown */}
              <LanguageDropdown />
              {/* Currency Dropdown */}
              <CountryDropdown />
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}
