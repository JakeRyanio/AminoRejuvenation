import { Microscope, FlaskConical, Timer, Award } from "lucide-react"

export function Benefits() {
  const benefits = [
    {
      icon: Microscope,
      title: "Scientifically Formulated",
      description: "Our products are backed by scientific research and formulated with the highest quality ingredients for optimal wellness support.",
      bgColor: "bg-gradient-to-br from-rose-50/60 to-rose-100/70",
      iconBg: "bg-gradient-to-br from-rose-300 to-rose-400",
      iconColor: "text-white",
      borderColor: "border-rose-200/40",
      shadowColor: "shadow-rose-200/20",
    },
    {
      icon: FlaskConical,
      title: "Premium Quality Standards",
      description:
        "Each product undergoes rigorous testing to ensure maximum purity, potency, and consistency for reliable wellness results.",
      bgColor: "bg-gradient-to-br from-brand-50/60 to-brand-100/70",
      iconBg: "bg-gradient-to-br from-brand-400 to-brand-500",
      iconColor: "text-white",
      borderColor: "border-brand-200/40",
      shadowColor: "shadow-brand-200/20",
    },
    {
      icon: Timer,
      title: "Fast & Free Shipping",
      description: "Orders processed within 24-48 hours with free shipping to support your wellness journey without delay.",
      bgColor: "bg-gradient-to-br from-lavender-50/60 to-lavender-100/70",
      iconBg: "bg-gradient-to-br from-lavender-300 to-lavender-400",
      iconColor: "text-white",
      borderColor: "border-lavender-200/40",
      shadowColor: "shadow-lavender-200/20",
    },
    {
      icon: Award,
      title: "Wellness Excellence",
      description: "Trusted by wellness enthusiasts and health-conscious individuals worldwide for their health and vitality goals.",
      bgColor: "bg-gradient-to-br from-rose-50/60 to-rose-100/70",
      iconBg: "bg-gradient-to-br from-rose-800 to-rose-900",
      iconColor: "text-white",
      borderColor: "border-rose-200/40",
      shadowColor: "shadow-rose-200/20",
    },
  ]

  return (
    <section className="py-20 content-section-alt relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-brand-sage-green/20 to-brand-sage-green/30 rounded-full animate-float blur-xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-br from-brand-deep-mauve/20 to-brand-deep-mauve/30 rounded-full animate-pulse blur-xl"></div>
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-gradient-to-br from-accent-lavender-gray/20 to-accent-lavender-gray/30 rounded-full animate-float blur-xl"></div>
        <div className="absolute bottom-1/3 left-1/3 w-40 h-40 bg-gradient-to-br from-rose-dusty-rose/20 to-rose-dusty-rose/30 rounded-full animate-pulse blur-xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-medium mb-4 text-brand-900">Why Choose Amino Rejuvenation</h2>
          <p className="text-xl text-brand-800 max-w-3xl mx-auto font-light">
            We're committed to supporting your wellness journey through the highest quality health and wellness products
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`flex items-start space-x-6 p-8 elegant-card elegant-hover ${benefit.bgColor} border-2 ${benefit.borderColor} shadow-lg ${benefit.shadowColor} hover:shadow-xl hover:scale-105 transition-all duration-300`}
            >
              <div className="flex-shrink-0">
                <div className={`w-16 h-16 ${benefit.iconBg} rounded-xl flex items-center justify-center shadow-md`}>
                  <benefit.icon className={`h-8 w-8 ${benefit.iconColor}`} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-3 text-brand-900">{benefit.title}</h3>
                <p className="text-brand-800 leading-relaxed">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
