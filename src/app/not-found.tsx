"use client"

import Image from "next/image"

export default function NotFound () {


return (


<div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
  <div className="max-w-lg w-full text-center space-y-8">
    {/* Número 404 com efeito gradiente */}
      <div className="flex justify-center">
              <Image
                src="/404.svg"
                alt="Page not found"
                width="500"
                height="100"
                className="object-center object-cover"
                sizes="50vw"
                priority
              />
            </div>
    

    {/* Mensagem principal */}
    <div className="space-y-4">
      <h2 className="text-3xl font-semibold text-gray-900">
        Oops! Page Not Found
      </h2>
      <p className="text-lg text-text">
      The page you&apos;re looking for might have been removed or is temporarily unavailable.
      </p>
    </div>

    {/* Botão de ação */}
    <a 
      href="/dashboard"
      className="inline-block px-8 py-3 bg-[var(--primary)] text-white font-medium rounded-sm shadow-lg transform transition-all hover:bg-[var(--primary)]/90"
    >
      Voltar para a página inicial
    </a>

    {/* Elementos decorativos */}
    <div className="absolute top-20 left-20 w-32 h-32 bg-[var(--primary)]/80 rounded-full opacity-20 mix-blend-multiply filter blur-xl"></div>
    <div className="absolute bottom-20 right-20 w-32 h-32 bg-[var(--primary)]/50 rounded-full opacity-20 mix-blend-multiply filter blur-xl"></div>
  </div>
</div>
)
}