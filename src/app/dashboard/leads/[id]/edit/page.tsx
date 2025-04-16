// app/dashboard/leads/[id]/page.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Leads, Clients } from "@/types";
import { leadsMock } from "@/mocks/leads";
import { ArrowLeft, MoveLeft, Save, BadgeCheck } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { toast } from "sonner";

export default function EditLead() {
  const router = useRouter();
  const params = useParams();
  const leadId = (params.id);
  const [lead, setLead] = useState<Leads | null>(null);
  const [isConverting, setIsConverting] = useState(false);

  useEffect(() => {
    const found = leadsMock.find((c) => c.id === leadId);
    setLead(found ?? null);
  }, [leadId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!lead) return;
    setLead({ ...lead, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Lógica para salvar alterações no lead
    toast.success('Lead atualizado com sucesso!');
    router.push(`/dashboard/leads`);
  };

  const handleConvertToClient = async () => {
    setIsConverting(true);
    try {
      // Validar dados do lead
      if (!lead) throw new Error('Lead não encontrado');

      // Criar novo cliente
      const newClient: Leads= {
        ...lead,
        id: leadsMock.length + 1,
        clientSince: new Date().toISOString(),
        convertedFrom: lead.id,
        // Remover campos específicos de lead
        status: undefined,
        convertedAt: undefined
      };

      // Atualizar mocks
      leadsMock.push(newClient);
      const leadIndex = leadsMock.findIndex(l => l.id === leadId);
      if (leadIndex > -1) {
        leadsMock[leadIndex] = {
          ...lead,
          status: 'converted',
          convertedAt: new Date().toISOString()
        };
      }

      toast.success('Lead convertido para cliente com sucesso!');
      router.push(`/dashboard/clients/${newClient.id}`);
    } catch (error) {
      toast.error('Erro na conversão do lead');
    } finally {
      setIsConverting(false);
    }
  };

  if (!lead) return <p className="p-4">Carregando...</p>;

  return (
    <div className="max-w-screen p-2 bg-[var(--background-color)]">
      <div className="flex justify-between items-center border-b border-[var(--border)] py-4">
        <div className="flex items-center">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <MoveLeft size={20} />
            Voltar
          </Button>
          <h1 className="ml-2 text-2xl font-bold">Editar Lead</h1>
        </div>
        
        {lead.status === 'converted' && (
          <div className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full">
            <BadgeCheck className="text-green-600" size={18} />
            <span className="text-green-600 text-sm">Convertido em {new Date(lead.convertedAt!).toLocaleDateString()}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[var(--card)] p-6 rounded-lg shadow-sm mt-6">
        {/* Formulário de edição do lead (mantenha seu código existente) */}

        <div className="md:col-span-2 flex justify-end gap-4 mt-8">
          <Button
            variant="outline"
            onClick={() => router.back()}
          >
            <ArrowLeft size={18} className="mr-2" />
            Cancelar
          </Button>

          {lead.status !== 'converted' && (
            <Button
              onClick={handleConvertToClient}
              className="bg-green-600 hover:bg-green-700"
              disabled={isConverting}
            >
              <BadgeCheck size={18} className="mr-2" />
              {isConverting ? 'Convertendo...' : 'Converter para Cliente'}
            </Button>
          )}

          <Button onClick={handleSave}>
            <Save size={18} className="mr-2" />
            Salvar Alterações
          </Button>
        </div>
      </div>
    </div>
  );
}