"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Leads } from "@/types";
import { Edit, Mail, MessageCircle, MoveLeft, Trash2 } from "lucide-react";
import { leadsMock } from "@/mocks/leads";
import Loading from "@/app/components/ui/loading";

export default function LeadDetails() {
  const router = useRouter();
  const params = useParams();
  const leadId = (params.id);
  const [lead, setLead] = useState<Leads| null>(null);

  useEffect(() => {
    const found = leadsMock.find((c) => c.id === leadId);
    setLead(found ?? null);
  }, [leadId]);

  if (!lead) return <Loading/>;

  const handleEdit = () => {
    router.push(`/dashboard/clients/${leadId}/edit`);
  };

  const handleDelete = () => {
    const confirmDelete = confirm("Are you sure you want to delete this client?");
    if (confirmDelete) {
      // Aqui você pode implementar a exclusão via API ou atualizar o estado
      alert("Client deleted! (This is just a mock)");
      router.push("/dashboard/clients");
    }
  };

  return (
    <div className="max-w-screen p-2 bg-[var(--background-color)]">
      <div className="flex justify-between items-center border-b border-[var(--border)] py-4">
        <div className="flex items-center">
          <button
            className="text-text hover:underline flex items-center gap-2 cursor-pointer"
            onClick={() => router.back()}
          >
            <MoveLeft size={24} />
          </button>
          <h1 className="ml-2 text-2xl font-bold">Lead Details</h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleEdit}
            className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-4 py-2 rounded-md flex items-center gap-2 cursor-pointer"
          >
            <Edit size={18} />
            <span className="hidden sm:inline">Edit</span>
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-md flex items-center gap-2 cursor-pointer"
          >
            <Trash2 size={18} />
            <span className="hidden sm:inline">Delete</span>
          </button>
        </div>
      
      </div>

      <div className="grid grid-cols-[25%_75%] h-auto w-full  bg-[var(--card)] rounded-sm my-6">
        {/* Coluna da esquerda */}
        <div className="p-4 text-center flex flex-col items-center justify-center border-r border-[var(--border)] h-full">
          <p className="text-lg mb-2">
            <strong>Name:</strong> {lead.name}
          </p>
          <p>
            {/* <strong>ID: </strong> {client.idDocument} */}
          </p>
          <span
                    className={`px-3 py-1 mt-2 text-sm font-semibold rounded-lg ${
                      lead.status === "Contract Signed"
                        ? "bg-green-100 text-green-700"
                        : lead.status === "Canceled"
                        ? "bg-red-100 text-red-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {lead.status}
                  </span>
          <div className="flex items-center justify-center pt-8 gap-6">
            <a
              href={`https://wa.me/${lead.phone}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="text-green-500 hover:text-green-600 w-6 h-6 cursor-pointer" />
            </a>

            <a href={`mailto:${lead.email}`}>
              <Mail className="text-red-500 hover:text-red-600 w-6 h-6 cursor-pointer" />
            </a>
          </div>
        </div>

        {/* Coluna da direita com 3 linhas */}
        <div className="grid grid-rows-3 gap-4 h-full">
          <div className="px-6 py-8 grid grid-cols-1 md:grid-cols-3 border-b border-[var(--border)]">
            <div>
              <span className="font-semibold">Email</span>
              <p>{lead.email}</p>
            </div>
            <div>
              <span className="font-semibold">Phone</span>
              <p>{lead.phone}</p>
            </div>
            
          </div>
     
          <div className="px-6 py-8 grid grid-cols-1 md:grid-cols-2">
            <div>
              <span className="font-semibold">Interest</span>
              <p>{lead.interest}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
