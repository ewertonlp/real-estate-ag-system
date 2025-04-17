"use client";
import { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import {
  Cake,
  Calendar,
  DockIcon,
  DollarSign,
  DollarSignIcon,
  Eye,
  Mail,
  MessageCircle,
  PenLine,
  PersonStanding,
  Pin,
  Plus,
  TrendingUp,
} from "lucide-react";
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
import Loading from "@/app/components/ui/loading";
import { salesMock } from "@/mocks/sales";
import { Sales } from "@/types";
import { DetailPanel } from "@/app/components/detailPanel";

export default function Vendas() {
  const [filtroStatus, setFiltroStatus] = useState<string>("All");
  const [salesData, setSalesData] = useState<Sales[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedSales, setSelectedSales] = useState<Sales | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedSales, setEditedSales] = useState<Sales | null>(null);

  // useEffect(() => {
  //   const loadSales = () => {
  //     try {
  //       const typedSales = salesMock as Sales[];
  //       setSalesData(typedSales);
  //     } catch (error) {
  //       console.error("Error loading sales:", error);
  //       setSalesData([]);
  //     }
  //     setLoading(false);
  //   };

  //   const timer = setTimeout(loadSales, 800);
  //   return () => clearTimeout(timer);
  // }, []);

  const handleStatusFilter = (status: string) => {
    setFiltroStatus(status);
  };

  //------------------------------------------------------
  useEffect(() => {
    if (selectedSales) {
      setEditedSales({ ...selectedSales });
    }
  }, [selectedSales]);

  const handleSaleSelect = (client: Sales) => {
    setSelectedSales(client);
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setTimeout(() => setSelectedSales(null), 300);
  };

  const handleSave = () => {
    if (editedSales) {
      setSalesData((prev) =>
        prev.map((client) =>
          client.id === editedSales.id ? editedSales : client
        )
      );
      setIsEditing(false);
      setSelectedSales(editedSales);
    }
  };

  const handleCancel = () => {
    if (selectedSales) {
      setEditedSales({ ...selectedSales });
    }
    setIsEditing(false);
  };

  const handleFieldChange = (field: keyof Sales, value: string) => {
    setEditedSales((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSalesData(salesMock);
      setLoading(false);
    };
    fetchData();
  }, []);

  const salesFiltereds =
    filtroStatus === "All"
      ? salesData
      : salesData.filter((sale) => sale.status === filtroStatus);

  if (loading) return <Loading />;

  return (
    <div className="max-w-screen p-2 bg-[var(--background-color)] min-h-screen">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center border-b border-[var(--border)] py-4">
        <div className="flex items-center">
          <TrendingUp size={24} />
          <h1 className="ml-2 text-2xl font-bold">Sales</h1>
        </div>
        <div>
          <Link href="/dashboard/team/newClient">
            <Button variant="solid" size="md">
              <Plus size={18} className="mr-2" />
              Register New Sale
            </Button>
          </Link>
        </div>
      </div>

      {/* Cards de Status */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 my-6">
        {["All", "Completed", "In progress", "Pending", "Canceled"].map(
          (status) => (
            <div
              key={status}
              className={`p-4 rounded-sm shadow border-l-4 cursor-pointer transition-colors ${
                filtroStatus === status
                  ? "bg-[var(--primary)]"
                  : "bg-[var(--card)]"
              } ${
                status === "All"
                  ? "border-l-[var(--primary)]"
                  : status === "Completed"
                  ? "border-l-green-500"
                  : status === "In progress"
                  ? "border-l-blue-500"
                  : status === "Pending"
                  ? "border-l-yellow-500"
                  : "border-l-red-500"
              }`}
              onClick={() => handleStatusFilter(status)}
            >
              <p className="text-sm text-text">{status}</p>
              <h2 className="text-xl font-bold">
                {status === "All"
                  ? salesData.length
                  : salesData.filter((s) => s.status === status).length}
              </h2>
            </div>
          )
        )}
      </div>

      {/* Cards de Vendas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {salesFiltereds.map((sale) => (
          <div
            key={sale.id}
            className="bg-[var(--card)] p-4 rounded-sm shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-[var(--text)]">
                  {sale.buyer}
                </h3>
                <p className="text-sm text-text/90">{sale.address}</p>
              </div>
              <span
                className={`px-2 py-1 text-xs font-semibold rounded-lg ${
                  sale.status === "Completed"
                    ? "bg-green-100 text-green-700"
                    : sale.status === "Canceled"
                    ? "bg-red-100 text-red-700"
                    : sale.status === "In progress"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {sale.status}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-text/70">Value:</span>
                <span className="font-medium">
                  $ {sale.value.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-text/70">Agent:</span>
                <span className="font-medium">{sale.agent}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-text/70">Date:</span>
                <span className="text-text/90">
                  {new Date(sale.date).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-text/70">Commission:</span>
                <span className="font-medium text-[var(--primary)]">
                  $ {sale.commission.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-2 border-t border-[var(--border)]">
              <button
                className="text-text hover:text-[var(--primary)] flex items-center gap-1 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSaleSelect(sale);
                }}
              >
                <Eye className="w-5 h-5" />
                <span className="text-sm">View Details</span>
              </button>
            </div>
          </div>
        ))}

        <DetailPanel isOpen={isPanelOpen} onClose={handleClosePanel}>
          {editedSales && (
            <div className="h-10/12 flex flex-col p-2">
              <div className="flex-grow space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <div className="">
                      {isEditing ? (
                        <input
                          value={editedSales.buyer}
                          onChange={(e) =>
                            handleFieldChange("buyer", e.target.value)
                          }
                          className="text-2xl font-bold bg-transparent border-b"
                        />
                      ) : (
                        <h3 className="text-2xl font-bold">
                          {editedSales.buyer}
                        </h3>
                      )}
                      <p className="text-sm text-text/70 pt-2">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-lg ${
                            editedSales.status === "Completed"
                              ? "bg-green-100 text-green-700"
                              : editedSales.status === "Canceled"
                              ? "bg-red-100 text-red-700"
                              : editedSales.status === "In progress"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {editedSales.status}
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
                    {/* <EditableDetailItem
                      label="ID"
                      value={editedSales.idDocument}
                      icon={<DockIcon size={18} />}
                      editing={isEditing}
                      onChange={(value) =>
                        handleFieldChange("idDocument", value)
                      }
                    />
                    <EditableDetailItem
                      label="Phone"
                      value={editedSales.phone}
                      icon={<MessageCircle size={18} />}
                      editing={isEditing}
                      onChange={(value) => handleFieldChange("phone", value)}
                    /> */}
                    {/* <EditableDetailItem
                      label="Birthday"
                      value={editedSales.birthday}
                      icon={<Cake size={18} />}
                      editing={isEditing}
                      onChange={(value) => handleFieldChange("birthday", value)}
                    /> */}
                  </div>
                  {/* <EditableDetailItem
                    label="Email"
                    value={editedSales.email}
                    icon={<Mail size={18} />}
                    editing={isEditing}
                    onChange={(value) => handleFieldChange("email", value)}
                  /> */}
                  <EditableDetailItem
                    label="Address"
                    value={editedSales.address}
                    icon={<Pin size={18} />}
                    editing={isEditing}
                    onChange={(value) => handleFieldChange("address", value)}
                  />
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    <EditableDetailItem
                      label="Date"
                      value={editedSales.date}
                      icon={<Mail size={18} />}
                      editing={isEditing}
                      onChange={(value) => handleFieldChange("date", value)}
                    />
                    <DetailItem
                      label="Value"
                      value={editedSales.value}
                      icon={<DollarSignIcon size={18} />}
                     
                    />
                    <DetailItem
                      label="Agent"
                      value={editedSales.agent}
                      icon={<PersonStanding size={18} />}
                    
                    />
                   
                    <DetailItem
                      label="Commission"
                      value={editedSales.commission}
                      icon={<DollarSign size={18} />}
                      
                    />
                  </div> 
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
      {salesFiltereds.length > 0 && (
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
      )}
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
  value: string | number;
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
