"use client";

import { useEffect, useState } from "react";
import { MessageCircle, Phone, Mail, MoveDown, Eye } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/app/components/ui/pagination";
import { leadsMock } from "@/mocks/leads";
import { Leads } from "@/types";
import { DataTable } from "@/app/components/tables/dataTable";
import Link from "next/link";
import Loading from "@/app/components/ui/loading";


export default function Leads() {
  const [leads, setLeads] = useState<Leads[]>([]);
  const [loading, setLoading] = useState(true);

 

      useEffect(() => {
          // Simulando um carregamento
          const timer = setTimeout(() => {
            setLeads(leadsMock);
            setLoading(false);
          }, 500);
          return () => clearTimeout(timer);
        }, []);
      
 if (loading) return <Loading />;

  return (
    <div className="p-2 bg-[var(--background-color)] min-h-screen">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center border-b border-[var(--border)] py-4">
        <div className="flex items-center">
          <MoveDown size={24} />
          <h1 className="ml-2 text-2xl font-bold text-[var(--text)]">Leads</h1>
        </div>
      </div>

      <DataTable
        data={leads}
        rowKey={(agent) => agent.id}
        itemsPerPage={10}
        columns={[
          { header: "Name", accessor: "name", className: "text-normal text-text", sortable: true, searchable: true },
          { header: "Phone", accessor: "phone", className: "text-normal text-text", sortable: true, searchable: true },
          { header: "Interest", accessor: "interest", className: "text-normal text-text", sortable: true, searchable: true },
          { header: "Status", accessor:"status", className: "text-normal text-text", sortable: true, searchable: true,
            render: (_, row) => (
              <div className="flex gap-3 items-center">
              <span
              className={`px-3 py-1 text-xs font-semibold rounded-lg ${
                row.status === "New"
                  ? " bg-blue-100 text-blue-700"
                  : row.status === "In Negotiation"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {row.status}
            </span>
            </div>
            )
          },
          {
            header: "Contato",
            accessor: "phone",
            searchable: true,
            render: (_, row) => (
              <div className="flex gap-3 items-center">
                <a
                  href={`https://wa.me/${row.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-500 hover:text-green-600 cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
                
              </div>
            ),
          },
          {
            header: "Action",
            accessor: "id",
            render: (id) => (
              <Link href={`/dashboard/leads/${id}`}>
                <button
                  className="text-text hover:text-[var(--border)] cursor-pointer"
                  aria-label="Ver corretor"
                >
                  <Eye className="w-5 h-5" />
                </button>
              </Link>
            ),
          },
        ]}
      />

    
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
    </div>
  );
}
