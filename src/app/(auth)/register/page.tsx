"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../components/ui/input";
import { registerAction } from "../../actions/auth";
import Image from "next/image";
import Link from "next/link";

const registerSchema = z
  .object({
    name: z.string().min(3, "Mínimo 3 caracteres"),
    email: z.string().email("E-mail inválido"),
    password: z
      .string()
      .min(8, "Mínimo 8 caracteres")
      .regex(/[A-Z]/, "Pelo menos 1 letra maiúscula")
      .regex(/[0-9]/, "Pelo menos 1 número"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não coincidem",
    path: ["confirmPassword"],
  });

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    try {
      await registerAction(data);
    } catch (error) {
      console.error("Erro no registro:", error);
    }
  };

  return (
    <div className="grid h-screen grid-cols-1 md:grid-cols-2 w-full">
      <div className="relative md:flex-1 h-screen justify-center content-center hidden md:block bg-[var(--card)]">
        <div className="flex justify-center">
          <Image
            src="/login-image.webp"
            alt="Imagem de login"
            width="486"
            height="150"
            className="object-center object-cover rounded-br-4xl rounded-tl-xl shadow-2xl"
            sizes="50vw"
            priority
          />
        </div>
      </div>
      <div className="flex min-h-[50vh] flex-col justify-center md:min-h-full bg-[var(--background-color)]">
        <div className="mx-auto w-full max-w-md space-y-6 bg-[var(--card)] p-6 rounded-2xl shadow-md">
          <div className="flex flex-1 items-center justify-center bg-card p-6">
            <div className="w-full max-w-md space-y-6">
              <div className="space-y-2 text-center">
                <h1 className="text-2xl font-semibold text-text">Criar Conta</h1>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Input
                    {...register("name")}
                    placeholder="Nome completo"
                    error={errors.name?.message}
                    className="border-[var(--border)] bg-[var(--background-color)]"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <Input
                    {...register("email")}
                    placeholder="E-mail"
                    error={errors.email?.message}
                       className="border-[var(--border)] bg-[var(--background-color)]"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <Input
                    type="password"
                    {...register("password")}
                    placeholder="Senha"
                    error={errors.password?.message}
                       className="border-[var(--border)] bg-[var(--background-color)]"
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div>
                  <Input
                    type="password"
                    {...register("confirmPassword")}
                    placeholder="Confirme sua senha"
                    error={errors.confirmPassword?.message}
                       className="border-[var(--border)] bg-[var(--background-color)]"
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
                <div className="flex justify-center pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-50 rounded-lg bg-[var(--primary)] px-4 py-2 text-white text-lg uppercase hover:bg-[var(--secondary)] transition-all cursor-pointer"
                  >
                    {isSubmitting ? "Criando conta..." : "Criar Conta"}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <p className="text-sm text-[var(--text)] text-center">
            Já possui conta?{" "}
            <Link href="/login">
              <span className="text-[var(--primary)]">Faça login aqui</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
