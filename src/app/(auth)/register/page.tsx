"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../components/ui/input";
import { registerAction } from "../../actions/auth";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";

const registerSchema = z
  .object({
    name: z.string().min(3, "Minimum 3 characters"),
    email: z.string().email("Invalid email"),
    password: z
      .string()
      .min(8, "Minimum 8 characters")
      .regex(/[A-Z]/, "At least 1 uppercase letter")
      .regex(/[0-9]/, "At least 1 number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
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
      console.error("Registry error:", error);
    }
  };

  return (
    <div className="grid h-screen grid-cols-1 md:grid-cols-2 w-full">
      <div className="relative md:flex-1 h-screen justify-center content-center hidden md:block bg-[var(--card)]">
        <div className="flex justify-center">
          <Image
            src="/register-image.jpg"
            alt="Register image"
            width="486"
            height="150"
            className="object-center object-cover rounded-br-4xl rounded-tl-sm shadow-2xl"
            sizes="50vw"
            priority
          />
        </div>
      </div>
      <div className="flex min-h-[50vh] flex-col justify-center md:min-h-full bg-[var(--background-color)]">
        <div className="mx-auto w-full max-w-md space-y-6 bg-[var(--card)] p-6 rounded-sm shadow-sm">
          <div className="flex flex-1 items-center justify-center bg-card p-6">
            <div className="w-full max-w-md space-y-6">
              <div className="space-y-2 text-center">
                <h1 className="text-2xl font-semibold text-text">Register New Account</h1>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Input
                    {...register("name")}
                    placeholder="Full name"
                    error={errors.name?.message}
                    className="border-black rounded-sm"
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
                  <Input
                    type="password"
                    {...register("confirmPassword")}
                    placeholder="Confirm paswword"
                    error={errors.confirmPassword?.message}
                       className="border-black rounded-sm"
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
                <div className="flex justify-center pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-50 rounded-sm bg-[var(--primary)] px-4 py-2 text-white text-lg hover:bg-[var(--secondary)] transition-all cursor-pointer"
                  >
                    {isSubmitting ? "Creating Account..." : "Create Account"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
          <p className="text-sm text-[var(--text)] text-center">
          Already have an account?{" "}
            <Link href="/login">
              <span className="text-[var(--primary)]">Log in here</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
