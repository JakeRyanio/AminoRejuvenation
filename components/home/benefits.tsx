import { Microscope, FlaskConical, Timer, Award } from "lucide-react"

export function Benefits() {
  const benefits = [
    {
      icon: Microscope,
      title: "Advanced Research Applications",
      description: "Cutting-edge peptides designed for sophisticated laboratory research and scientific investigation.",
      bgColor: "bg-gradient-to-br from-purple-200/10 to-purple-300/20",
      iconBg: "bg-purple-200/30",
      iconColor: "text-purple-300",
      borderColor: "border-purple-300/20",
    },
    {
      icon: FlaskConical,
      title: "Pharmaceutical Grade Quality",
      description:
        "Each batch undergoes rigorous testing to ensure maximum purity and consistency for reliable results.",
      bgColor: "bg-gradient-to-br from-rose-200/10 to-rose-300/20",
      iconBg: "bg-rose-200/30",
      iconColor: "text-rose-300",
      borderColor: "border-rose-300/20",
    },
    {
      icon: Timer,
      title: "Rapid Processing & Delivery",
      description: "Orders processed within 24-48 hours with free shipping to maintain convenience.",
      bgColor: "bg-gradient-to-br from-indigo-200/10 to-indigo-300/20",
      iconBg: "bg-indigo-200/30",
      iconColor: "text-indigo-300",
      borderColor: "border-indigo-300/20",
    },
    {
      icon: Award,
      title: "Research Excellence",
      description: "Trusted by research institutions and laboratories worldwide for critical scientific applications.",
      bgColor: "bg-gradient-to-br from-emerald-200/10 to-emerald-300/20",
      iconBg: "bg-emerald-200/30",
      iconColor: "text-emerald-300",
      borderColor: "border-emerald-300/20",
    },
  ]

  return (
    <section className="py-20 content-section-alt">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-medium mb-4 text-[#ebe7e4]">Why Choose Precision Peptides</h2>
          <p className="text-xl text-[#beb2a4] max-w-3xl mx-auto font-light">
            We're committed to advancing scientific research through the highest quality peptide compounds
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`flex items-start space-x-6 p-8 elegant-card elegant-hover ${benefit.bgColor} border ${benefit.borderColor}`}
            >
              <div className="flex-shrink-0">
                <div className={`w-16 h-16 ${benefit.iconBg} rounded-md flex items-center justify-center`}>
                  <benefit.icon className={`h-8 w-8 ${benefit.iconColor}`} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-3 text-[#ebe7e4]">{benefit.title}</h3>
                <p className="text-[#beb2a4] leading-relaxed">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
