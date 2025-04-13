"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { loginSchema, registerSchema } from "../schemas/auth";

// import { prisma } from "@/lib/prisma";

export async function loginAction(data: z.infer<typeof loginSchema>) {
  try {
    // Implementar lógica de autenticação
    const user = await prisma.user.findUnique({ where: { email: data.email } });

    if (!user || !bcrypt.compareSync(data.password, user.password)) {
      throw new Error("Credenciais inválidas");
    }

    // Criar sessão
    await createSession(user.id);
  } catch (error) {
    return { error: (error as Error).message };
  }

  redirect("/dashboard");
}

export async function registerAction(data: z.infer<typeof registerSchema>) {
  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new Error("E-mail já cadastrado");
    }

    await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });

    return { success: true };
  } catch (error) {
    return { error: (error as Error).message };
  }
}

