// mockProperties.ts
import { Property } from "../types";

export const mockProperties: Property[] = [
  {
    id: "1",
    title: "Modern Downtown Apartment",
    address: "123 Main St, Downtown",
    price: 850000,
    yearBuilt: 2020,
    bedrooms: 2,
    bathrooms: 2,
    area: 120,
    description: "Luxury apartment with panoramic city views",
    details: "Floor-to-ceiling windows, smart home system, rooftop pool",
    images: [
      { url: "/apt1.jpg", alt: "Living room" },
      { url: "/apt1.jpg", alt: "Kitchen" }
    ],
    propertyType: "Apartamento",
    contactName: "John Doe",
    contactEmail: "john@imob.com",
    contactPhone: "+55 11 9999-9999",
    taxes: 3500,
    features: ["Swimming Pool", "Gym", "Parking", "Security System"]
  },
  {
    id: "2",
    title: "Family House with Garden",
    address: "456 Oak Ave, Suburb",
    price: 2500000,
    yearBuilt: 2015,
    bedrooms: 4,
    bathrooms: 3,
    area: 300,
    description: "Spacious family home with private garden",
    details: "Pool, BBQ area, home theater",
    images: [
      { url: "/house1.jpg", alt: "Living room" },
      { url: "/house1.jpg", alt: "Kitchen" }
    ],
    videoUrl: "https://example.com/video1",
    propertyType: "Casa",
    contactName: "Jane Smith",
    contactEmail: "jane@imob.com",
    taxes: 5800,
    features: ["Swimming Pool", "Gym", "Parking", "Security System"]
  },
  {
    id: "3",
    title: "Commercial Space Prime Location",
    address: "789 Business Rd, Financial District",
    price: 4500000,
    yearBuilt: 2018,
    bedrooms: 0,
    bathrooms: 4,
    area: 500,
    description: "Premium office space ready to move in",
    details: "Open concept, fiber internet, meeting rooms",
    images: [
      { url: "/office1.jpg", alt: "Living room" },
      { url: "/office1.jpg", alt: "Kitchen" }
    ],
    propertyType: "Comercial",
    taxes: 12000,
    features: ["Swimming Pool", "Gym", "Parking", "Security System"]
  },
  {
    id: "4",
    title: "Beachfront Property",
    address: "101 Beach Blvd, Coast",
    price: 6800000,
    yearBuilt: 2022,
    bedrooms: 5,
    bathrooms: 4,
    area: 450,
    description: "Luxury beachfront villa",
    details: "Private beach access, infinity pool, smart home",
    images: [
      { url: "/villa1.jpg", alt: "Living room" },
      { url: "/villa1.jpg", alt: "Kitchen" }
    ],
    propertyType: "Casa",
    contactPhone: "+55 11 8888-8888",
    taxes: 9500,
    features: ["Swimming Pool", "Gym", "Parking", "Security System"]
  },
  {
    id: "5",
    title: "Compact Studio Apartment",
    address: "234 City Center, Downtown",
    price: 350000,
    yearBuilt: 2019,
    bedrooms: 1,
    bathrooms: 1,
    area: 45,
    description: "Affordable downtown living",
    details: "Fully furnished, gym access",
    images: [
      { url: "/studio1.jpg", alt: "Living room" },
      { url: "/studio2.jpg", alt: "Kitchen" }
    ],
    propertyType: "Apartamento",
    taxes: 1800,
    features: ["Swimming Pool", "Gym", "Parking", "Security System"]
  },
];

// Filtros atualizados para sua interface
type FilterCriteria = {
  bedrooms: string;
  propertyType: string;
  minPrice: string;
  maxPrice: string;
  minArea: string;
  yearBuilt: string;
};

// Função de filtragem ajustada
export const filterProperties = (
  properties: Property[],
  filters: FilterCriteria
) => {
  return properties.filter((property) => {
    const meetsBedrooms =
      !filters.bedrooms || property.bedrooms >= parseInt(filters.bedrooms);

    const meetsType =
      !filters.propertyType || property.propertyType === filters.propertyType;

    const meetsMinPrice =
      !filters.minPrice || property.price >= parseInt(filters.minPrice);

    const meetsMaxPrice =
      !filters.maxPrice || property.price <= parseInt(filters.maxPrice);

    const meetsMinArea =
      !filters.minArea || property.area >= parseInt(filters.minArea);

    const meetsYear =
      !filters.yearBuilt || property.yearBuilt >= parseInt(filters.yearBuilt);

    return (
      meetsBedrooms &&
      meetsType &&
      meetsMinPrice &&
      meetsMaxPrice &&
      meetsMinArea &&
      meetsYear
    );
  });
};

// Componente de filtro atualizado
// Componente de filtro atualizado
export const PropertyFilters = ({
  filters,
  onFilterChange,
}: {
  filters: FilterCriteria;
  onFilterChange: (name: string, value: string) => void;
}) => (
  <div className="flex flex-wrap items-end gap-4 w-full">
    {/* Filtro de Dormitórios */}
    <div className="flex-1 min-w-[160px]">
      <label className="block text-sm mb-1">Dorms</label>
      <select
        name="bedrooms"
        value={filters.bedrooms}
        onChange={(e) => onFilterChange(e.target.name, e.target.value)}
        className="w-full h-10 p-2 border rounded bg-[var(--card)]"
      >
        <option value="">Any</option>
        {[1, 2, 3, 4, 5].map((n) => (
          <option key={n} value={n}>{n}+</option>
        ))}
      </select>
    </div>

    {/* Filtro de Tipo */}
    <div className="flex-1 min-w-[160px]">
      <label className="block text-sm mb-1">Tipo</label>
      <select
        name="propertyType"
        value={filters.propertyType}
        onChange={(e) => onFilterChange(e.target.name, e.target.value)}
        className="w-full h-10 p-2 border rounded bg-[var(--card)]"
      >
        <option value="">All</option>
        <option value="Casa">House</option>
        <option value="Apartamento">Apartment</option>
        <option value="Comercial">Comercial</option>
      </select>
    </div>

    {/* Filtro de Preço Mínimo */}
    <div className="flex-1 min-w-[160px]">
      <label className="block text-sm mb-1">Minimum Price</label>
      <input
        type="number"
        name="minPrice"
        value={filters.minPrice}
        onChange={(e) => onFilterChange(e.target.name, e.target.value)}
        placeholder="$"
        className="w-full h-10 p-2 border rounded bg-[var(--card)]"
      />
    </div>

    {/* Filtro de Preço Máximo */}
    <div className="flex-1 min-w-[160px]">
      <label className="block text-sm mb-1">Maximum price</label>
      <input
        type="number"
        name="maxPrice"
        value={filters.maxPrice}
        onChange={(e) => onFilterChange(e.target.name, e.target.value)}
        placeholder="$"
        className="w-full h-10 p-2 border rounded bg-[var(--card)]"
      />
    </div>

    {/* Filtro de Área Mínima */}
    <div className="flex-1 min-w-[160px]">
      <label className="block text-sm mb-1">Min Area (m²)</label>
      <input
        type="number"
        name="minArea"
        value={filters.minArea}
        onChange={(e) => onFilterChange(e.target.name, e.target.value)}
        className="w-full h-10 p-2 border rounded bg-[var(--card)]"
      />
    </div>

  </div>
);

