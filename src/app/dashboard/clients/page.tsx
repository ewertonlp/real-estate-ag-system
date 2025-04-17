"use client";
import { useEffect, useState } from "react";
import { Mail, MessageCircle, Eye, UserPlus, Users, PenLine, Calendar, DockIcon, Cake, Pin } from "lucide-react";
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
import { DetailPanel } from "@/app/components/detailPanel";

export default function Clientes() {
  const [filterStatus, setFilterStatus] = useState("All");
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState<Clients[]>([]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Clients | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedClient, setEditedClient] = useState<Clients | null>(null);

  useEffect(() => {
    if (selectedClient) {
      setEditedClient({ ...selectedClient });
    }
  }, [selectedClient]);

  const handleClientSelect = (client: Clients) => {
    setSelectedClient(client);
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setTimeout(() => setSelectedClient(null), 300);
  };

  const handleSave = () => {
    if (editedClient) {
      setClients((prev) =>
        prev.map((client) =>
          client.id === editedClient.id ? editedClient : client
        )
      );
      setIsEditing(false);
      setSelectedClient(editedClient);
    }
  };

  const handleCancel = () => {
    if (selectedClient) {
      setEditedClient({ ...selectedClient });
    }
    setIsEditing(false);
  };

  const handleFieldChange = (field: keyof Clients, value: string) => {
    setEditedClient((prev) => (prev ? { ...prev, [field]: value } : null));
  };

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
        {["All", "Interested", "In Negotiation", "Contract Signed"].map(
          (status) => (
            <div
              key={status}
              className={`p-4 rounded-sm border-l-4 cursor-pointer transition-colors shadow-sm ${
                filterStatus === status
                  ? "bg-[var(--primary)]"
                  : "bg-[var(--card)] hover:bg-[var(--primary)]"
              } ${
                status === "All"
                  ? "border-l-[var(--primary)]"
                  : status === "Interested"
                  ? "border-l-blue-500"
                  : status === "In Negotiation"
                  ? "border-l-yellow-500"
                  : "border-l-green-500"
              }`}
              onClick={() => setFilterStatus(status)}
            >
              <p className="text-sm text-text">{status}</p>
              <h2 className="text-xl font-bold">
                {status === "All"
                  ? clients.length
                  : clients.filter((c) => c.status === status).length}
              </h2>
            </div>
          )
        )}
      </div>

      {/* Cards de Clientes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClients.map((client) => (
          <div
          key={client.id}
          className="bg-[var(--card)] p-4 rounded-sm shadow-sm cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => handleClientSelect(client)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && handleClientSelect(client)}
        >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-[var(--text)]">
                  {client.name}
                </h3>
                {/* <p className="text-sm text-text/90">{client.}</p> */}
              </div>
              <span
                className={`px-2 py-1 text-xs font-semibold rounded-lg ${
                  client.status === "Interested"
                    ? "bg-blue-100 text-blue-700"
                    : client.status === "In Negotiation"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
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
            <button
                className="text-text hover:text-[var(--primary)] flex items-center gap-1 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClientSelect(client);
                }}
              >
                <Eye className="w-5 h-5" />
                <span className="text-sm">View Details</span>
              </button>
              <span className="text-xs text-text/70">
                {new Date(client.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}

        <DetailPanel isOpen={isPanelOpen} onClose={handleClosePanel}>
          {editedClient && (
            <div className="h-10/12 flex flex-col p-2">
              <div className="flex-grow space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <div className="">
                      {isEditing ? (
                        <input
                          value={editedClient.name}
                          onChange={(e) =>
                            handleFieldChange("name", e.target.value)
                          }
                          className="text-2xl font-bold bg-transparent border-b"
                        />
                      ) : (
                        <h3 className="text-2xl font-bold">
                          {editedClient.name}
                        </h3>
                      )}
                      <p className="text-sm text-text/70 pt-2">
                      <span
                className={`px-2 py-1 text-xs font-semibold rounded-lg ${
                  editedClient.status === "Interested"
                    ? "bg-blue-100 text-blue-700"
                    : editedClient.status === "In Negotiation"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {editedClient.status}
              </span>
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

                <div className="space-y-6 pt-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">

                  <EditableDetailItem
                    label="ID"
                    value={editedClient.idDocument}
                    icon={<DockIcon size={18} />}
                    editing={isEditing}
                    onChange={(value) => handleFieldChange("idDocument", value)}
                  />
                  <EditableDetailItem
                    label="Phone"
                    value={editedClient.phone}
                    icon={<MessageCircle size={18} />}
                    editing={isEditing}
                    onChange={(value) => handleFieldChange("phone", value)}
                  />
                  <EditableDetailItem
                    label="Birthday"
                    value={editedClient.birthday}
                    icon={<Cake size={18} />}
                    editing={isEditing}
                    onChange={(value) => handleFieldChange("birthday", value)}
                  />
                  </div>
                  <EditableDetailItem
                    label="Email"
                    value={editedClient.email}
                    icon={<Mail size={18} />}
                    editing={isEditing}
                    onChange={(value) => handleFieldChange("email", value)}
                  />
                  <EditableDetailItem
                    label="Address"
                    value={editedClient.address}
                    icon={<Pin size={18} />}
                    editing={isEditing}
                    onChange={(value) => handleFieldChange("address", value)}
                  />
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">

                  <EditableDetailItem
                    label="City"
                    value={editedClient.city}
                    icon={<Mail size={18} />}
                    editing={isEditing}
                    onChange={(value) => handleFieldChange("city", value)}
                  />
                  <EditableDetailItem
                    label="State"
                    value={editedClient.state}
                    icon={<Mail size={18} />}
                    editing={isEditing}
                    onChange={(value) => handleFieldChange("state", value)}
                  />
                  <EditableDetailItem
                    label="Postal Code"
                    value={editedClient.zip}
                    icon={<Mail size={18} />}
                    editing={isEditing}
                    onChange={(value) => handleFieldChange("zip", value)}
                  />
                  </div>
                  <DetailItem
                    label="Registration Date"
                    value={new Date(
                      editedClient.createdAt
                    ).toLocaleDateString()}
                    icon={<Calendar size={18} />}
                  />
                </div>

                <div className="pt-2 border-t border-[var(--border)]">
                  <h4 className="font-semibold mb-2">Interesting properties</h4>
                  {/* Campos adicionais podem ser adicionados aqui */}
                </div>
                <div className="mt-12 pt-2 border-t border-[var(--border)]">
                  <h4 className="font-semibold mb-2">Properties purchased</h4>
                  {/* Campos adicionais podem ser adicionados aqui */}
                </div>
              </div>
            </div>
          )}
        </DetailPanel>
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
  onChange
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