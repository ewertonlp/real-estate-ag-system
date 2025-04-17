"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Agents } from "@/types";
import { ArrowLeft, MoveLeft, Save } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { agentList } from "@/mocks/team";
import Loading from "@/app/components/ui/loading";



export default function EditClient() {
  const router = useRouter();
  const params = useParams();
  const agentId = (params.id);
  const [agents, setAgents] = useState<Agents | null>(null);

  useEffect(() => {
    const found = agentList.find((c) => c.id === agentId);
    setAgents(found ?? null);
  }, [agentId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!agentList) return;
    const { name, value } = e.target;
    setAgents({ ...agent, [name]: value });
  };

  const handleSave = () => {
    console.log("Client saved!", agents);
    // Aqui você colocaria a lógica para salvar no banco
    router.push(`/dashboard/clients/${agentList?.id}`);
  };

  if (!agents) return <div className="p-4"><Loading></Loading></div>;

  return (
    <div className="mmax-w-screen p-2 bg-[var(--background-color)]">
      <div className="flex justify-between items-center border-b border-[var(--border)] py-4">
        <div className="flex items-center">
          <button
            onClick={() => router.back()}
            className="text-sm flex items-center gap-2 text-text hover:underline cursor-pointer"
          >
            <MoveLeft size={20} /> Back
          </button>
          <h1 className="ml-2 text-2xl font-bold">Edit Client</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-[var(--card)] py-6 px-12 rounded-sm shadow-sm my-6">
        <div className="space-y-6">
          <div className="">
            <label className="block text-sm font-semibold mb-1">Name</label>
            <input
              name="name"
              value={agents.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="">
            <label className="block text-sm font-semibold mb1">Email</label>
            <input
              name="email"
              value={agents.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-semibold mb-1">Phone</label>
              <input
                name="phone"
                value={agents.phone}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            {/* <div className="w-1/2">
              <label className="block text-sm font-semibold mb-1">Birthday</label>
              <input
                type="date"
                name="birthday"
                value={client.birthday}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div> */}
          </div>
        </div>

        <div className="space-y-6">
          <div className="">
            <label className="block text-sm font-semibold mb-1">Address</label>
            <input
              name="address"
              value={agents.address}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4 ">
          {/* <div className="w-1/2">
            <label className="block text-sm font-semibold mb-1">City</label>
            <input
              name="city"
              value={client.city}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            </div> */}
          {/* <div className="w-1/4">
            <label className="block text-sm font-semibold mb-1">State</label>
            <input
              name="state"
              value={client.state}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="w-1/4">
            <label className="block text-sm font-semibold mb-1">Postal Code</label>
            <input
              name="zip"
              value={client.zip}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div> */}
          </div>


          <div className="flex flex-col md:flex-row justify-end items-end gap-4 mt-12">
            <Button
            variant="cancelError"
            onClick={() => router.back()}
              className="flex items-center gap-2 "
            >
              <ArrowLeft size={18} /> Cancelar
            </Button>
            <Button
              onClick={handleSave}
              className="flex items-center gap-2 "
            >
              <Save size={18} /> Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
