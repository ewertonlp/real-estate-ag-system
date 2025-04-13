"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Settings2,
  LayoutDashboard,
  Home,
  TrendingUp,
  MoveDown,
  Users,
  Contact,
} from "lucide-react";
import { Button } from "../ui/button";

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Verifica se a rota está ativa (incluindo subrotas)
  const isActive = (href: string) => pathname.startsWith(href);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setIsOpen(!mobile);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Fecha o sidebar ao clicar em um link no mobile
  const handleNavigation = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  // Dados de navegação para mapeamento
  const navItems = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard />,
      exact: true,
    },
    {
      href: "/dashboard/properties",
      label: "Properties",
      icon: <Home />,
    },
    {
      href: "/dashboard/sales",
      label: "Sales",
      icon: <TrendingUp />,
    },
    {
      href: "/dashboard/leads",
      label: "Leads",
      icon: <MoveDown />,
    },
    {
      href: "/dashboard/clients",
      label: "Clients",
      icon: <Users />,
    },
    {
      href: "/dashboard/team",
      label: "Team",
      icon: <Contact />,
    },
  ];

  return (
    <>
      {/* Botão Hamburguer para mobile */}
      <Button
        title="menu"
        className={`fixed top-3 left-3 z-[200] p-2 md:hidden${
          isOpen ? "hidden" : "block"
        }`}
        onClick={() => setIsOpen(true)}
      >
        <Menu className="h-6 w-6 text-text" />
      </Button>

      {/* Overlay para mobile */}
      {isMobile && (
        <div
          className={`fixed inset-0 bg-black/50 z-[250] transition-opacity lg:hidden ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen w-64 bg-[var(--card)] shadow-sm z-[300] transition-transform md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Botão Fechar para mobile */}
        <Button
          className="absolute top-4 right-4 p-2 md:hidden"
           aria-label="Abrir menu de navegação"
          onClick={() => setIsOpen(false)}
        >
          <X className="h-6 w-6 text-text" />
        </Button>

        {/* Conteúdo do Sidebar (permanece igual) */}
        <div className="p-6">
          <h1 className="text-2xl font-medium text-text">Imobiliária</h1>
        </div>

        <nav className="mt-6 px-4 flex-1 font-light">
          <div className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleNavigation}
                className={`flex items-center space-x-3 rounded-md px-4 py-3 transition-all ${
                  (item.exact ? pathname === item.href : isActive(item.href))
                    ? "bg-[var(--primary)] text-[var(--text)] font-[200]"
                    : "text-text hover:bg-[var(--hover)]"
                }`}
              >
                {item.icon}
                <span className="font-[200]">{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 border-t border-[var(--border)] p-4">
          <Link
            href="/dashboard/settings"
            onClick={handleNavigation}
            className={`flex items-center space-x-3 rounded-md px-4 py-3 transition-all ${
              isActive("/dashboard/settings")
                ? "bg-[var(--primary)] text-[var(--text)] font-[200]"
                : "text-text hover:bg-[var(--hover)]"
            }`}
          >
            <Settings2 />
            <span className="font-extralight">Settings</span>
          </Link>
        </div>
      </div>
    </>
  );
}


