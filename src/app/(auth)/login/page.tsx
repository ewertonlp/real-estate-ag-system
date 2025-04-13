"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../components/ui/input";
import { loginAction } from "../../actions/auth";
import Image from "next/image";

const schema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      await loginAction(data);
    } catch (error) {
      console.error("Login falhou:", error);
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
          <div className="space-y-2 text-center ">
            <h1 className="text-2xl font-bold text-text">Login</h1>
            <p className="text-sm text-[var(--text)]">
              Faça seu login para acessar o painel administrativo.
            </p>

            <hr className="my-6 border-t border-[var(--border)]" />

            <p className="text-sm text-[var(--text)]">
              Utilize seu email e senha para entrar na plataforma.
            </p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="max-w-md space-y-4 py-4"
            >
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
                <div className="flex justify-end items-center">
                  <a
                    href="/forgot-password"
                    className="text-[var(--text)] text-xs hover:text-[var(--primary)] transition-all"
                  >
                    Esqueceu a senha?
                  </a>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-50 rounded-lg bg-[var(--primary)] px-4 py-2 text-white text-lg uppercase hover:bg-[var(--secondary)] transition-all cursor-pointer"
              >
                {isSubmitting ? "Carregando..." : "Entrar"}
              </button>
            </form>
          </div>
          <p className="text-sm text-[var(--text)] text-center">
            Não possui uma conta?{" "}
            <a href="/register">
              <span className="text-[var(--primary)]">Cadastre-se agora</span>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
