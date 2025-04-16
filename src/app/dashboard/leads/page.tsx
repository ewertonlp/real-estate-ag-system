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
import Link from "next/link";
import Loading from "@/app/components/ui/loading";


export default function Leads() {
  const [dataLeads, setDataLeads] = useState<Leads[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Leads[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDataLeads(leadsMock);
      setFilteredLeads(leadsMock);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleStatusFilter = (status: string | null) => {
    setSelectedStatus(status);
    if (!status) {
      setFilteredLeads(dataLeads);
    } else {
      const filtered = dataLeads.filter((lead) => lead.status === status);
      setFilteredLeads(filtered);
    }
  };
      
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

       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-6">
        <div 
          className={`p-4 shadow rounded-sm border-l-4 border-l-emerald-500 cursor-pointer transition-colors ${
            !selectedStatus ? 'bg-[var(--primary)]' : 'bg-[var(--card)]'
          } hover:bg-[var(--primary)]`}
          onClick={() => handleStatusFilter(null)}
        >
          <p className="text-text">All leads</p>
          <h2 className="text-xl font-bold">{dataLeads.length}</h2>
        </div>

        <div 
          className={`p-4 shadow rounded-sm border-l-4 border-l-blue-500 cursor-pointer transition-colors ${
            selectedStatus === 'New' ? 'bg-[var(--primary)]' : 'bg-[var(--card)]'
          } hover:bg-[var(--primary)]`}
          onClick={() => handleStatusFilter('New')}
        >
          <p className="text-text">New</p>
          <h2 className="text-xl font-bold">
            {dataLeads.filter((lead) => lead.status === "New").length}
          </h2>
        </div>

        <div 
          className={`p-4 shadow rounded-sm border-l-4 border-l-yellow-500 cursor-pointer transition-colors ${
            selectedStatus === 'Contacted' ? 'bg-[var(--primary)]' : 'bg-[var(--card)]'
          } hover:bg-[var(--primary)]`}
          onClick={() => handleStatusFilter('Contacted')}
        >
          <p className="text-text">Contacted</p>
          <h2 className="text-xl font-bold">
            {dataLeads.filter((lead) => lead.status === "Contacted").length}
          </h2>
        </div>

        <div 
          className={`p-4 shadow rounded-sm border-l-4 border-l-pink-500 cursor-pointer transition-colors ${
            selectedStatus === 'In Negotiation' ? 'bg-[var(--primary)]' : 'bg-[var(--card)]'
          } hover:bg-[var(--primary)]`}
          onClick={() => handleStatusFilter('In Negotiation')}
        >
          <p className="text-text">In Negotiation</p>
          <h2 className="text-xl font-bold">
            {dataLeads.filter((lead) => lead.status === "In Negotiation").length}
          </h2>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {filteredLeads.map((lead) => (
          <div key={lead.id} className="bg-[var(--card)] p-4 rounded-sm shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-[var(--text)]">{lead.name}</h3>
                <p className="text-sm text-text/90">{lead.interest}</p>
              </div>
              <span
                className={`px-2 py-1 text-xs font-semibold rounded-lg ${
                  lead.status === "New"
                    ? "bg-blue-100 text-blue-700"
                    : lead.status === "Contacted"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-pink-100 text-pink-700"
                }`}
              >
                {lead.status}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <Phone className="w-4 h-4 mr-2 text-blue-500" />
                <a href={`tel:${lead.phone}`} className="hover:text-blue-500">
                  {lead.phone}
                </a>
              </div>
              
              {lead.email && (
                <div className="flex items-center text-sm">
                  <Mail className="w-4 h-4 mr-2 text-red-500" />
                  <a href={`mailto:${lead.email}`} className="hover:text-red-500">
                    {lead.email}
                  </a>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center mt-4 pt-4 border-t border-[var(--border)]">
              <div className="flex space-x-2">
                <a
                  href={`https://wa.me/${lead.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-500 hover:text-green-600"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
                <Link href={`/dashboard/leads/${lead.id}`}>
                  <button className="text-text hover:text-[var(--hover)] cursor-pointer">
                    <Eye className="w-5 h-5" />
                  </button>
                </Link>
              </div>
              <span className="text-xs text-gray-500">
                {new Date(lead.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>


    
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
