// app/dashboard/properties/new/page.tsx
"use client";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import UploadImage from "@/app/components/ui/uploadImage";
import { useEffect, useState } from "react";

type FormField = {
  name: string;
  type: string;
  placeholder: string;
  grid?: string;
  inputType?: "input" | "textarea";
  required?: boolean;
  rows?: number;
};

type FormSection = {
  title?: string;
  fields: FormField[];
  sectionType?: "default" | "contact";
};

export default function NewPropertyPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    address: "",
    number: "",
    city: "",
    state: "",
    zipCode: "",
    price: "",
    rental: "",
    taxes: "",
    bedrooms: "",
    bathrooms: "",
    description: "",
    details: "",
    videoUrl: "",
    propertyType: "launch",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    contactAddress: "",
    contactNumber: "",
    contactCity: "",
    contactState: "",
    contactPostalCode: "",
  });

  const [files, setFiles] = useState<File[]>([]);

  const propertyTypes = [
    "Property_release",
    "Off-plan property",
    "Move-in available",
    "Private property",
  ];

  const formSections: Record<string, FormSection> = {
    basicInfo: {
      fields: [
        {
          name: "title",
          type: "text",
          placeholder: "Property Title",
          grid: "col-span-2",
        },
        {
          name: "address",
          type: "text",
          placeholder: "Address",
          grid: "col-span-2",
        },
        { name: "number", type: "number", placeholder: "Number" },
        { name: "state", type: "text", placeholder: "State" },
        { name: "postalCode", type: "text", placeholder: "Postal Code" },
      ],
    },
    details: {
      fields: [
        { name: "bedrooms", type: "number", placeholder: "Bedrooms" },
        { name: "bathrooms", type: "number", placeholder: "Bathrooms" },
        { name: "area", type: "number", placeholder: "Area (m²)" },
        { name: "totalArea", type: "number", placeholder: "Total Area (m²)" },
        { name: "price", type: "text", placeholder: "Price" },
        { name: "rental", type: "text", placeholder: "Rental" },
        { name: "taxes", type: "text", placeholder: "Taxes" },
        // Adicione mais campos conforme necessário
      ],
    },
    descriptions: {
      fields: [
        {
          name: "description",
          type: "text",
          placeholder: "Description",
          inputType: "textarea",
          rows: 4,
          grid: "col-span-2",
        },
        {
          name: "details",
          type: "text",
          placeholder: "More details...",
          inputType: "textarea",
          rows: 4,
          grid: "col-span-2",
        },
      ],
    },
    midia: {
      fields: [
        {
          name: "videoUrl",
          type: "text",
          placeholder: "Video URL (YouTube)",
          grid: "col-span-2",
        },
      ],
    },
    contact: {
      title: "Property Contact Information",
      sectionType: "contact",
      fields: [
        {
          name: "contactName",
          type: "text",
          placeholder: "Name",
          grid: "col-span-2",
        },
        {
          name: "contactEmail",
          type: "email",
          placeholder: "Email",
          grid: "col-span-1",
        },
        {
          name: "contactPhone",
          type: "text",
          placeholder: "WhatsApp",
          grid: "col-span-1",
        },
        {
          name: "contactAddress",
          type: "text",
          placeholder: "Address",
          grid: "col-span-2",
        },
        {
          name: "contactNumber",
          type: "number",
          placeholder: "Number",
          grid: "col-span-1",
        },
        {
          name: "contactCity",
          type: "text",
          placeholder: "City",
          grid: "col-span-1",
        },
        {
          name: "contactState",
          type: "text",
          placeholder: "State",
          grid: "col-span-1",
        },
        {
          name: "contactPostalCode",
          type: "text",
          placeholder: "Postal Code",
          grid: "col-span-1",
        },
      ],
    },
  };

  useEffect(() => {
    if (formData.propertyType !== "Private property") {
      setFormData((prev) => ({
        ...prev,
        contactName: "",
        contactEmail: "",
        contactPhone: "",
        contactAddress: "",
        contactNumber: "",
        contactState: "",
        contactPostalCode: "",
      }));
    }
  }, [formData.propertyType]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // This function needs to be set up to create the property registration in the backend and database.
  // Essa função precisa ser configurada para criar o registro de propriedade no backend e no banco de dados.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const newErrors: Record<string, string> = {};

    // Generic validation for all mandatory fields
    // Validação genérica para todos os campos obrigatórios
    Object.values(formSections).forEach((section) => {
      section.fields.forEach((field) => {
        const value = formData[field.name as keyof typeof formData]
          ?.toString()
          .trim();

        if (field.required && !value) {
          newErrors[field.name] = "Este campo é obrigatório";
        }

      
        if (field.type === "number" && value && isNaN(Number(value))) {
          newErrors[field.name] = "Valor numérico inválido";
        }
      });
    });

    // Specific conditional validation for private properties
    // Validação condicional específica para propriedades privadas
    if (formData.propertyType === "Private property") {
      formSections.contact.fields.forEach((field) => {
        const value = formData[field.name as keyof typeof formData]
          ?.toString()
          .trim();

        if (!value) {
          newErrors[field.name] =
            "Campo obrigatório para propriedades privadas";
        }
      });
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // Lógica de envio para o backend
      const formDataToSend = new FormData();

      // Adiciona os arquivos de imagem
      files.forEach((file) => {
        formDataToSend.append("images", file);
      });

      // Adiciona os dados do formulário
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      const response = await fetch("/api/properties/new", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) throw new Error("Registration failed");

      alert("Property registered successfully!");
    } catch (error) {
      console.error("Submission error:", error);
      alert("Error registering property");
    } finally {
      setIsSubmitting(false);
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
      } w-full p-3 border rounded-sm placeholder:text-sm placeholder:text-[var(--text)] ${
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

  //   files.forEach((file) => {
  //     formDataToSend.append("images", file);
  //   });

  //   try {
  //     const response = await fetch("/api/upload", {
  //       method: "POST",
  //       body: formDataToSend,
  //     });

  //     if (!response.ok) throw new Error("Upload failed");

  //     alert("Property registered successfully!");
  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //   }
  // };

  return (
    <div className="max-w-screen p-2 bg-[var(--background-color)]">
      <div className="flex justify-between items-center border-b border-gray-300 py-2">
        <h1 className="text-2xl font-bold mb-4">Register New Property</h1>
      </div>

      <div className=" bg-[var(--card)] mt-6 p-16 rounded-sm shadow-sm">
        <form
          className="space-y-4 mb-6 space-x-3 grid grid-cols-1 md:grid-cols-2"
          onSubmit={handleSubmit}
        >
          
          <div className="border-r border-[var(--border)] gap-8">
            <div className="mb-8 ">
              <div className="flex justify-between items-center flex-wrap gap-4 mb-8 mr-8">
                {propertyTypes.map((type) => (
                  <label
                    key={type}
                    className={`flex items-center p-2 border rounded-sm cursor-pointer transition-all ${
                      formData.propertyType === type
                        ? "border-indigo-500 bg-indigo-500 ring-2 ring-indigo-300 text-white"
                        : "border hover:border-indigo-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="propertyType"
                      value={type}
                      checked={formData.propertyType === type}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                      required
                    />
                    <span className="ml-3 text-text capitalize">
                      {type.replace("_", " ")}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            <div className="mr-8">
              {Object.entries(formSections).map(([sectionName, section]) => {
                if (section.sectionType === "contact") return null;

                return (
                  <div key={sectionName} className="mb-8">
                    {section.title && (
                      <h3 className="text-lg font-semibold mb-4">
                        {section.title}
                      </h3>
                    )}
                    <div className="grid grid-cols-2 gap-4">
                      {section.fields.map(renderField)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

       
          <div className="ml-8">
            <div className=" mb-8 border-b border-[var(--border)]">
              <p className="mb-2 text-md text-text">Property Images</p>
              <span className="text-xs text-text">
                Allowed jpg, png and webp
              </span>
              <UploadImage
                files={files}
                onupdatefiles={(fileItems) =>
                  setFiles(fileItems.map((fileItem) => fileItem.file))
                }
                allowMultiple
                maxFiles={5}
                labelIdle="Drag & Drop your images or Browse"
              />
            </div>

            <div className=" gap-4 space-y-4">
              {formData.propertyType === "Private property" &&
                Object.entries(formSections).map(([sectionName, section]) => {
                  if (section.sectionType !== "contact") return null;

                  return (
                    <div key={sectionName} className="p-2 ">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-md text-text">
                          {section.title}
                        </span>
                        <Button type="button" variant="outline" size="sm">
                          Search Contact
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {section.fields.map(renderField)}
                      </div>
                    </div>
                  );
                })}
            </div>

            <div className="mt-8 flex justify-end items-center">
              <Button
                type="submit"
                variant="solid"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Registering..." : "Register Property"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
