// app/properties/[id]/page.tsx
"use client";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import { mockProperties } from "@/mocks/properties";
import { CheckCircle, Facebook, Mail, MessageCircle, MoveLeft, Phone, Share2, Twitter } from "lucide-react";
import { Input } from "@/app/components/ui/input";
import { DetailItem } from "@/app/components/detailItem";

export default function PropertyDetails() {
  const router = useRouter();
  const params = useParams();
  const propertyId = params.id as string;
  const property = mockProperties.find((p) => p.id === propertyId);

  if (!property) {
    return (
      <div className="max-w-screen p-2 bg-[var(--background-color)]">
        <div className="text-center py-12">
          <p className="text-xl text-text">Property not found</p>
          <Button className="mt-4 text-text" onClick={() => router.back()}>
            <MoveLeft className="mr-2 text-[var(--primary)] " size={26} /> Back
            to Properties
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-screen p-2 bg-[var(--background-color)]">
      <div className="flex items-center gap-4 mb-6 py-4 border-b border-[var(--border)]">
        <Button variant="ghost" onClick={() => router.back()}>
          <MoveLeft size={28} className="mr-2 text-[var(--text)]" />
        </Button>
        <h1 className="text-2xl font-bold">{property.title}</h1>
      </div>

      <div className="bg-[var(--card)] rounded-sm shadow p-6">
        {/* Galeria de Imagens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {property.images.map((image, index) => (
            <div
              key={index}
              className="relative aspect-video rounded-sm overflow-hidden"
            >
              <Image
                src={image.url}
                alt={image.alt || `Property image ${index + 1}`}
                className="object-cover w-full h-full"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>

        {/* Detalhes Principais */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <DetailItem
            label="Price"
            value={`$${property.price.toLocaleString()}`}
          />
          <DetailItem label="Bedrooms" value={property.bedrooms} />
          <DetailItem label="Bathrooms" value={property.bathrooms} />
          <DetailItem label="Area" value={`${property.area}m²`} />
          <DetailItem label="Year Built" value={property.yearBuilt} />
          <DetailItem label="Property Type" value={property.propertyType} />
        </div>

        {/* Descrição */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Description</h2>
          <p className="text-text">{property.description}</p>
        </div>

        {/* Características */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Features</h2>
          {property.features && property.features.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {property.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="text-green-500" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-text">No features listed</p>
          )}
        </div>

        {/* Contato */}
        <div className="border-t pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Informações do Corretor */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Listing Agent</h2>
              <div className="flex items-start gap-4">
                
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{property.contactName}</h3>
                  <div className="space-y-2 mt-2">
                    {property.contactPhone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <a href={`tel:${property.contactPhone}`} className="hover:underline">
                          {property.contactPhone}
                        </a>
                      </div>
                    )}
                    {property.contactEmail && (
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <a href={`mailto:${property.contactEmail}`} className="hover:underline">
                          {property.contactEmail}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Opções de Compartilhamento */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Share this Property</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <Button
                  variant="outline"
                  onClick={() => window.open(
                    `https://wa.me/?text=${encodeURIComponent(shareText)}`,
                    '_blank'
                  )}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
                    '_blank'
                  )}
                >
                  <Facebook className="w-4 h-4 mr-2" />
                  Facebook
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.open(
                    `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
                    '_blank'
                  )}
                >
                  <Twitter className="w-4 h-4 mr-2" />
                  Twitter
                </Button>
                <Button
                  variant="outline"
                  className="md:col-span-3"
                  onClick={() => navigator.share?.({ title: property.title, text: shareText, url: shareUrl })}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Other Options
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
