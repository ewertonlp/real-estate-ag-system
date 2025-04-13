"use client";

import { PropertyCard } from "@/app/components/propertyCard";
import { Button } from "@/app/components/ui/button";
import { mockProperties, PropertyFilters } from "@/mocks/properties";
import { House, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Filters {
  bedrooms: string;
  propertyType: string;
  minPrice: string;
  maxPrice: string;
  minArea: string;
  yearBuilt: string;
}

export default function Properties() {
  const router = useRouter();
  const [filters, setFilters] = useState<Filters>({
    bedrooms: "",
    propertyType: "",
    minPrice: "",
    maxPrice: "",
    minArea: "",
    yearBuilt: "",
  });

  const handleViewDetails = (propertyId: string) => {
    router.push(`/dashboard/properties/${propertyId}`);
  };

  const handleFilterChange = (name: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      bedrooms: "",
      propertyType: "",
      minPrice: "",
      maxPrice: "",
      minArea: "",
      yearBuilt: "",
    });
  };

  const filteredProperties = mockProperties.filter((property) => {
    const numericFilters = {
      bedrooms: Number(filters.bedrooms),
      minPrice: Number(filters.minPrice),
      maxPrice: Number(filters.maxPrice),
      minArea: Number(filters.minArea),
      yearBuilt: Number(filters.yearBuilt),
    };

    return (
      (filters.bedrooms === "" ||
        property.bedrooms >= numericFilters.bedrooms) &&
      (filters.propertyType === "" ||
        property.propertyType === filters.propertyType) &&
      (filters.minPrice === "" || property.price >= numericFilters.minPrice) &&
      (filters.maxPrice === "" || property.price <= numericFilters.maxPrice) &&
      (filters.minArea === "" || property.area >= numericFilters.minArea) &&
      (filters.yearBuilt === "" ||
        property.yearBuilt >= numericFilters.yearBuilt)
    );
  });

  return (
    <div className="max-w-screen p-2 bg-[var(--background-color)]">
      <div className="flex justify-between items-center border-b border-[var(--border)] py-4">
        <div className="flex items-center">
          <House size={28} className="text-text" />
          <h1 className="ml-2 text-2xl font-bold">Properties</h1>
        </div>
        <div>
          <Link href="/dashboard/properties/new" passHref>
            <Button variant="solid" size="md">
              <Plus size={18} className="mr-2" />
              Add New Property
            </Button>
          </Link>
        </div>
      </div>

      <div className="bg-[var(--card)] shadow rounded-sm overflow-hidden mt-6 px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-grow">
            <PropertyFilters
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>
          <div className="flex items-center justify-end lg:self-end lg:w-auto">
            <Button
              variant="outline"
              onClick={handleResetFilters}
              className="border-[var(--primary)] w-full lg:w-[120px]"
            >
              Reset Filters
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 ">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <div key={property.id}>
                {/* Link para detalhes */}
                <Link
                  href={`/dashboard/properties/${property.id}`}
                  passHref
                  legacyBehavior
                >
                  <a className="block h-full">
                    <PropertyCard
                      property={property}
                      onViewDetails={() => handleViewDetails(property.id)}
                    />
                  </a>
                </Link>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-text">
                No properties found matching the filters
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
