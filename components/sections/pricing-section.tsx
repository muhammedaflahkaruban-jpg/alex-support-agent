import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react";
import { useMemo } from "react";

const packages = useMemo(() => [
    {
      name: "Basic",
      price: "₹3,999",
      description: "Perfect for small businesses and startups",
      features: [
        "5 Sections (Home, About, Services, Portfolio, Contact)",
        "Responsive Design",
        "Contact Form",
        "Basic SEO Setup",
        "7-10 Days Delivery"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "₹7,999",
      description: "Ideal for growing businesses",
      features: [
        "Everything in Basic",
        "E-commerce Functionality",
        "Blog Setup",
        "Advanced Animations",
        "Social Media Integration",
        "Google Analytics"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "₹15,999",
      description: "Complete solution for established businesses",
      features: [
        "Everything in Professional",
        "Advanced AI Bot Integration",
        "Custom Email System",
        "Advanced SEO",
        "Priority Support",
        "Maintenance Package"
      ],
      popular: false
    }
  ], []);

export  function pricingSection() {
    return(
        <section id="pricing" className="min-h-screen py-20 md:py-32 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-orange-950 dark:via-amber-950 dark:to-yellow-950 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-orange-200/30 dark:bg-orange-800/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-amber-200/30 dark:bg-amber-800/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 md:mb-24"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-orange-900 dark:text-orange-100 mb-6">
              Investment Plans
            </h2>
            <p className="text-lg md:text-xl text-orange-800 dark:text-orange-200 max-w-4xl mx-auto leading-relaxed">
              Choose the perfect package for your business growth. Transparent pricing, exceptional value, guaranteed results.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`relative ${pkg.popular ? 'transform scale-105' : ''}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
                    <motion.span 
                      className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-2 rounded-full font-bold shadow-lg"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Most Popular
                    </motion.span>
                  </div>
                )}
                
                <div className={`h-full bg-white/40 dark:bg-white/5 backdrop-blur-2xl rounded-3xl p-8 md:p-10 hover:shadow-2xl transition-all duration-300 border-2 ${pkg.popular ? 'border-orange-400 dark:border-orange-500' : 'border-white/30 dark:border-white/20'} hover:scale-105`}>
                  <div className="text-center mb-8">
                    <h3 className="text-2xl md:text-3xl font-black text-orange-900 dark:text-orange-100 mb-3">
                      {pkg.name}
                    </h3>
                    <div className="text-4xl md:text-5xl font-black text-orange-600 dark:text-orange-400 mb-3">
                      {pkg.price}
                    </div>
                    <p className="text-orange-800 dark:text-orange-200">
                      {pkg.description}
                    </p>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <motion.div 
                        key={idx} 
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: (index * 0.2) + (idx * 0.1) }}
                      >
                        <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                        <span className="text-orange-800 dark:text-orange-200">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-4 px-6 rounded-2xl font-bold transition-all duration-300 ${
                      pkg.popular 
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/30' 
                        : 'bg-orange-100 dark:bg-orange-900/50 text-orange-900 dark:text-orange-100 hover:bg-orange-200 dark:hover:bg-orange-900/70'
                    }`}
                  >
                    Get Started
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );

}