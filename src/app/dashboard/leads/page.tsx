"use client";

import { useEffect, useState } from "react";
import {
  MessageCircle,
  Phone,
  Mail,
  MoveDown,
  Eye,
  PenLine,
  Calendar,
} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/app/components/ui/pagination";
import { leadsMock } from "@/mocks/leads";
import { Leads } from "@/types";
import Link from "next/link";
import Loading from "@/app/components/ui/loading";
import { DetailPanel } from "@/app/components/detailPanel";
import { Button } from "@/app/components/ui/button";

export default function LeadsPage() {
  const [dataLeads, setDataLeads] = useState<Leads[]>([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Leads | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedLead, setEditedLead] = useState<Leads | null>(null);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setDataLeads(leadsMock);
  //     setFilteredLeads(leadsMock);
  //     setLoading(false);
  //   }, 500);
  //   return () => clearTimeout(timer);
  // }, []);

  // const handleStatusFilter = (status: string | null) => {
  //   setSelectedStatus(status);
  //   if (!status) {
  //     setFilteredLeads(dataLeads);
  //   } else {
  //     const filtered = dataLeads.filter((lead) => lead.status === status);
  //     setFilteredLeads(filtered);
  //   }
  // };

  useEffect(() => {
    if (selectedLead) {
      setEditedLead({ ...selectedLead });
    }
  }, [selectedLead]);

  const handleLeadSelect = (client: Leads) => {
    setSelectedLead(client);
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setTimeout(() => setSelectedLead(null), 300);
  };

  const handleSave = () => {
    if (editedLead) {
      setDataLeads((prev) =>
        prev.map((client) =>
          client.id === editedLead.id ? editedLead : client
        )
      );
      setIsEditing(false);
      setSelectedLead(editedLead);
    }
  };

  const handleCancel = () => {
    if (selectedLead) {
      setEditedLead({ ...selectedLead });
    }
    setIsEditing(false);
  };

  const handleFieldChange = (field: keyof Leads, value: string) => {
    setEditedLead((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setDataLeads(leadsMock);
      setLoading(false);
    };
    fetchData();
  }, []);

  const filteredLeads =
    filterStatus === "All"
      ? leadsMock
      : leadsMock.filter((lead) => lead.status === filterStatus);

  if (loading) return <Loading />;

  return (
    <div className="p-2 bg-[var(--background-color)] min-h-screen">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center border-b border-[var(--border)] py-4">
        <div className="flex items-center">
          <MoveDown size={24} />
          <h1 className="ml-2 text-2xl font-bold text-[var(--text)]">Leads</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-6">
        {["All", "New", "Contacted", "In Negotiation"].map((status) => (
          <div
            key={status}
            className={`p-4 rounded-sm border-l-4 cursor-pointer transition-colors shadow-sm ${
              filterStatus === status
                ? "bg-[var(--primary)]"
                : "bg-[var(--card)] hover:bg-[var(--primary)]"
            } ${
              status === "All"
                ? "border-l-[var(--primary)]"
                : status === "New"
                ? "border-l-blue-500"
                : status === "Contacted"
                ? "border-l-yellow-500"
                : "border-l-pink-700"
            }`}
            onClick={() => setFilterStatus(status)}
          >
            <p className="text-sm text-text">{status}</p>
            <h2 className="text-xl font-bold">
              {status === "All"
                ? leadsMock.length
                : leadsMock.filter((c) => c.status === status).length}
            </h2>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {filteredLeads.map((lead) => (
          <div
            key={lead.id}
            className="bg-[var(--card)] p-4 rounded-sm shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-[var(--text)]">
                  {lead.name}
                </h3>
                <p className="text-sm text-text/90">{lead.interest}</p>
              </div>
              <span
                className={`px-2 py-1 text-xs font-semibold rounded-lg ${
                  lead.status === "New"
                    ? "bg-blue-100 text-blue-700"
                    : lead.status === "Contacted"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-pink-100 text-pink-700"
                }`}
              >
                {lead.status}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <Phone className="w-4 h-4 mr-2 text-blue-500" />
                <a href={`tel:${lead.phone}`} className="hover:text-blue-500">
                  {lead.phone}
                </a>
              </div>

              {lead.email && (
                <div className="flex items-center text-sm">
                  <Mail className="w-4 h-4 mr-2 text-red-500" />
                  <a
                    href={`mailto:${lead.email}`}
                    className="hover:text-red-500"
                  >
                    {lead.email}
                  </a>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center mt-4 pt-4 border-t border-[var(--border)]">
              <div className="flex space-x-2">
                <a
                  href={`https://wa.me/${lead.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-500 hover:text-green-600"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>

                <button
                  className="text-text hover:text-[var(--primary)] flex items-center gap-1 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLeadSelect(lead);
                  }}
                >
                  <Eye className="w-5 h-5" />
                  <span className="text-sm">View Details</span>
                </button>
              </div>
              <span className="text-xs text-gray-500">
                {new Date(lead.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}

        <DetailPanel isOpen={isPanelOpen} onClose={handleClosePanel}>
          {editedLead && (
            <div className="h-10/12 flex flex-col p-2">
              <div className="flex-grow space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <div className="">
                      {isEditing ? (
                        <input
                          value={editedLead.name}
                          onChange={(e) =>
                            handleFieldChange("name", e.target.value)
                          }
                          className="text-2xl font-bold bg-transparent border-b"
                        />
                      ) : (
                        <h3 className="text-2xl font-bold">
                          {editedLead.name}
                        </h3>
                      )}
                      <p className="text-sm text-text/70 pt-2">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-lg ${
                            editedLead.status === "New"
                              ? "bg-blue-100 text-blue-700"
                              : editedLead.status === "Contacted"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-pink-700"
                          }`}
                        >
                          {editedLead.status}
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
                      label="Phone"
                      value={editedLead.phone}
                      icon={<MessageCircle size={18} />}
                      editing={isEditing}
                      onChange={(value) => handleFieldChange("phone", value)}
                    />

                    <EditableDetailItem
                      label="Email"
                      value={editedLead.email}
                      icon={<Mail size={18} />}
                      editing={isEditing}
                      onChange={(value) => handleFieldChange("email", value)}
                    />
                  </div>

                  <DetailItem
                    label="Registration Date"
                    value={new Date(editedLead.createdAt).toLocaleDateString()}
                    icon={<Calendar size={18} />}
                  />
                </div>

                <div className="pt-2 mt-2 border-t border-[var(--border)]">
                  <h4 className="font-semibold mb-2">Interesting properties</h4>
                  {/* Campos adicionais podem ser adicionados aqui */}
                </div>
              </div>
            </div>
          )}
        </DetailPanel>
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
