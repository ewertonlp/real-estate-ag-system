"use client";

import { useState } from "react";
import LanguageSelector from "./language";
// import { useTheme } from '@/context/themeContext' // Importe o hook do tema
import { useTheme } from "next-themes";
import { SearchBox } from "../ui/searchBox";
import Link from "next/link";
import { agentList } from "@/mocks/team";
import Image from "next/image";
import { Bell, Mail, MailIcon, Moon, Sun } from "lucide-react";

export default function Header() {
  const { setTheme } = useTheme();
  const [selectedMode, setSelectedMode] = useState("dark");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const currentAgent = agentList[0];

  const handMode = () => {
    const html = document.getElementsByTagName("html");
    const currentMode = html[0].className;
    // const modeBtn = document.getElementById("btn-mode");

    if (currentMode === "dark") {
      html[0].className = "light";
      setSelectedMode("light");
      setTheme("light");
    } else {
      html[0].className = "dark";
      setSelectedMode("dark");
      setTheme("dark");
    }
  };

  return (
    <header className="lg:ml-64 top-0 right-0 bg-[var(--card)] dark:bg-[var(--card)] shadow-sm z-10">
      <div className="flex items-center justify-end px-10 h-16  ">
        <div className="">
          <SearchBox  />
        </div>
        <div className="flex items-center space-x-1 ml-2">
        
          {/* Botão de Tema */}
          <button
            onClick={handMode}
            id="btn-mode"
            className="p-2 rounded-lg hover:bg-[var(--hover)] dark:hover:bg-[var(--hover)] transition-colors cursor-pointer"
          >
            {selectedMode === "dark" ? (
              <Sun className="h-6 w-6 text-text" />
            ) : (
              <Moon className="h-6 w-6 text-text" />
            )}
          </button>

          {/* Seletor de Idioma */}
          <div className="relative">
            <LanguageSelector />
          </div>

          {/* Botão de Notificações */}
          <button
            onMouseEnter={() => setShowNotifications(true)}
            // onMouseLeave={() => setShowNotifications(false)}
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 relative hover:bg-[var(--hover)] dark:hover:bg-[var(--hover)] rounded-sm mr-4 cursor-pointer"
          >
            <Bell className="h-6 w-6 text-text dark:text-text" />
            <span className="absolute top-0 right-0 font-light bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
              3
            </span>
          </button>

          {/* Menu do Usuário */}
          <div className="relative">
            <button
            onMouseEnter={() => setShowUserMenu(true)}
            // onMouseLeave={() => setShowUserMenu(false)}
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-4 cursor-pointer"
            >
              <div className="h-8 w-8 border-[var(--primary)] rounded-full flex items-center justify-center text-white">
                <Image
                src={currentAgent.avatar[0].url}
                alt={currentAgent.name}
                className="object-cover rounded-full"
                fill
                />
              </div>
            </button>

            {showUserMenu && (
              <div
                className="absolute right-0 mt-2 w-48 bg-[var(--card)] dark:bg-[var(--card)] rounded-md shadow-lg py-2"
                onMouseLeave={() => setShowUserMenu(false)}
              >
                <div className="block px-4 py-2 text-sm hover:bg-[var(--hover)] dark:hover:bg-[var(--hover)]  border-b dark:border-[var(--hover)]">
                  <p className="font-medium text-text dark:text-text">
                    {currentAgent.name}
                  </p>
                  <p className="text-xs text-text dark:text-gray-400">
                    {currentAgent.email}
                  </p>
                </div>
                <Link
                  href="/dashboard/profile"
                  className="block px-4 py-2 text-sm text-text  hover:bg-[var(--hover)] dark:hover:bg-[var(--hover)] "
                >
                  My Profile
                </Link>
                <a
                  href="dashboard/settings"
                  className="block px-4 py-2 text-sm text-text  hover:bg-[var(--hover)] dark:hover:bg-[var(--hover)] "
                >
                  Settings
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-red-400 hover:bg-[var(--hover)] dark:hover:bg-[var(--hover)] "
                >
                  Exit
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Notificações Dropdown */}
      {showNotifications && (
        <div
          className="absolute right-4 mt-2 w-80 bg-[var(--card)] rounded-md shadow-lg py-2 cursor-pointer "
          onMouseEnter={() => setShowNotifications(true)}
          // onMouseLeave={() => setShowNotifications(false)}
        >
          <div className="block px-4 py-2 border-b border-[var(--border)]">
            <h3 className="text-sm font-medium text-text">Notificações</h3>
          </div>
          <div className="divide-y dark:divide-gray-500">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="px-4 py-3 hover:bg-[var(--background-color)] dark:hover:bg-hover"
              >
                <p className="text-sm text-text dark:text-text">
                  Novo lead cadastrado #{item}
                </p>
                <p className="text-xs text-text dark:text-text mt-1">
                  Há 2 horas
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
