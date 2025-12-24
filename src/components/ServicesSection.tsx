import { Check, Scissors, Sparkles, Palette, Droplet, Star, Zap, Wind, Heart, Crown } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImageWithFallback } from './shared/ImageWithFallback';

// Service categories with their services
const serviceCategories = [
  {
    id: 'hair',
    name: 'Hair Services',
    icon: Scissors,
    services: [
      {
        id: 1,
        name: "Premium Haircut",
        description: "Expert styling with consultation",
        duration: "60 min",
        price: 75,
        icon: Scissors,
      },
      {
        id: 2,
        name: "Hair Coloring",
        description: "Full color transformation",
        duration: "120 min",
        price: 150,
        icon: Palette,
      },
      {
        id: 3,
        name: "Hair Styling",
        description: "Special occasion styling",
        duration: "45 min",
        price: 65,
        icon: Star,
      },
      {
        id: 4,
        name: "Balayage",
        description: "Natural-looking highlights",
        duration: "150 min",
        price: 180,
        icon: Palette,
      },
    ]
  },
  {
    id: 'face',
    name: 'Facial & Skin',
    icon: Sparkles,
    services: [
      {
        id: 5,
        name: "Deluxe Facial",
        description: "Deep cleanse and hydration",
        duration: "90 min",
        price: 120,
        icon: Sparkles,
      },
      {
        id: 6,
        name: "Anti-Aging Treatment",
        description: "Rejuvenate and firm skin",
        duration: "75 min",
        price: 140,
        icon: Star,
      },
      {
        id: 7,
        name: "Acne Treatment",
        description: "Clear and prevent breakouts",
        duration: "60 min",
        price: 95,
        icon: Droplet,
      },
    ]
  },
  {
    id: 'nails',
    name: 'Nail Care',
    icon: Droplet,
    services: [
      {
        id: 8,
        name: "Manicure & Pedicure",
        description: "Complete nail care treatment",
        duration: "75 min",
        price: 85,
        icon: Droplet,
      },
      {
        id: 9,
        name: "Gel Manicure",
        description: "Long-lasting gel polish",
        duration: "45 min",
        price: 55,
        icon: Star,
      },
      {
        id: 10,
        name: "Nail Art",
        description: "Custom nail designs",
        duration: "60 min",
        price: 75,
        icon: Palette,
      },
    ]
  },
  {
    id: 'spa',
    name: 'Spa & Wellness',
    icon: Heart,
    services: [
      {
        id: 11,
        name: "Spa Package",
        description: "Ultimate relaxation experience",
        duration: "180 min",
        price: 250,
        icon: Sparkles,
      },
      {
        id: 12,
        name: "Hot Stone Massage",
        description: "Deep muscle relaxation",
        duration: "90 min",
        price: 135,
        icon: Heart,
      },
      {
        id: 13,
        name: "Aromatherapy",
        description: "Essential oil therapy",
        duration: "60 min",
        price: 95,
        icon: Wind,
      },
    ]
  },
  {
    id: 'premium',
    name: 'Premium Services',
    icon: Crown,
    services: [
      {
        id: 14,
        name: "VIP Package",
        description: "Complete luxury treatment",
        duration: "240 min",
        price: 450,
        icon: Crown,
      },
      {
        id: 15,
        name: "Bridal Package",
        description: "Complete bridal makeover",
        duration: "300 min",
        price: 550,
        icon: Star,
      },
      {
        id: 16,
        name: "Luxury Spa Day",
        description: "Full day pampering",
        duration: "360 min",
        price: 650,
        icon: Sparkles,
      },
    ]
  },
];

