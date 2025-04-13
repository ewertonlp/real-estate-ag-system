import { z } from 'zod';

export const propertySchema = z.object({
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