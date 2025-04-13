"use client";
import { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import { Plus, TrendingUp, Building, CircleDollarSign} from "lucide-react";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/app/components/ui/pagination";
import Loading from "@/app/components/ui/loading";
import { salesMock } from "@/mocks/sales";
import { Sales } from "@/types";
import { Card } from "@/app/components/ui/card";

export default function Vendas() {
  const [filtroStatus, setFiltroStatus] = useState<string>("All");
  const [salesData, setSalesData] = useState<Sales[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSales = () => {
      try {
        // Convertendo para o tipo correto
        const typedSales = salesMock as Sales[];
        setSalesData(typedSales);
      } catch (error) {
        console.error("Error loading sales:", error);
        setSalesData([]);
      }
      setLoading(false);
    };

    const timer = setTimeout(loadSales, 800);
    return () => clearTimeout(timer);
  }, []);

  const salesFiltereds =
    filtroStatus === "All"
      ? salesData
      : salesData.filter((sale) => sale.status === filtroStatus);

  if (loading) return <Loading />;

  return (
    <div className="max-w-screen p-2 bg-[var(--background-color)]">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center border-b border-[var(--border)] py-4">
        <div className="flex items-center">
          <TrendingUp size={24} />
          <h1 className="ml-2 text-2xl font-bold">Sales</h1>
        </div>
        <div>
          <Link href="/dashboard/team/newClient">
            <Button variant="solid" size="md">
              <Plus size={18} className="mr-2" />
              Register New Sale
            </Button>
          </Link>
        </div>
      </div>

      {/* Resumo das Vendas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        <Card
          title="Total Sales"
          value={
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-[var(--primary)]" />${" "}
              {salesData
                .reduce((sum, sale) => sum + sale.value, 0)
                .toLocaleString()}
            </div>
          }
        />

        <Card
          title="Properties Sold"
          value={
            <div className="flex items-center gap-2">
              
              <Building className="h-5 w-5 text-[var(--primary)]" />
              {/* Ícone de imóveis */}
              <span className="text-xl font-bold">
                {salesData.length.toLocaleString()}
              </span>
            </div>
          }
        />
        <Card
        title="Total Commissions"
        value={
          <div className="flex items-center gap-2">
            <CircleDollarSign className="h-5 w-5 text-[var(--primary)]"/>
            <span className="text-xl font-bold">
            ${" "}
            {salesData
              .reduce((sum, sale) => sum + sale.commission, 0)
              .toLocaleString()}
            </span>
          </div>
        }
        />
      </div>

      {/* Filtros */}
      <div className="mb-4">
        <label className="text-text font-medium">Filter by Status:</label>
        <select
          className="ml-2 p-2 border rounded bg-[var(--card)]"
          value={filtroStatus}
          onChange={(e) => setFiltroStatus(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="In progress">In progress</option>
          <option value="Pending">Pending</option>
          <option value="Canceled">Canceled</option>
        </select>
      </div>

      {/* Lista de Vendas */}
      <div className="bg-[var(--card)] shadow-sm rounded-sm overflow-hidden">
        <table className="w-full table-auto">
          <thead className="bg-[var(--primary)] border-b border-[var(--border)] ">
            <tr>
              <th className="p-3 text-left font-medium">Buyer</th>
              <th className="p-3 text-left font-medium">Address</th>
              <th className="p-3 text-left font-medium">Value</th>
              <th className="p-3 text-left font-medium">Agent</th>
              <th className="p-3 text-left font-medium">Status</th>
              <th className="p-3 text-left font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {salesFiltereds.map((sale) => (
              <tr
                key={sale.id}
                className="border-b border-[var(--border)] text-sm hover:bg-[var(--hover)] cursor-pointer"
              >
                <td className="p-3">{sale.buyer}</td>
                <td className="p-3">{sale.address}</td>
                <td className="p-3">$ {sale.value.toLocaleString()}</td>
                <td className="p-3">{sale.agent}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-lg ${
                      sale.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : sale.status === "Canceled"
                        ? "bg-red-100 text-red-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {sale.status}
                  </span>
                </td>
                <td className="p-3">{new Date(sale.date).toDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {salesFiltereds.length > 0 && (
        <div className="bg-[var(--card)] shadow rounded-sm overflow-hidden mt-6 py-2">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}

export const BuildingIcon = () => {
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-building-icon lucide-building"
  >
    <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
    <path d="M9 22v-4h6v4" />
    <path d="M8 6h.01" />
    <path d="M16 6h.01" />
    <path d="M12 6h.01" />
    <path d="M12 10h.01" />
    <path d="M12 14h.01" />
    <path d="M16 10h.01" />
    <path d="M16 14h.01" />
    <path d="M8 10h.01" />
    <path d="M8 14h.01" />
  </svg>;
};
