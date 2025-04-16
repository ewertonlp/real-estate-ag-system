// components/detailPanel.tsx
"use client";
import { X } from "lucide-react";
import { useEffect } from "react";

type DetailPanelProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const DetailPanel = ({
  isOpen,
  onClose,
  children,
}: DetailPanelProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      {/* Painel */}
      <div
        className={`fixed right-0 top-25 h-full z-50 bg-[var(--card)] shadow-lg transition-transform duration-300 ease-in-out`}
        style={{
          transform: isOpen ? "translateX(0)" : "translateX(110%)",
          width: "100vw",
          maxWidth: "600px",
        }}
      >
        <div className="h-full flex flex-col">
          <div className="relative p-4 ">
            <button
              onClick={onClose}
              className="absolute -left-5 -top-2 z-50 p-2 rounded-full bg-[var(--card)] shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              aria-label="Close panel"
            >
              <X
                size={26}
                className="text-[var(--text)] hover:text-[var(--primary)]"
              />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <h2 className="text-xl font-semibold mb-4">Details</h2>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};
