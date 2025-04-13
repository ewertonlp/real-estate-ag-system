// components/ui/DataTable.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

interface Column<T> {
  header: string;
  accessor: keyof T;
  render?: (value: any, row: T) => React.ReactNode;
  className?: string;
  sortable?: boolean;
  searchable?: boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  rowKey: (row: T) => string | number;
  itemsPerPage?: number;
}

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedVal, setDebouncedVal] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedVal(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedVal;
}

export function DataTable<T>({
  data,
  columns,
  rowKey,
  itemsPerPage = 10,
}: DataTableProps<T>) {
  // Estado para busca global ou por coluna
  const hasColumnSearch = columns.some((col) => col.searchable);
  const [globalSearch, setGlobalSearch] = useState("");
  const [columnSearch, setColumnSearch] = useState<{ [key: string]: string }>(
    {}
  );
  const debouncedGlobalSearch = useDebounce(globalSearch, 300);
  const debouncedColumnSearch = useDebounce(columnSearch, 300);

  // Estado de ordenação
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Estado de paginação
  const [page, setPage] = useState(1);

  // Função para lidar com ordenação
  const handleSort = (col: Column<T>) => {
    if (!col.sortable) return;
    // Se clicar na mesma coluna, inverte a ordem
    if (sortKey === col.accessor) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(col.accessor);
      setSortOrder("asc");
    }
    // Reinicia a página para 1, por segurança
    setPage(1);
  };

  // Função de ordenação (considera strings e numbers)
  const sortedData = useMemo(() => {
    let sorted = [...data];

    // Filtragem: se houver busca, filtra os dados
    sorted = sorted.filter((row) => {
      // Se houver busca por coluna, filtra somente as colunas que são "searchable"
      if (hasColumnSearch) {
        return columns
          .filter((col) => col.searchable)
          .every((col) => {
            const searchValue =
              debouncedColumnSearch[String(col.accessor)] || "";
            if (!searchValue) return true;
            const cellValue = row[col.accessor];
            return cellValue
              ?.toString()
              .toLowerCase()
              .includes(searchValue.toLowerCase());
          });
      } else {
        // Busca global em todas as colunas
        if (!debouncedGlobalSearch) return true;
        return Object.values(row)
          .join(" ")
          .toLowerCase()
          .includes(debouncedGlobalSearch.toLowerCase());
      }
    });

    // Ordenação
    if (sortKey) {
      sorted.sort((a, b) => {
        const aVal = a[sortKey];
        const bVal = b[sortKey];
        if (aVal === undefined || bVal === undefined) return 0;
        if (typeof aVal === "number" && typeof bVal === "number") {
          return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
        }
        const aStr = aVal.toString();
        const bStr = bVal.toString();
        return sortOrder === "asc"
          ? aStr.localeCompare(bStr)
          : bStr.localeCompare(aStr);
      });
    }

    return sorted;
  }, [
    data,
    debouncedGlobalSearch,
    debouncedColumnSearch,
    sortKey,
    sortOrder,
    columns,
    hasColumnSearch,
  ]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return sortedData.slice(start, start + itemsPerPage);
  }, [sortedData, page, itemsPerPage]);

  // Função para exportar CSV (usa dados filtrados e ordenados)
  const exportCSV = () => {
    const headers = columns.map((c) => c.header).join(",");
    const rows = sortedData.map((row) =>
      columns
        .map((col) => {
          const value = row[col.accessor];
          return typeof value === "string" || typeof value === "number"
            ? `"${value}"`
            : "";
        })
        .join(",")
    );
    const csvContent = [headers, ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "table.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-6">
      {/* Toolbar de busca e exportação */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-end mb-4 gap-2">
  <input
    type="text"
    placeholder="Search..."
    className="border px-3 py-2 rounded w-64 text-sm h-10"
    onChange={(e) => {
      setPage(1);
      setGlobalSearch(e.target.value);
    }}
  />

  <button
    onClick={exportCSV}
    className="text-sm px-3 py-2 h-10 rounded bg-[var(--primary)] text-white hover:opacity-90 cursor-pointer"
  >
    Exportar CSV
  </button>
</div>

      {/* Tabela */}
      <div className="overflow-x-auto bg-[var(--card)] shadow rounded-sm">
        <table className="w-full table-auto">
          <thead className="bg-card border-b border-[var(--border)]">
            <tr className="bg-[var(--primary)]">
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  onClick={() => handleSort(col)}
                  className={`px-4 py-3 text-left font-medium select-none cursor-${
                    col.sortable ? "pointer" : "default"
                  } ${col.className ?? ""}`}
                >
                  <div className="flex items-center gap-1">
                    <span>{col.header}</span>
                    {col.sortable && sortKey === col.accessor && (
                      <>
                        {sortOrder === "asc" ? (
                          <ChevronUp size={14} />
                        ) : (
                          <ChevronDown size={14} />
                        )}
                      </>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row) => (
              <tr
                key={rowKey(row)}
                className="border-t border-[var(--border)] hover:bg-[var(--hover)] transition-colors"
              >
                {columns.map((col, idx) => (
                  <td key={idx} className={`px-4 py-3 ${col.className ?? ""}`}>
                    {col.render
                      ? col.render(row[col.accessor], row)
                      : (row[col.accessor] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))}
            {paginatedData.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center text-sm py-4"
                >
                  Nenhum resultado encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginação com ícones */}
      {totalPages > 1 && (
        <div className="flex justify-end gap-2 mt-4 px-2 items-center">
          <button
            disabled={page === 1}
            className="flex items-center gap-1 text-sm px-2 py-1 border rounded disabled:opacity-50"
            onClick={() => setPage(page - 1)}
          >
            <ChevronLeft size={16} />
            <span>Anterior</span>
          </button>
          <span className="text-sm py-1">
            Página {page} de {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            className="flex items-center gap-1 text-sm px-2 py-1 border rounded disabled:opacity-50"
            onClick={() => setPage(page + 1)}
          >
            <span>Próxima</span>
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
