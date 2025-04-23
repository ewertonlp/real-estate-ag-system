"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../components/ui/input";
import { loginAction } from "../../actions/auth";
import Image from "next/image";
import { Button } from "@/app/components/ui/button";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Minimum 6 characters"),
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
      console.error("Login fail:", error);
    }
  };

  return (
    <div className="grid h-screen grid-cols-1 md:grid-cols-2 w-full">
      <div className="relative md:flex-1 h-screen justify-center content-center hidden md:block bg-[var(--card)]">
        <div className="flex justify-center">
          <Image
            src="/login-image.jpg"
            alt="Login image"
            width="400"
            height="100"
            className="object-center object-cover rounded-br-4xl rounded-tl-sm shadow-2xl"
            sizes="50vw"
            priority
          />
        </div>
      </div>
      <div className="min-h-[50vh] md:min-h-full flex flex-col justify-center bg-[var(--background-color)]">
        <div className="mx-auto w-full max-w-md space-y-6 bg-[var(--card)] p-6 rounded-sm shadow-sm">
          <div className="flex flex-1 items-center justify-center bg-card p-6">
          <div className="w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold text-text ">Login</h1>
          </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 "
            >
              <div>
                <Input
                  {...register("email")}
                  placeholder="E-mail"
                  error={errors.email?.message}
                  className="border-black rounded-sm"
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
                  placeholder="Password"
                  error={errors.password?.message}
                  className="border-black rounded-sm"
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
                    Forgot password??
                  </a>
                </div>
              </div>
              <div className="flex justify-center pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-50 rounded-sm bg-[var(--primary)] px-4 py-2 text-white text-lg  hover:bg-[var(--secondary)] transition-all cursor-pointer"
              >
                {isSubmitting ? "Loading..." : "Login"}
              </Button>
              </div>
            </form>
          </div>
          </div>
          

          <p className="text-sm text-[var(--text)] text-center">
          Don&apos;t have an account?{" "}
            <a href="/register">
              <span className="text-[var(--primary)]">Sign up here</span>
            </a>
          </p>
          </div>
       
      </div>
    </div>
  );
}
