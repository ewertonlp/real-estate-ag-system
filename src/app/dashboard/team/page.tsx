"use client"
import { useEffect, useState } from "react";
import { Mail, MessageCircle, Eye, Contact, UserPlus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";

import { agentList } from "@/mocks/team";
import { Agents } from "../../../types";
import Loading from "@/app/components/ui/loading";
import { DataTable } from "@/app/components/tables/dataTable";

export default function Corretores() {
  const [agents, setAgents] = useState<Agents[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulando um carregamento
    const timer = setTimeout(() => {
      setAgents(agentList);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="max-w-screen p-2 bg-[var(--background-color)]">
      <div className="flex justify-between items-center border-b border-gray-300 py-4">
        <div className="flex items-center">
          <Contact size={26} />
          <h1 className="ml-2 text-2xl font-bold">Real Estate Agents</h1>
        </div>
        <Link href="/dashboard/team/newRealtor">
          <Button variant="solid" size="md">
            <UserPlus size={22} className="mr-2" />
            <span className="text-[15px]">Add Agent</span>
          </Button>
        </Link>
      </div>

      <DataTable
        data={agents}
        rowKey={(agent) => agent.id}
        itemsPerPage={10}
        columns={[
          { header: "Nome", accessor: "name", className: "text-normal text-text", sortable: true, searchable: true },
          { header: "License", accessor: "license", className: "text-normal text-text", sortable: true, searchable: true },
          { header: "Email", accessor: "email", className: "text-normal text-text", sortable: true, searchable: true },
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
                  className="text-green-500 hover:text-green-600"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
                <a
                  href={`mailto:${row.email}`}
                  className="text-blue-500 hover:text-blue-600"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            ),
          },
          {
            header: "Ação",
            accessor: "id",
            render: (id) => (
              <Link href={`/dashboard/team/${id}`}>
                <button
                  className="text-text hover:text-[var(--border)]"
                  aria-label="Ver corretor"
                >
                  <Eye className="w-5 h-5" />
                </button>
              </Link>
            ),
          },
        ]}
      />
    </div>
  );
}
