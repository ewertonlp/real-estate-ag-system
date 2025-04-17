"use client";
import { useEffect, useState } from "react";
import {
  Mail,
  MessageCircle,
  Eye,
  Contact,
  UserPlus,
  Calendar,
  PenLine,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/app/components/ui/button";
import { agentList } from "@/mocks/team";
import { Agents } from "@/types";
import Loading from "@/app/components/ui/loading";
import { DetailPanel } from "@/app/components/detailPanel";


export default function RealEstateAgents() {
  const [agents, setAgents] = useState<Agents[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterName, setFilterName] = useState("");
  const [filterLicense, setFilterLicense] = useState("");
  const [filterEmail, setFilterEmail] = useState("");
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agents | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedAgent, setEditedAgent] = useState<Agents | null>(null);



  useEffect(() => {
    const timer = setTimeout(() => {
      setAgents(agentList);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (selectedAgent && !isEditing) {
      setEditedAgent({ ...selectedAgent });
    }
  }, [selectedAgent, isEditing]);

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
    setTimeout(() => setSelectedAgent(null), 300);
  };

  const handleSave = () => {
    if (editedAgent) {
      setAgents((prev) =>
        prev.map((agent) => (agent.id === editedAgent.id ? editedAgent : agent))
      );
      setIsEditing(false);
      setSelectedAgent(editedAgent);
    }
  };

  const handleCancel = () => {
    if (selectedAgent) {
      setEditedAgent({ ...selectedAgent }); // Restaura os dados originais
    }
    setIsEditing(false);
  };
  

  const handleFieldChange = (field: keyof Agents, value: string) => {
    setEditedAgent((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  if (!agents) return <Loading />;

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
        {editedAgent && (
          <div className="h-10/12 flex flex-col p-2">
            <div className="flex-grow space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {selectedAgent?.avatar ? (
                    <Image
                      src={selectedAgent.avatar[0].url}
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
                  <div className="ml-4">
                    {isEditing ? (
                      <input
                        value={editedAgent.name}
                        onChange={(e) =>
                          handleFieldChange("name", e.target.value)
                        }
                        className="text-2xl font-bold bg-transparent border-b"
                      />
                    ) : (
                      <h3 className="text-2xl font-bold">{editedAgent.name}</h3>
                    )}
                    <p className="text-sm text-text/70">
                      <span>License: </span>
                      {isEditing ? (
                        <input
                          value={editedAgent.license}
                          onChange={(e) =>
                            handleFieldChange("license", e.target.value)
                          }
                          className="bg-transparent border-b"
                        />
                      ) : (
                        editedAgent.license
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {isEditing ? (
                    <>
                      <Button onClick={handleSave} variant="solid">
                        Save
                      </Button>
                      <Button onClick={handleCancel} variant="outline">
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={() => setIsEditing(true)}
                      variant="edit"
                      size="icon"
                    >
                      <PenLine size={22} />
                    </Button>
                  )}
                </div>
              </div>

              <div className="space-y-3 pt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">

                <EditableDetailItem
                  label="Email"
                  value={editedAgent.email}
                  icon={<Mail size={18} />}
                  editing={isEditing}
                  onChange={(value) => handleFieldChange("email", value)}
                />
                <EditableDetailItem
                  label="Phone"
                  value={editedAgent.phone}
                  icon={<MessageCircle size={18} />}
                  editing={isEditing}
                  onChange={(value) => handleFieldChange("phone", value)}
                />
                </div>
                <EditableDetailItem
                  label="Address"
                  value={editedAgent.address}
                  icon={<MessageCircle size={18} />}
                  editing={isEditing}
                  onChange={(value) => handleFieldChange("address", value)}
                />
                <DetailItem
                  label="Registration Date"
                  value={new Date(editedAgent.createdAt).toLocaleDateString()}
                  icon={<Calendar size={18} />}
                />
              </div>
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

const EditableDetailItem = ({
  label,
  value,
  icon,
  editing,
  onChange,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
  editing: boolean;
  onChange: (value: string) => void;
}) => (
  <div className="flex items-start space-x-3">
    {icon && <span className="text-[var(--primary)] mt-1">{icon}</span>}
    <div className="flex-1">
      <p className="text-sm text-text/70">{label}</p>
      {editing ? (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent border-b focus:outline-none"
        />
      ) : (
        <p className="font-medium">{value}</p>
      )}
    </div>
  </div>
);
