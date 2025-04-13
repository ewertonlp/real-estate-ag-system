// components/property-form.tsx
'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/app/components/ui/buttonPagination';
import { UploadButton } from '@uploadthing/react';
import { createPropertyAction } from '../../actions/property'
import { useState } from 'react';
import Image from 'next/image';

const propertySchema = z.object({
  title: z.string().min(5, 'Mínimo 5 caracteres'),
  description: z.string().min(20, 'Mínimo 20 caracteres'),
  price: z.number().min(0, 'Valor inválido'),
  propertyType: z.enum(['CASA', 'APARTAMENTO', 'TERRENO', 'COMERCIAL']),
  bedrooms: z.number().min(0, 'Número inválido'),
  area: z.number().min(1, 'Área inválida'),
  address: z.object({
    street: z.string().min(3),
    city: z.string().min(3),
    state: z.string().length(2),
    zipCode: z.string().min(8).max(9),
  }),
  images: z.array(z.string()).min(1, 'Pelo menos 1 imagem')
});

export function PropertyForm() {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof propertySchema>>({
    resolver: zodResolver(propertySchema),
  });

  const onSubmit = async (data: z.infer<typeof propertySchema>) => {
    try {
      await createPropertyAction(data);
      // Redirecionar ou mostrar sucesso
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Seção Principal */}
        <div className="space-y-4">
          <Input
            label="Título do Imóvel"
            {...register("title")}
            error={errors.title?.message}
          />

          <Input
            label="Descrição"
            as="textarea"
            rows={4}
            {...register("description")}
            error={errors.description?.message}
          />

          <Input
            label="Preço"
            type="number"
            step="0.01"
            {...register("price", { valueAsNumber: true })}
            error={errors.price?.message}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Imóvel
            </label>
            <select
              {...register("propertyType")}
              className="w-full rounded-lg border bg-card px-4 py-2 text-text focus:outline-primary"
            >
              <option value="CASA">Casa</option>
              <option value="APARTAMENTO">Apartamento</option>
              <option value="TERRENO">Terreno</option>
              <option value="COMERCIAL">Comercial</option>
            </select>
          </div>
        </div>

        {/* Detalhes do Imóvel */}
        <div className="space-y-4">
          <Input
            label="Número de Quartos"
            type="number"
            {...register("bedrooms", { valueAsNumber: true })}
            error={errors.bedrooms?.message}
          />

          <Input
            label="Área (m²)"
            type="number"
            {...register("area", { valueAsNumber: true })}
            error={errors.area?.message}
          />

          <Input
            label="CEP"
            {...register("address.zipCode")}
            error={errors.address?.zipCode?.message}
          />

          <Input
            label="Rua"
            {...register("address.street")}
            error={errors.address?.street?.message}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Cidade"
              {...register("address.city")}
              error={errors.address?.city?.message}
            />
            <Input
              label="Estado"
              {...register("address.state")}
              error={errors.address?.state?.message}
            />
          </div>
        </div>
      </div>

      {/* Upload de Imagens */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Fotos do Imóvel
        </label>
        <UploadButton
          endpoint="propertyImages"
          onClientUploadComplete={(res) => {
            const urls = res.map(file => file.url);
            setUploadedImages(urls);
            setValue("images", urls);
          }}
          className="ut-button:bg-primary ut-button:text-white ut-button:hover:bg-primary/90"
        />
        {errors.images && (
          <p className="mt-1 text-sm text-red-500">{errors.images.message}</p>
        )}
        <div className="mt-4 grid grid-cols-3 gap-4">
          {uploadedImages.map((url) => (
            <Image
              key={url}
              src={url}
              alt="Preview"
              className="h-32 w-full object-cover rounded-lg"
            />
          ))}
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Salvando...' : 'Cadastrar Imóvel'}
      </Button>
    </form>
  );
}