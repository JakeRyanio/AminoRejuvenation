import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Scale, Heart, Activity, Dumbbell, Clock, Moon } from "lucide-react"

export function FeaturedProducts() {
  const featuredCategories = [
    {
      name: "Weight Loss",
      description: "Advanced GLP-1 agonists and metabolic compounds for weight management research",
      icon: Scale,
      href: `/shop?category=${encodeURIComponent("Weight Loss")}`,
      productCount: 18,
      bgColor: "bg-gradient-to-br from-emerald-200/20 to-emerald-300/30",
      iconBg: "bg-emerald-200/30",
      iconColor: "text-emerald-300",
      hoverColor: "group-hover:text-emerald-300",
      accentColor: "text-emerald-300",
    },
    {
      name: "Skin & Beauty",
      description: "Collagen synthesis and skin regeneration peptides for dermatological research",
      icon: Heart,
      href: `/shop?category=${encodeURIComponent("Skin & Beauty")}`,
      productCount: 5,
      bgColor: "bg-gradient-to-br from-rose-200/20 to-rose-300/30",
      iconBg: "bg-rose-200/30",
      iconColor: "text-rose-300",
      hoverColor: "group-hover:text-rose-300",
      accentColor: "text-rose-300",
    },
    {
      name: "Recovery / Immunity",
      description: "Tissue repair and immune system compounds for recovery research",
      icon: Activity,
      href: `/shop?category=${encodeURIComponent("Recovery / Immunity")}`,
      productCount: 5,
      bgColor: "bg-gradient-to-br from-sky-200/20 to-sky-300/30",
      iconBg: "bg-sky-200/30",
      iconColor: "text-sky-300",
      hoverColor: "group-hover:text-sky-300",
      accentColor: "text-sky-300",
    },
    {
      name: "Muscle Growth",
      description: "Growth hormone secretagogues and anabolic research compounds",
      icon: Dumbbell,
      href: `/shop?category=${encodeURIComponent("Muscle Growth")}`,
      productCount: 9,
      bgColor: "bg-gradient-to-br from-orange-200/20 to-orange-300/30",
      iconBg: "bg-orange-200/30",
      iconColor: "text-orange-300",
      hoverColor: "group-hover:text-orange-300",
      accentColor: "text-orange-300",
    },
    {
      name: "Longevity",
      description: "Anti-aging and cellular regeneration peptides for longevity research",
      icon: Clock,
      href: `/shop?category=${encodeURIComponent("Longevity")}`,
      productCount: 4,
      bgColor: "bg-gradient-to-br from-purple-200/20 to-purple-300/30",
      iconBg: "bg-purple-200/30",
      iconColor: "text-purple-300",
      hoverColor: "group-hover:text-purple-300",
      accentColor: "text-purple-300",
    },
    {
      name: "Sleep",
      description: "Sleep regulation and circadian rhythm peptides for sleep research",
      icon: Moon,
      href: `/shop?category=${encodeURIComponent("Sleep")}`,
      productCount: 1,
      bgColor: "bg-gradient-to-br from-indigo-200/20 to-indigo-300/30",
      iconBg: "bg-indigo-200/30",
      iconColor: "text-indigo-300",
      hoverColor: "group-hover:text-indigo-300",
      accentColor: "text-indigo-300",
    },
  ]

  return (
    <section className="py-20 content-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-medium mb-4 text-[#ebe7e4]">Featured Categories</h2>
          <p className="text-xl text-[#beb2a4] max-w-2xl mx-auto font-light">
            Explore our comprehensive range of research peptides organized by application
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredCategories.map((category) => (
            <Link key={category.name} href={category.href}>
              <div
                className={`group elegant-card rounded-md p-8 elegant-hover cursor-pointer h-full relative overflow-hidden ${category.bgColor}`}
              >
                <div className="flex flex-col items-center text-center h-full relative z-10">
                  {/* Icon with colored background */}
                  <div
                    className={`w-16 h-16 rounded-md ${category.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <category.icon className={`h-8 w-8 ${category.iconColor}`} />
                  </div>

                  {/* Category Name */}
                  <h3 className={`text-2xl font-medium mb-4 text-[#ebe7e4] ${category.hoverColor} transition-colors`}>
                    {category.name}
                  </h3>

                  {/* Description */}
                  <p className="text-[#beb2a4] mb-6 flex-grow leading-relaxed">{category.description}</p>

                  {/* Product Count */}
                  <div className="flex items-center justify-between w-full pt-4 border-t border-[#403c3a]/50">
                    <span className="text-sm text-[#beb2a4]">{category.productCount} products</span>
                    <span
                      className={`${category.accentColor} text-sm font-medium group-hover:text-[#ebe7e4] transition-colors`}
                    >
                      Explore →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link href="/shop">
            <Button className="bg-gradient-to-r from-[#d2c6b8] to-[#c4b8a4] hover:from-[#beb2a4] hover:to-[#b2a698] text-[#201c1a] font-medium px-8 py-3 rounded-md text-lg transition-all duration-300">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
