import { Heart, Lock, Brain, Sprout, UserCheck } from "lucide-react";

export default function Values() {
  const values = [
    {
      icon: <Heart size={28} strokeWidth={1.5} />,
      title: "Empathy First",
      desc: "Kami mendengar, bukan menghakimi. Setiap orang punya cerita yang layak didengar.",
      color: "bg-red-50 text-red-500",
      image: '/Empati.webp'
    },
    {
      icon: <Lock size={28} strokeWidth={1.5} />,
      title: "Safe & Confidential",
      desc: "Privasi adalah prioritas. Ceritamu aman dan tidak akan pernah diperjualbelikan.",
      color: "bg-blue-50 text-blue-500",
      image: '/Safe.webp'
    },
    {
      icon: <Brain size={28} strokeWidth={1.5} />,
      title: "Self-Awareness",
      desc: "Bukan memberi label, tetapi membantu kamu memahami pola emosimu dengan bijak.",
      color: "bg-purple-50 text-purple-500",
      image: '/Self.webp'
    },
    {
      icon: <Sprout size={28} strokeWidth={1.5} />,
      title: "Growth",
      desc: "Tidak harus sempurna untuk bertumbuh. Setiap langkah kecil sangat berarti bagi kami.",
      color: "bg-green-50 text-green-500",
      image: '/growth.webp'
    },
    {
      icon: <UserCheck size={28} strokeWidth={1.5} />,
      title: "Human + AI",
      desc: "Teknologi membantu membaca pola, tetapi kamu tetap pemegang kendali penuh.",
      color: "bg-orange-50 text-orange-500",
      image: '/Ai.webp'
    }
  ];

  return (
    <section className="max-w-[1200px] mx-auto py-24 px-6 relative overflow-hidden">
      {/* Background dekorasi */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#8FD6B4] opacity-20 blur-3xl rounded-full"></div>
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-blue-300 opacity-20 blur-3xl rounded-full"></div>

      {/* Title */}
      <div className="text-center mb-16">
        <h2 className="text-[44px] font-semibold text-[#1E293B] mb-6">
          Our Values
        </h2>
        <p className="text-[#64748B] max-w-2xl mx-auto">
          Prinsip utama yang kami pegang untuk menemani perjalanan kesehatan mentalmu dengan cara yang lebih manusiawi.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-y-12">
        {values.map((item, i) => (
          <div
            key={i}
            style={{ animationDelay: `${i * 0.25}s` }}
            className={`wind-card group bg-white rounded-[16px] border border-gray-200 shadow-md p-8 relative overflow-hidden transition-all duration-500
            hover:shadow-2xl hover:-translate-y-3
            ${i === 0 ? 'md:col-span-2 lg:col-span-1 md:row-span-2 flex flex-col justify-end' : ''}
            `}
          >
            {/* Image */}
            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                // Perubahan di sini: Mengganti object-contain menjadi object-cover di class dasar
                className={`absolute object-cover opacity-40 transition-all duration-500 group-hover:scale-110 group-hover:opacity-70
                ${i === 0 ? 'top-0 left-0 w-full h-[60%] p-4' : 'top-4 right-4 w-24 h-24'}
                `}
              />
            )}

            {/* Content */}
            <div className={`relative z-10 ${i === 0 ? 'mt-[50%]' : ''}`}>
              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 ${item.color}`}>
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-[20px] font-semibold text-[#1E293B] mb-3">
                {item.title}
              </h3>

              {/* Desc */}
              <p className="text-[#64748B] leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}