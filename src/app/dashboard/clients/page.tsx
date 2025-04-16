"use client";
import { useEffect, useState } from "react";
import { Mail, MessageCircle, Eye, UserPlus, Users } from "lucide-react";
import { Button } from "@/app/components/ui/button";
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
import { clients as mockClients } from "@/mocks/clients";
import Loading from "@/app/components/ui/loading";
import { Clients } from "@/types";

export default function Clientes() {
  const [filterStatus, setFilterStatus] = useState("All");
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState<Clients[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setClients(mockClients);
      setLoading(false);
    };
    fetchData();
  }, []);

  const filteredClients =
    filterStatus === "All"
      ? clients
      : clients.filter((client) => client.status === filterStatus);

  if (loading) return <Loading />;

  return (
    <div className="max-w-screen p-2 bg-[var(--background-color)] min-h-screen">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center border-b border-[var(--border)] py-4">
        <div className="flex items-center">
          <Users size={24} />
          <h1 className="ml-2 text-2xl font-bold">Clients</h1>
        </div>
        <div>
          <Link href="/dashboard/team/newClient">
            <Button variant="solid" size="md">
              <UserPlus size={18} className="mr-2" />
              Add New Client
            </Button>
          </Link>
        </div>
      </div>

      {/* Cards de Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-6">
        {["All", "Interested", "In Negotiation", "Contract Signed"].map((status) => (
          <div
            key={status}
            className={`p-4 rounded-sm border-l-4 cursor-pointer transition-colors shadow-sm ${
              filterStatus === status ? 'bg-[var(--primary)]' : 'bg-[var(--card)] hover:bg-[var(--primary)]'
            } ${
              status === "All" ? "border-l-[var(--primary)]" :
              status === "Interested" ? "border-l-blue-500" :
              status === "In Negotiation" ? "border-l-yellow-500" : "border-l-green-500"
            }`}
            onClick={() => setFilterStatus(status)}
          >
            <p className="text-sm text-text">{status}</p>
            <h2 className="text-xl font-bold">
              {status === "All" 
                ? clients.length 
                : clients.filter(c => c.status === status).length}
            </h2>
          </div>
        ))}
      </div>

      {/* Cards de Clientes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClients.map((client) => (
          <div key={client.id} className="bg-[var(--card)] p-4 rounded-sm shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-[var(--text)]">{client.name}</h3>
                {/* <p className="text-sm text-text/90">{client.}</p> */}
              </div>
              <span
                className={`px-2 py-1 text-xs font-semibold rounded-lg ${
                  client.status === "Interested" ? "bg-blue-100 text-blue-700" :
                  client.status === "In Negotiation" ? "bg-yellow-100 text-yellow-700" :
                  "bg-green-100 text-green-700"
                }`}
              >
                {client.status}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <MessageCircle className="w-4 h-4 mr-2 text-green-500" />
                <a 
                  href={`https://wa.me/${client.phone}`} 
                  className="hover:text-green-600"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {client.phone}
                </a>
              </div>
              
              {client.email && (
                <div className="flex items-center text-sm">
                  <Mail className="w-4 h-4 mr-2 text-red-500" />
                  <a 
                    href={`mailto:${client.email}`} 
                    className="hover:text-red-600"
                  >
                    {client.email}
                  </a>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center mt-4 pt-4 border-t border-[var(--border)]">
              <Link href={`/dashboard/clients/${client.id}`}>
                <button className="text-text hover:text-[var(--hover)] flex items-center gap-1">
                  <Eye className="w-5 h-5" />
                  <span className="text-sm">View Details</span>
                </button>
              </Link>
              <span className="text-xs text-text/70">
                {new Date(client.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Paginação */}
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