export function ServicesSection() {
  const navigate = useNavigate();
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [activeCategory, setActiveCategory] = useState('hair');
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Mock salon data - in a real app, this would come from the selected salon
  const selectedSalon = {
    id: 1,
    name: "Luxe Beauty Lounge",
    image: "https://images.unsplash.com/photo-1681965823525-b684fb97e9fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzYWxvbiUyMGludGVyaW9yfGVufDF8fHx8MTc2MjkwNDA3OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.8,
    reviews: 342,
    address: "123 Fashion Avenue, New York"
  };

  const scrollToCategory = (categoryId: string) => {
    setActiveCategory(categoryId);
    const element = categoryRefs.current[categoryId];
    if (element) {
      const yOffset = -120; // Offset for sticky header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Update active category on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const category of serviceCategories) {
        const element = categoryRefs.current[category.id];
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveCategory(category.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleService = (id: number) => {
    setSelectedServices(prev =>
      prev.includes(id)
        ? prev.filter(serviceId => serviceId !== id)
        : [...prev, id]
    );
  };

  const removeService = (id: number) => {
    setSelectedServices(prev => prev.filter(serviceId => serviceId !== id));
  };

  const allServices = serviceCategories.flatMap(cat => cat.services);
  const selectedServiceDetails = selectedServices.map(id =>
    allServices.find(s => s.id === id)
  ).filter(Boolean);

  const totalPrice = selectedServiceDetails.reduce((sum, service) => sum + (service?.price || 0), 0);
  const totalDuration = selectedServiceDetails.reduce((sum, service) => {
    const duration = parseInt(service?.duration || '0');
    return sum + duration;
  }, 0);

  const handleContinue = () => {
    // Save selected services and salon details to localStorage
    localStorage.setItem('selectedServices', JSON.stringify(selectedServiceDetails));
    localStorage.setItem('selectedSalon', JSON.stringify(selectedSalon));
    navigate('/specialists');
  };

  return (
    <section className="py-12 px-4 dark:bg-gradient-to-b dark:from-black dark:via-zinc-950 dark:to-black cream:bg-gradient-to-b cream:from-[#faf8f3] cream:via-[#f5f1e8] cream:to-[#faf8f3]">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
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

        {/* Category Navigation - Sticky */}
        <div className="sticky top-16 z-30 dark:bg-black/95 cream:bg-[#faf8f3]/95 backdrop-blur-lg border-b border-[#d4af37]/30 mb-8">
          <div className="container mx-auto px-4">
            <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
              {serviceCategories.map((category) => {
                const Icon = category.icon;
                const isActive = activeCategory === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => scrollToCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-[#d4af37] to-[#f0d976] dark:text-black cream:text-white shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                        : 'border border-[#d4af37]/30 dark:text-white/70 cream:text-foreground/70 hover:border-[#d4af37]/50 hover:text-[#d4af37]'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {category.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Services List - Left Side (2 columns) */}
          <div className="lg:col-span-2 space-y-12">
            {serviceCategories.map((category) => {
              const CategoryIcon = category.icon;
              return (
                <div
                  key={category.id}
                  ref={(el) => (categoryRefs.current[category.id] = el)}
                  id={category.id}
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d4af37] to-[#f0d976] flex items-center justify-center">
                      <CategoryIcon className="h-5 w-5 dark:text-black cream:text-white" />
                    </div>
                    <h3 className="dark:text-white cream:text-foreground">{category.name}</h3>
                  </div>

                  {/* Services Grid */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    {category.services.map((service) => {
                      const Icon = service.icon;
                      const isSelected = selectedServices.includes(service.id);

                      return (
                        <Card
                          key={service.id}
                          className={`relative overflow-hidden transition-all duration-300 ${
                            isSelected 
                              ? 'bg-gradient-to-br from-[#d4af37]/20 to-[#f0d976]/20 border-[#d4af37] shadow-[0_0_30px_rgba(212,175,55,0.3)]' 
                              : 'border-[#d4af37]/20 hover:border-[#d4af37]/50 dark:bg-gradient-to-br dark:from-zinc-900/90 dark:to-black/90 cream:bg-gradient-to-br cream:from-white cream:to-[#f5f1e8]'
                          }`}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center ${
                                isSelected 
                                  ? 'from-[#d4af37] to-[#f0d976]' 
                                  : 'from-[#d4af37]/20 to-[#f0d976]/20'
                              }`}>
                                <Icon className={`h-5 w-5 ${isSelected ? 'dark:text-black cream:text-white' : 'text-[#d4af37]'}`} />
                              </div>
                            </div>

                            <h4 className={`mb-1 text-sm ${isSelected ? 'text-[#d4af37]' : 'dark:text-white cream:text-foreground'}`}>
                              {service.name}
                            </h4>
                            <p className="dark:text-white/60 cream:text-foreground/60 mb-3 text-xs">
                              {service.description}
                            </p>

                            <div className="flex items-center justify-between mb-3">
                              <div className="dark:text-white/60 cream:text-foreground/60 text-xs">
                                {service.duration}
                              </div>
                              <div className={`${isSelected ? 'text-[#d4af37]' : 'dark:text-white cream:text-foreground'}`}>
                                ${service.price}
                              </div>
                            </div>

                            <Button
                              onClick={() => toggleService(service.id)}
                              className={`w-full h-9 text-sm ${
                                isSelected
                                  ? 'bg-gradient-to-r from-[#d4af37] to-[#f0d976] dark:text-black cream:text-white hover:from-[#b8941f] hover:to-[#d4af37]'
                                  : 'border border-[#d4af37]/30 dark:bg-transparent dark:text-white cream:bg-transparent cream:text-foreground hover:bg-[#d4af37]/10'
                              }`}
                            >
                              {isSelected ? (
                                <>
                                  <Check className="h-4 w-4 mr-1" />
                                  Added
                                </>
                              ) : (
                                'Add Service'
                              )}
                            </Button>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cart - Right Side (1 column, sticky) */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <Card className="border-[#d4af37]/30 dark:bg-gradient-to-br dark:from-zinc-900/90 dark:to-black/90 cream:bg-gradient-to-br cream:from-white cream:to-[#f5f1e8]">
                <CardContent className="p-6">
                  {/* Salon Details */}
                  <div className="mb-6 pb-6 border-b border-[#d4af37]/30">
                    <div className="flex gap-3">
                      <ImageWithFallback
                        src={selectedSalon.image}
                        alt={selectedSalon.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="dark:text-white cream:text-foreground mb-1">
                          {selectedSalon.name}
                        </h3>
                        <div className="flex items-center gap-1 mb-1">
                          <Star className="h-4 w-4 fill-[#d4af37] text-[#d4af37]" />
                          <span className="text-[#d4af37]">{selectedSalon.rating}</span>
                          <span className="dark:text-white/60 cream:text-foreground/60 text-xs">
                            ({selectedSalon.reviews} reviews)
                          </span>
                        </div>
                        <p className="dark:text-white/60 cream:text-foreground/60 text-xs">
                          {selectedSalon.address}
                        </p>
                      </div>
                    </div>
                  </div>

                  {selectedServiceDetails.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-[#f0d976]/20 flex items-center justify-center">
                        <Sparkles className="h-8 w-8 text-[#d4af37]/40" />
                      </div>
                      <p className="dark:text-white/60 cream:text-foreground/60 text-sm">
                        No services selected yet
                      </p>
                    </div>
                  ) : (
                    <>
                      {/* Selected Services List */}
                      <div className="space-y-3 mb-6 max-h-[400px] overflow-y-auto">
                        {selectedServiceDetails.map((service) => {
                          if (!service) return null;
                          return (
                            <div
                              key={service.id}
                              className="p-3 rounded-lg border border-[#d4af37]/20 dark:bg-black/30 cream:bg-[#faf8f3]/50"
                            >
                              <div className="flex items-start justify-between mb-2">
                                <h4 className="dark:text-white cream:text-foreground text-sm flex-1">
                                  {service.name}
                                </h4>
                                <button
                                  onClick={() => removeService(service.id)}
                                  className="dark:text-white/60 cream:text-foreground/60 hover:text-red-500 transition-colors ml-2"
                                >
                                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              </div>
                              <div className="flex items-center justify-between text-xs">
                                <span className="dark:text-white/60 cream:text-foreground/60">
                                  {service.duration}
                                </span>
                                <span className="text-[#d4af37]">
                                  ${service.price}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Summary */}
                      <div className="space-y-3 mb-6 pt-4 border-t border-[#d4af37]/30">
                        <div className="flex items-center justify-between">
                          <span className="dark:text-white/60 cream:text-foreground/60 text-sm">
                            Total Services
                          </span>
                          <span className="dark:text-white cream:text-foreground">
                            {selectedServiceDetails.length}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="dark:text-white/60 cream:text-foreground/60 text-sm">
                            Total Duration
                          </span>
                          <span className="dark:text-white cream:text-foreground">
                            {totalDuration} min
                          </span>
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t border-[#d4af37]/30">
                          <span className="dark:text-white cream:text-foreground">
                            Total Price
                          </span>
                          <span className="bg-gradient-to-r from-[#d4af37] to-[#f0d976] bg-clip-text text-transparent">
                            ${totalPrice}
                          </span>
                        </div>
                      </div>

                      {/* Continue Button */}
                      <Button
                        onClick={handleContinue}
                        className="w-full bg-gradient-to-r from-[#d4af37] to-[#f0d976] dark:text-black cream:text-white hover:from-[#b8941f] hover:to-[#d4af37] h-12"
                      >
                        Continue to Specialists
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
