import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white px-6 py-12 text-gray-900 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl space-y-16">
        {/* Encabezado con Logo */}
        <header className="mb-12 text-center">
          <div className="flex flex-col items-center gap-4 mb-6">
            <div className="relative h-16 w-16">
              <Image
                src="/AURA.png"
                alt="AURA Logo"
                fill
                className="object-contain"
              />
            </div>
            <div className="space-y-1">
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
                AURA
              </h1>
              <p className="text-sm text-gray-600 uppercase tracking-[0.3em] font-medium">
                Adaptive Unified Responsive Atmosphere
              </p>
            </div>
          </div>
        </header>

        {/* Sección Hero */}
        <section className="grid gap-10 xl:grid-cols-[1.3fr_1fr] xl:items-center">
          <div className="space-y-6">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Convierte tu espacio en un ambiente inteligente, cómodo y eficiente
            </h1>
            <p className="text-lg leading-8 text-gray-600">
              AURA monitorea temperatura, iluminación y presencia en tiempo real para mejorar tu confort, potenciar la concentración y optimizar el consumo energético. Una interfaz clara, moderna y fácil de usar para cualquier persona.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/login" className="inline-flex items-center justify-center rounded-3xl bg-cyan-500 px-8 py-4 text-base font-semibold text-white transition hover:bg-cyan-600">
                Iniciar sesión
              </Link>
              <Link href="/register" className="inline-flex items-center justify-center rounded-3xl border-2 border-cyan-500 bg-white px-8 py-4 text-base font-semibold text-cyan-600 transition hover:bg-cyan-50">
                Registrarse gratis
              </Link>
            </div>
          </div>

          {/* Vista previa del dashboard */}
          <div className="rounded-[2.5rem] border border-gray-200 bg-gray-50 p-8 shadow-lg">
            <div className="space-y-4">
              <div className="rounded-3xl bg-white p-6 shadow-md border border-gray-100">
                <p className="text-sm uppercase tracking-[0.2em] text-gray-500 font-semibold">Temperatura</p>
                <p className="mt-3 text-5xl font-bold text-cyan-600">22.0°C</p>
                <p className="mt-2 text-sm text-gray-600">Umbral: 25.0°C</p>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-md border border-gray-100">
                <p className="text-sm uppercase tracking-[0.2em] text-gray-500 font-semibold">Iluminación</p>
                <p className="mt-3 text-5xl font-bold text-amber-600">500 lux</p>
                <p className="mt-2 text-sm text-gray-600">Recomendado: 400 lux</p>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-md border border-gray-100">
                <p className="text-sm uppercase tracking-[0.2em] text-gray-500 font-semibold">Presencia</p>
                <p className="mt-3 text-3xl font-bold text-emerald-600">Detectada</p>
                <p className="mt-2 text-sm text-gray-600">Modo: Adaptivo</p>
              </div>
            </div>
          </div>
        </section>

        {/* Sección de Beneficios */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900">¿Por qué elegir AURA?</h2>
            <p className="mt-4 text-lg text-gray-600">Beneficios clave de nuestro sistema</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Monitoreo en tiempo real */}
            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg hover:shadow-xl transition">
              <div className="mb-4 inline-flex rounded-2xl bg-cyan-100 p-4">
                <svg className="h-8 w-8 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Monitoreo en tiempo real</h3>
              <p className="mt-3 text-gray-600">Datos actualizados instantáneamente para que siempre sepas el estado de tu espacio.</p>
            </div>

            {/* Control Adaptativo */}
            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg hover:shadow-xl transition">
              <div className="mb-4 inline-flex rounded-2xl bg-amber-100 p-4">
                <svg className="h-8 w-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5a4 4 0 100-8 4 4 0 000 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Control adaptativo</h3>
              <p className="mt-3 text-gray-600">Los sistemas se ajustan automáticamente según tus preferencias y patrones.</p>
            </div>

            {/* Ahorro energético */}
            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg hover:shadow-xl transition">
              <div className="mb-4 inline-flex rounded-2xl bg-emerald-100 p-4">
                <svg className="h-8 w-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Ahorro energético</h3>
              <p className="mt-3 text-gray-600">Optimiza el consumo de energía y reduce costos operativos significativamente.</p>
            </div>

            {/* Visualización clara */}
            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg hover:shadow-xl transition">
              <div className="mb-4 inline-flex rounded-2xl bg-purple-100 p-4">
                <svg className="h-8 w-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Visualización clara</h3>
              <p className="mt-3 text-gray-600">Gráficas intuitivas que cualquiera puede entender sin conocimientos técnicos.</p>
            </div>
          </div>
        </section>

        {/* Sección Cómo Funciona */}
        <section className="space-y-12 py-12">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900">Cómo funciona AURA</h2>
            <p className="mt-4 text-lg text-gray-600">Tres pasos simples para un ambiente inteligente</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Paso 1: Detectar */}
            <div className="text-center space-y-4">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-cyan-100">
                <span className="text-4xl font-bold text-cyan-600">1</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Detectar</h3>
              <p className="text-gray-600 leading-relaxed">
                Nuestros sensores recopilan datos en tiempo real sobre temperatura, iluminación y presencia en tu espacio.
              </p>
              <div className="pt-4">
                <div className="rounded-2xl bg-cyan-50 p-4 border border-cyan-100">
                  <p className="text-sm font-semibold text-cyan-700">Sensores inteligentes</p>
                </div>
              </div>
            </div>

            {/* Paso 2: Analizar */}
            <div className="text-center space-y-4">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-amber-100">
                <span className="text-4xl font-bold text-amber-600">2</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Analizar</h3>
              <p className="text-gray-600 leading-relaxed">
                El sistema procesa los datos y los presenta en gráficos claros e intuitivos en el dashboard AURA.
              </p>
              <div className="pt-4">
                <div className="rounded-2xl bg-amber-50 p-4 border border-amber-100">
                  <p className="text-sm font-semibold text-amber-700">Inteligencia adaptativa</p>
                </div>
              </div>
            </div>

            {/* Paso 3: Actuar */}
            <div className="text-center space-y-4">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
                <span className="text-4xl font-bold text-emerald-600">3</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Actuar</h3>
              <p className="text-gray-600 leading-relaxed">
                Los actuadores responden automáticamente para optimizar tu comodidad y ahorro energético.
              </p>
              <div className="pt-4">
                <div className="rounded-2xl bg-emerald-50 p-4 border border-emerald-100">
                  <p className="text-sm font-semibold text-emerald-700">Automatización inteligente</p>
                </div>
              </div>
            </div>
          </div>

          {/* Conexión visual entre pasos */}
          <div className="hidden md:flex items-center justify-between px-8 -mt-8">
            <div className="flex-1 h-1 bg-gradient-to-r from-cyan-500 to-amber-500"></div>
            <div className="flex-1 h-1 bg-gradient-to-r from-amber-500 to-emerald-500"></div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="rounded-[2rem] border border-gray-200 bg-gradient-to-r from-cyan-50 to-blue-50 p-12 text-center shadow-lg">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            ¿Listo para transformar tu espacio?
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-700 mb-8">
            Únete a AURA hoy y experimenta el control inteligente del ambiente con una interfaz clara y moderna.
          </p>
          <Link href="/register" className="inline-flex items-center justify-center rounded-3xl bg-cyan-500 px-10 py-4 text-lg font-semibold text-white transition hover:bg-cyan-600">
            Comenzar ahora
          </Link>
        </section>
      </div>
    </main>
  );
}
