"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Agents } from "@/types";
import { Edit, Mail, MessageCircle, MoveLeft, Trash2 } from "lucide-react";
import { agentList } from "@/mocks/team";
import Loading from "@/app/components/ui/loading";
import Image from "next/image";

export default function ClientDetails() {
  const router = useRouter();
  const params = useParams();
  const agentId = String(params.id);
  const [agent, setAgent] = useState<Agents | null>(null);

  useEffect(() => {
    const found = agentList.find((c) => c.id === agentId);
    setAgent(found ?? null);
  }, [agentId]);

  if (!agent) return <Loading />;

  const handleEdit = () => {
    router.push(`/dashboard/clients/${agentId}/edit`);
  };

  const handleDelete = () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this client?"
    );
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
          <h1 className="ml-2 text-2xl font-bold">Agent Details</h1>
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

      <div className="grid grid-cols-[25%_75%] h-[auto] w-full bg-[var(--card)] rounded-sm shadow my-6">
        {/* Coluna da esquerda */}
        <div className="p-4 text-center flex flex-col items-center justify-center border-r border-[var(--border)] h-full">
          <div className="flex flex-col items-center gap-2">
            {agent.avatar ? (
              <Image
                src={agent.avatar[0].url}
                alt="Avatar"
                className="w-35 h-35 rounded-full"
                width={100}
                height={100}
                priority={false}
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">No photo</span>
              </div>
            )}

            <p className="text-lg">
              <strong>Name:</strong> {agent.name}
            </p>
            <p>
              <strong>ID: </strong> {agent.idDocument}
            </p>
          </div>
          <div className="flex items-center justify-center pt-8 gap-6">
            <a
              href={`https://wa.me/${agent.phone}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="text-green-500 hover:text-green-600 w-6 h-6 cursor-pointer" />
            </a>

            <a href={`mailto:${agent.email}`}>
              <Mail className="text-red-500 hover:text-red-600 w-6 h-6 cursor-pointer" />
            </a>
          </div>
        </div>

        {/* Coluna da direita com 3 linhas */}
        <div className="grid grid-rows-3 gap-4 h-full">
          <div className="px-6 py-8 grid grid-cols-1 md:grid-cols-3 border-b border-[var(--border)]">
            <div>
              <span className="font-semibold">Email</span>
              <p>{agent.email}</p>
            </div>
            <div>
              <span className="font-semibold">Phone</span>
              <p>{agent.phone}</p>
            </div>
            <div>
              <span className="font-semibold">License</span>
              <p>{agent.license}</p>
            </div>
          </div>
          <div className="px-6 py-8 grid grid-cols-1 md:grid-cols-3 border-b border-[var(--border)]">
            {" "}
            <div>
              <span className="font-semibold">Address</span>
              <p>{agent.address}</p>
            </div>
            <div>
              <span className="font-semibold">Role</span>
              <p>{agent.role}</p>
            </div>
            <div>
              <span className="font-semibold">Member since</span>
              <p>{agent.createdAt?.toString()}</p>
            </div>
          </div>
          <div className="px-6 py-8 grid grid-cols-1 md:grid-cols-2">
            <div>
              <span className="font-semibold">Sold properties</span>
              <p>{}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
