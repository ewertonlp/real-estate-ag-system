"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";


// ... (mantenha os tipos FormField e FormSection)

export default function NewRealtor() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Corrigir nomes para manter consistência
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    creci: "",
    phone: "",
    address: "",
    number: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const formSections: Record<string, FormSection> = {
    contact: {
      title: "Add New Real Estate Agent",
      sectionType: "contact",
      fields: [
        // Corrigir nomes para minúsculas
        { name: "name", type: "text", placeholder: "Name", grid: "col-span-2" },
        { name: "email", type: "email", placeholder: "Email", grid: "col-span-2" },
        { name: "creci", type: "text", placeholder: "Creci", grid: "col-span-1" },
        { name: "phone", type: "text", placeholder: "WhatsApp", grid: "col-span-1" },
        { name: "address", type: "text", placeholder: "Address", grid: "col-span-2" },
        { name: "number", type: "number", placeholder: "Number", grid: "col-span-1" },
        { name: "city", type: "text", placeholder: "City", grid: "col-span-1" },
        { name: "state", type: "text", placeholder: "State", grid: "col-span-1" },
        { name: "postalCode", type: "text", placeholder: "Postal Code", grid: "col-span-1" },
      ],
    },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Adicionar validação aqui
      const newErrors: Record<string, string> = {};
      
      // Exemplo de validação simples
      if (!formData.name) newErrors.name = "Name is required";
      if (!formData.creci) newErrors.creci = "CRECI is required";
      
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      
      // Adicionar lógica de envio aqui
      // await api.post(...)
      
    } finally {
      setIsSubmitting(false);
    }
  }

  // ... (mantenha handleChange e renderField)
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

   const renderField = (field: FormField) => {
      const commonProps = {
        key: field.name,
        name: field.name,
        value: formData[field.name as keyof typeof formData] || "",
        onChange: handleChange,
        placeholder: field.placeholder,
        className: `${
          field.grid || "w-full"
        } p-3 border border-[var(--border)] rounded-sm placeholder:text-sm placeholder:text-[var(--text)] ${
          field.inputType === "textarea" ? "h-24" : ""
        }`,
        required: field.required,
      };
  
      return (
        <div className={`${field.grid || "w-full"}`}>
          {field.inputType === "textarea" ? (
            <textarea {...commonProps} />
          ) : (
            <Input {...commonProps} />
          )}
          {errors[field.name] && (
            <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
          )}
        </div>
      );
    };

  return (
    <div className="max-w-screen min-h-screen p-2 bg-[var(--background-color)]">
      <div className="flex justify-start items-center border-b border-gray-300 py-4">
      <TeamIcon />
        <h1 className="ml-2 text-2xl font-bold">New Agent</h1>
      </div>

      <div className="bg-[var(--card)] flex justify-center items-center shadow rounded-sm overflow-hidden mt-6 p-4">
        <form className="space-y-4 mb-6 py-4 w-full max-w-3xl" onSubmit={handleSubmit}>
          <div className="gap-4 space-y-4">
            {Object.entries(formSections).map(([sectionName, section]) => (
              <div key={sectionName} className="p-2">
                <div className="text-center mb-10">
                  <p className="text-2xl text-text">
                    {section.title}
                  </p>
                 
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {section.fields.map(renderField)}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-end items-center">
            <Button
              type="submit"
              variant="solid"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Registering..." : "Register Agent"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

const TeamIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-contact-round-icon lucide-contact-round"
  >
    <path d="M16 2v2" />
    <path d="M17.915 22a6 6 0 0 0-12 0" />
    <path d="M8 2v2" />
    <circle cx="12" cy="12" r="4" />
    <rect x="3" y="4" width="18" height="18" rx="2" />
  </svg>
);