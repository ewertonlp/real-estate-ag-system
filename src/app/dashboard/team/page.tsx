"use client";
import { useEffect, useState } from "react";
import {
  Mail,
  MessageCircle,
  Eye,
  Contact,
  UserPlus,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { agentList } from "@/mocks/team";
import { Agents } from "@/types";
import Loading from "@/app/components/ui/loading";
import { DetailPanel } from "@/app/components/detailPanel";

export default function Corretores() {
  const [agents, setAgents] = useState<Agents[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterName, setFilterName] = useState("");
  const [filterLicense, setFilterLicense] = useState("");
  const [filterEmail, setFilterEmail] = useState("");
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agents | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAgents(agentList);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const filteredAgents = agents.filter((agent) => {
    const matchesName = agent.name
      .toLowerCase()
      .includes(filterName.toLowerCase());
    const matchesLicense = agent.license
      .toLowerCase()
      .includes(filterLicense.toLowerCase());
    const matchesEmail = agent.email
      .toLowerCase()
      .includes(filterEmail.toLowerCase());
    return matchesName && matchesLicense && matchesEmail;
  });

  const handleAgentSelect = (agent: Agents) => {
    setSelectedAgent(agent);
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    // Limpa o agente selecionado após a animação
    setTimeout(() => setSelectedAgent(null), 300);
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-screen p-2 bg-[var(--background-color)] min-h-screen">
      <div className="flex justify-between items-center border-b border-[var(--border)] py-4">
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

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        <div className="bg-[var(--card)] p-4 rounded-sm shadow-sm">
          <label className="text-sm text-text/70">Filter by Name</label>
          <input
            type="text"
            className="w-full p-2 mt-1 bg-transparent border-b focus:outline-none"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            placeholder="Search name..."
          />
        </div>

        <div className="bg-[var(--card)] p-4 rounded-sm shadow-sm">
          <label className="text-sm text-text/70">Filter by License</label>
          <input
            type="text"
            className="w-full p-2 mt-1 bg-transparent border-b focus:outline-none"
            value={filterLicense}
            onChange={(e) => setFilterLicense(e.target.value)}
            placeholder="Search license..."
          />
        </div>

        <div className="bg-[var(--card)] p-4 rounded-sm shadow-sm">
          <label className="text-sm text-text/70">Filter by Email</label>
          <input
            type="text"
            className="w-full p-2 mt-1 bg-transparent border-b focus:outline-none"
            value={filterEmail}
            onChange={(e) => setFilterEmail(e.target.value)}
            placeholder="Search email..."
          />
        </div>
      </div>

      {/* Cards de Corretores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAgents.map((agent) => (
          <div
            key={agent.id}
            onClick={(e) => {
              e.stopPropagation();
              handleAgentSelect(agent);
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && handleAgentSelect(agent)}
            className="bg-[var(--card)] p-4 rounded-sm shadow-sm cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-[var(--text)]">
                  {agent.name}
                </h3>
                <p className="text-sm text-text/70">{agent.license}</p>
              </div>
              <span className="text-xs text-text/70">#{agent.id}</span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <Mail className="w-4 h-4 mr-2 text-blue-500" />
                <a
                  href={`mailto:${agent.email}`}
                  className="hover:text-blue-600 truncate"
                  title={agent.email}
                >
                  {agent.email}
                </a>
              </div>

              <div className="flex items-center text-sm">
                <MessageCircle className="w-4 h-4 mr-2 text-green-500" />
                <a
                  href={`https://wa.me/${agent.phone}`}
                  className="hover:text-green-600"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {agent.phone}
                </a>
              </div>
            </div>

            <div className="flex justify-between items-center mt-4 pt-4 border-t border-[var(--border)]">
            <button
                className="text-text hover:text-[var(--primary)] flex items-center gap-1 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAgentSelect(agent);
                }}
              >
                <Eye className="w-5 h-5" />
                <span className="text-sm">View Details</span>
              </button>
              <span className="text-xs text-text/70">
                Since {new Date(agent.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredAgents.length === 0 && (
        <div className="text-center py-8 text-text/70">
          No agents found matching the criteria
        </div>
      )}

      <DetailPanel isOpen={isPanelOpen} onClose={handleClosePanel}>
        {selectedAgent && (
          <div className="space-y-4">
            <div className="mb-6">
              <h3 className="text-2xl font-bold">{selectedAgent.name}</h3>
              <p className="text-sm text-text/70">{selectedAgent.license}</p>
            </div>

            <div className="space-y-2">
              <DetailItem
                label="Email"
                value={selectedAgent.email}
                icon={<Mail size={18} />}
              />
              <DetailItem
                label="Phone"
                value={selectedAgent.phone}
                icon={<MessageCircle size={18} />}
              />
              <DetailItem
                label="Registration Date"
                value={new Date(selectedAgent.createdAt).toLocaleDateString()}
                icon={<Calendar size={18} />}
              />
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--border)]">
              <h4 className="font-semibold mb-2">Additional Information</h4>
              {/* Adicione mais campos conforme necessário */}
            </div>
          </div>
        )}
      </DetailPanel>
    </div>
  );
}

// Componente auxiliar para itens de detalhe
const DetailItem = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) => (
  <div className="flex items-start space-x-3">
    {icon && <span className="text-[var(--primary)] mt-1">{icon}</span>}
    <div>
      <p className="text-sm text-text/70">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  </div>
);
