// components/PropertyCard.tsx
import { Property } from "@/types";
import Image from "next/image";
import { useState } from "react";
import { Button } from "./ui/button";
import { Bath, Bed, Heart, House, Images, Ruler } from "lucide-react";

interface Property {
  id: string;
  title: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  propertyType: string;
  images: Array<{ url: string }>;
  yearBuilt: number;
  description?: string;
  details?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  taxes?: number;
}

interface PropertyCardProps {
  property: Property;
  onViewDetails?: () => void;
}

export function PropertyCard({ property, onViewDetails }: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [mainImage] = useState(property.images[0]);

  return (
    <div
      className="group relative bg-[var(--card)] rounded-lg shadow-sm border border-[var(--border)] overflow-hidden transition-all duration-300 hover:shadow-lg"
      role="button"
      tabIndex={0}
      onClick={onViewDetails}
      onKeyDown={(e) => e.key === "Enter" && onViewDetails?.()}
    >
      {/* Image Section */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={property.images[0]?.url}
          alt={property.title}
          width={400}
          height={300}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          quality={90}
          loading="lazy"
          placeholder="blur" 
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII="
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/default-property.jpg";
          }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
        />
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h3 className="text-lg font-semibold truncate mb-2">
          {property.title}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl font-bold text-[var(--primary)]">
            ${property.price.toLocaleString()}
          </span>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 text-sm text-[var(--text-secondary)]">
          <div className="flex items-center gap-1">
            <Bed size={16} />
            {property.bedrooms}
          </div>
          <div className="flex items-center gap-1">
            <Bath size={16} />
            {property.bathrooms}
          </div>
          <div className="flex items-center gap-1">
            <Ruler size={16} />
            {property.area}m²
          </div>
        </div>
      </div>
    </div>
  );
}
