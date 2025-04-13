"use server"

import { z } from "zod";
import { propertySchema } from "../schemas/property";

export const createPropertyAction = async (data: z.infer<typeof propertySchema>) => {
    try {
      const validatedData = propertySchema.parse(data);
      
      return await prisma.property.create({
        data: {
          ...validatedData,
          address: {
            create: validatedData.address
          },
          images: {
            create: validatedData.images.map(url => ({ url }))
          }
        },
        include: {
          address: true,
          images: true
        }
      });
    } catch (error) {
      console.error('Erro ao criar imóvel:', error);
      throw new Error('Falha ao cadastrar imóvel');
    }
  };