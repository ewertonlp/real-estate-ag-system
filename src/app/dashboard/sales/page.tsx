"use client";
import { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import { Plus, TrendingUp,  } from "lucide-react";
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

export default function Vendas() {
  const [filtroStatus, setFiltroStatus] = useState<string>("All");
  const [salesData, setSalesData] = useState<Sales[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSales = () => {
      try {
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

  const handleStatusFilter = (status: string) => {
    setFiltroStatus(status);
  };

  const salesFiltereds =
    filtroStatus === "All"
      ? salesData
      : salesData.filter((sale) => sale.status === filtroStatus);

  if (loading) return <Loading />;

  return (
    <div className="max-w-screen p-2 bg-[var(--background-color)] min-h-screen">
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

      {/* Cards de Status */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 my-6">
        {["All", "Completed", "In progress", "Pending", "Canceled"].map((status) => (
          <div
            key={status}
            className={`p-4 rounded-sm shadow border-l-4 cursor-pointer transition-colors ${
              filtroStatus === status ? 'bg-[var(--primary)]' : 'bg-[var(--card)]'
            } ${
              status === "All" ? "border-l-[var(--primary)]" :
              status === "Completed" ? "border-l-green-500" :
              status === "In progress" ? "border-l-blue-500" :
              status === "Pending" ? "border-l-yellow-500" : "border-l-red-500"
            }`}
            onClick={() => handleStatusFilter(status)}
          >
            <p className="text-sm text-text">{status}</p>
            <h2 className="text-xl font-bold">
              {status === "All" 
                ? salesData.length 
                : salesData.filter(s => s.status === status).length}
            </h2>
          </div>
        ))}
      </div>

      {/* Cards de Vendas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {salesFiltereds.map((sale) => (
          <div key={sale.id} className="bg-[var(--card)] p-4 rounded-sm shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-[var(--text)]">{sale.buyer}</h3>
                <p className="text-sm text-text/90">{sale.address}</p>
              </div>
              <span
                className={`px-2 py-1 text-xs font-semibold rounded-lg ${
                  sale.status === "Completed" ? "bg-green-100 text-green-700" :
                  sale.status === "Canceled" ? "bg-red-100 text-red-700" :
                  sale.status === "In progress" ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {sale.status}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-text/70">Value:</span>
                <span className="font-medium">$ {sale.value.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-text/70">Agent:</span>
                <span className="font-medium">{sale.agent}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-text/70">Date:</span>
                <span className="text-text/90">
                  {new Date(sale.date).toLocaleDateString('en-US', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                  })}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-[var(--border)]">
              <div className="flex justify-between items-center text-sm">
                <span className="text-text/70">Commission:</span>
                <span className="font-medium text-[var(--primary)]">
                  $ {sale.commission.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Paginação */}
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