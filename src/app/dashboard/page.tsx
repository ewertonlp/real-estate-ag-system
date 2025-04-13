// app/page.tsx - Página principal (Home)
"use client";
import {
  LayoutDashboard,
  Home,
  Users,
  TrendingUp,
  MoveDown,
} from "lucide-react";
import { useState } from "react";
import MontlyCharts from "../charts/sales/montlySales";
import SalesVsTargetChart from "../charts/sales/salesVsTarget";
import SalesPerAgentChart from "../charts/sales/salesPerAgent";

type CardType = "properties" | "tenants" | "leads" | "clients" | "contracts";

const data = [
  {
    type: "properties",
    label: "Properties",
    value: 525,
    icon: Home,
  },
  {
    type: "sales",
    label: "Sales",
    value: 107,
    icon: TrendingUp,
  },
  {
    type: "leads",
    label: "Leads",
    value: 324,
    icon: MoveDown,
  },
  {
    type: "clients",
    label: "Clients",
    value: 2080,
    icon: Users,
  },
];

export default function HomePage() {
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);

  // Função para alternar seleção
  const toggleSelection = (card: CardType) => {
    setSelectedCard((prev) => (prev === card ? null : card));
  };

  return (
    <div className="max-w-screen p-2 bg-[var(--background-color)]">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center border-b border-[var(--border)] py-4">
        <div className="flex items-center">
          <LayoutDashboard size={24} />
          <h1 className="ml-2 text-2xl font-bold">Dashboard</h1>
        </div>
        {/* <div>
          <Link href="/dashboard/properties/new" passHref>
            <Button variant="solid" size="md">
              <Plus size={18} className="mr-2" />
              Add New Propertie
            </Button>
          </Link>
        </div> */}
      </div>
      {/* Métricas Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {data.map((card) => (
          <div
            key={card.type}
            onClick={() => toggleSelection(card.type as CardType)}
            className={`p-4 rounded-sm transition-all cursor-pointer shadow mt-6
              ${
                selectedCard === card.type
                  ? "bg-[var(--primary)] text-white"
                  : "bg-[var(--card)] text-text hover:bg-[var(--secondary)]"
              }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3
                  className={`text-lg ${
                    selectedCard === card.type ? "text-white" : "text-text"
                  }`}
                >
                  {card.label}
                </h3>
              </div>
            </div>
            <div className="flex items-center justify-start mt-3">
              <card.icon
                className={`h-6 w-6 ${
                  selectedCard === card.type
                    ? "text-white"
                    : "text-[var(--primary)]"
                }`}
              />
              <p
                className={`text-xl font-bold ml-2 ${
                  selectedCard === card.type ? "text-white" : "text-text"
                }`}
              >
                {card.value}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Gráfico Principal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
        <div className="bg-[var(--card)] dark:bg-[var(--card)] px-4 py-8 rounded-sm">
          <h2 className="text-lg font-semibold text-text mb-4">Total Sales</h2>
          <div className="h-120 bg-[var(--background-color)] rounded-sm p-2 flex items-center justify-center">
            <SalesVsTargetChart />
          </div>
        </div>
        <div className="bg-[var(--card)] dark:bg-[var(--card)] px-4 py-8 rounded-sm ">
          <h2 className="text-lg font-semibold text-text mb-4">
            Monthly Sales
          </h2>
          <div className="h-120 bg-[var(--background-color)] rounded-sm p-2 flex items-center justify-center">
            <MontlyCharts />
          </div>
        </div>
      </div>
      {/* Lista Recente */}
      <div className="bg-[var(--card)] dark:bg-[var(--card)] p-4 rounded-sm px-4 py-8 mt-6">
        <h2 className="text-lg font-semibold text-text mb-4">
          Realtor Efficiency
        </h2>
        <div className="h-120 bg-[var(--background-color)] rounded-sm p-2 flex items-center justify-center">
          <SalesPerAgentChart />

          {/* Repetir outros itens... */}
        </div>
      </div>
    </div>
  );
}
