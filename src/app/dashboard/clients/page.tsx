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
      : clients.filter((clients) => clients.status === filterStatus);

  if (loading) return <Loading />;

  return (
    <div className="max-w-screen p-2 bg-[var(--background-color)]">
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

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-6">
        <div className="p-4 bg-[var(--card)] shadow rounded-sm">
          <p className="text-text">All clients</p>
          <h2 className="text-xl font-bold">{clients.length}</h2>
        </div>
        <div className="p-4 bg-[var(--card)] shadow rounded-sm">
          <p className="text-text">Interested</p>
          <h2 className="text-xl font-bold">
            {clients.filter((client) => client.status === "Interested").length}
          </h2>
        </div>
        <div className="p-4 bg-[var(--card)] shadow rounded-sm">
          <p className="text-text">In Negotiation</p>
          <h2 className="text-xl font-bold">
            {
              clients.filter((client) => client.status === "In Negotiation")
                .length
            }
          </h2>
        </div>
        <div className="p-4 bg-[var(--card)] shadow rounded-sm">
          <p className="text-text">Contract Signed</p>
          <h2 className="text-xl font-bold">
            {
              clients.filter((client) => client.status === "Contract Signed")
                .length
            }
          </h2>
        </div>
      </div>

      {/* Filter */}
      <div className="mb-4">
        <label className="text-text font-medium">Filter by status:</label>
        <select
          className="ml-2 p-2 border rounded bg-[var(--card)]"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Interested">Interested</option>
          <option value="In Negotiation">In Negotiation</option>
          <option value="Contract Signed">Contract Signed</option>
        </select>
      </div>

      <div className="bg-[var(--card)] shadow rounded-sm overflow-hidden mt-6">
        <table className="w-full table-auto">
          <thead className="bg-[var(--primary)] border-b border-[var(--border)]">
            <tr className="">
              <th className="px-4 py-3 text-left font-medium">Name</th>
              <th className="px-4 py-3 text-left font-medium">Contact</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map((client) => (
              <tr
                key={client.id}
                className="border-t border-[var(--border)] hover:bg-[var(--hover)] cursor-pointer"
              >
                <td className="px-4 py-3 text-text">{client.name}</td>
                <td className="px-4 py-3 flex gap-3">
                  <a
                    href={`https://wa.me/${client.phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="text-green-500 hover:text-green-600 w-5 h-5 cursor-pointer" />
                  </a>

                  <a href={`mailto:${client.email}`}>
                    <Mail className="text-red-500 hover:text-red-600 w-5 h-5 cursor-pointer" />
                  </a>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-lg ${
                      client.status === "Interested"
                        ? "bg-blue-100 text-blue-700"
                        : client.status === "In Negotiation"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {client.status}
                  </span>
                </td>
                <td className="px-4 py-3 flex">
                  <Link href={`/dashboard/clients/${client.id}`}>
                    <button className="text-text hover:text-[var(--border)] cursor-pointer">
                      <Eye size={20} />
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
