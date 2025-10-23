import { Check, Scissors, Sparkles, Palette, Droplet, Star } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { useState } from 'react';

const services = [
  {
    id: 1,
    name: "Premium Haircut",
    description: "Expert styling with consultation",
    duration: "60 min",
    price: 75,
    icon: Scissors,
    popular: true
  },
  {
    id: 2,
    name: "Hair Coloring",
    description: "Full color transformation",
    duration: "120 min",
    price: 150,
    icon: Palette,
    popular: true
  },
  {
    id: 3,
    name: "Deluxe Facial",
    description: "Deep cleanse and hydration",
    duration: "90 min",
    price: 120,
    icon: Sparkles,
    popular: false
  },
  {
    id: 4,
    name: "Manicure & Pedicure",
    description: "Complete nail care treatment",
    duration: "75 min",
    price: 85,
    icon: Droplet,
    popular: true
  },
  {
    id: 5,
    name: "Hair Styling",
    description: "Special occasion styling",
    duration: "45 min",
    price: 65,
    icon: Star,
    popular: false
  },
  {
    id: 6,
    name: "Spa Package",
    description: "Ultimate relaxation experience",
    duration: "180 min",
    price: 250,
    icon: Sparkles,
    popular: true
  }
];

export function ServicesSection() {
  const [selectedServices, setSelectedServices] = useState<number[]>([]);

  const toggleService = (id: number) => {
    setSelectedServices(prev => 
      prev.includes(id) 
        ? prev.filter(serviceId => serviceId !== id)
        : [...prev, id]
    );
  };

  const totalPrice = selectedServices.reduce((sum, id) => {
    const service = services.find(s => s.id === id);
    return sum + (service?.price || 0);
  }, 0);

  const totalDuration = selectedServices.reduce((sum, id) => {
    const service = services.find(s => s.id === id);
    const duration = parseInt(service?.duration || '0');
    return sum + duration;
  }, 0);

  return (
    <section className="py-12 px-4 dark:bg-gradient-to-b dark:from-black dark:via-zinc-950 dark:to-black cream:bg-gradient-to-b cream:from-[#faf8f3] cream:via-[#f5f1e8] cream:to-[#faf8f3]">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#d4af37]/20 to-[#f0d976]/20 border border-[#d4af37]/30 mb-4">
            <Sparkles className="h-4 w-4 text-[#d4af37]" />
            <span className="text-[#d4af37]">Step 2: Choose Services</span>
          </div>
          <h2 className="mb-3 bg-gradient-to-r dark:from-white dark:via-[#f0d976] dark:to-white cream:from-foreground cream:via-[#d4af37] cream:to-foreground bg-clip-text text-transparent">
            Select Your Services
          </h2>
          <p className="dark:text-white/60 cream:text-foreground/60">
            Choose one or multiple services for your appointment
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {services.map((service) => {
            const Icon = service.icon;
            const isSelected = selectedServices.includes(service.id);
            
            return (
              <Card
                key={service.id}
                onClick={() => toggleService(service.id)}
                className={`relative overflow-hidden cursor-pointer transition-all duration-300 ${
                  isSelected 
                    ? 'bg-gradient-to-br from-[#d4af37]/20 to-[#f0d976]/20 border-[#d4af37] shadow-[0_0_30px_rgba(212,175,55,0.3)]' 
                    : 'border-[#d4af37]/20 hover:border-[#d4af37]/50 dark:bg-gradient-to-br dark:from-zinc-900/90 dark:to-black/90 cream:bg-gradient-to-br cream:from-white cream:to-[#f5f1e8]'
                }`}
              >
                {service.popular && (
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 bg-gradient-to-r from-[#d4af37] to-[#f0d976] text-xs rounded-full dark:text-black cream:text-white">
                      Popular
                    </span>
                  </div>
                )}
                
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center ${
                      isSelected 
                        ? 'from-[#d4af37] to-[#f0d976]' 
                        : 'from-[#d4af37]/20 to-[#f0d976]/20'
                    }`}>
                      <Icon className={`h-6 w-6 ${isSelected ? 'dark:text-black cream:text-white' : 'text-[#d4af37]'}`} />
                    </div>
                    
                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#d4af37] to-[#f0d976] flex items-center justify-center">
                        <Check className="h-4 w-4 dark:text-black cream:text-white" />
                      </div>
                    )}
                  </div>
                  
                  <h3 className={`mb-2 ${isSelected ? 'text-[#d4af37]' : 'dark:text-white cream:text-foreground'}`}>
                    {service.name}
                  </h3>
                  <p className="dark:text-white/60 cream:text-foreground/60 mb-4 text-sm">
                    {service.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t dark:border-white/10 cream:border-foreground/10">
                    <div className="dark:text-white/60 cream:text-foreground/60 text-sm">
                      {service.duration}
                    </div>
                    <div className={`${isSelected ? 'text-[#d4af37]' : 'dark:text-white cream:text-foreground'}`}>
                      ${service.price}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Summary Bar */}
        {selectedServices.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#d4af37]/30 backdrop-blur-lg dark:bg-gradient-to-r dark:from-black dark:via-zinc-900 dark:to-black cream:bg-gradient-to-r cream:from-[#faf8f3] cream:via-[#f5f1e8] cream:to-[#faf8f3]">
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-6">
                  <div>
                    <p className="dark:text-white/60 cream:text-foreground/60 text-sm">Selected Services</p>
                    <p className="dark:text-white cream:text-foreground">{selectedServices.length} service{selectedServices.length > 1 ? 's' : ''}</p>
                  </div>
                  <div>
                    <p className="dark:text-white/60 cream:text-foreground/60 text-sm">Total Duration</p>
                    <p className="dark:text-white cream:text-foreground">{totalDuration} min</p>
                  </div>
                  <div>
                    <p className="dark:text-white/60 cream:text-foreground/60 text-sm">Total Price</p>
                    <p className="bg-gradient-to-r from-[#d4af37] to-[#f0d976] bg-clip-text text-transparent">
                      ${totalPrice}
                    </p>
                  </div>
                </div>
                
                <Button className="bg-gradient-to-r from-[#d4af37] to-[#f0d976] dark:text-black cream:text-white hover:from-[#b8941f] hover:to-[#d4af37] px-8">
                  Continue to Specialists
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
