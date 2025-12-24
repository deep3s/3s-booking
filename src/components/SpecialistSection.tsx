import { Star, Award, Check, Calendar, Clock, Sparkles } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './shared/ImageWithFallback';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const specialists = [
  {
    id: 1,
    name: "Sofia Martinez",
    title: "Master Stylist",
    rating: 5.0,
    reviews: 342,
    experience: "12 years",
    image: "https://images.unsplash.com/photo-1624981015149-e01395f1d774?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoYWlyZHJlc3NlcnxlbnwxfHx8fDE3NjAxNjU0MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    specialties: ["Color Expert", "Balayage", "Styling"],
    nextAvailable: "Today 2:00 PM",
    topRated: true
  },
  {
    id: 2,
    name: "Emma Thompson",
    title: "Senior Stylist",
    rating: 4.9,
    reviews: 278,
    experience: "8 years",
    image: "https://images.unsplash.com/photo-1759134198561-e2041049419c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwc3R5bGlzdCUyMHdvcmtpbmd8ZW58MXx8fHwxNzYwMTY1NDA2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    specialties: ["Haircut", "Extensions", "Bridal"],
    nextAvailable: "Today 4:30 PM",
    topRated: false
  },
  {
    id: 3,
    name: "Isabella Chen",
    title: "Beauty Specialist",
    rating: 4.8,
    reviews: 195,
    experience: "6 years",
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBzYWxvbnxlbnwxfHx8fDE3NjAwNTgxNDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    specialties: ["Facial", "Skincare", "Spa"],
    nextAvailable: "Tomorrow 10:00 AM",
    topRated: true
  },
  {
    id: 4,
    name: "Olivia Rodriguez",
    title: "Nail Artist",
    rating: 4.9,
    reviews: 221,
    experience: "5 years",
    image: "https://images.unsplash.com/photo-1681965823525-b684fb97e9fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzYWxvbiUyMGludGVyaW9yfGVufDF8fHx8MTc2MDA4ODkwOXww&ixlib=rb-4.1.0&q=80&w=1080",
    specialties: ["Manicure", "Pedicure", "Nail Art"],
    nextAvailable: "Today 3:00 PM",
    topRated: false
  }
];

export function SpecialistSection() {
  const navigate = useNavigate();
  const [selectedSpecialist, setSelectedSpecialist] = useState<number | null>(null);
  const [selectedServices, setSelectedServices] = useState<any[]>([]);
  const [salonDetails, setSalonDetails] = useState<any>(null);

  // Load selected services and salon details from localStorage
  useEffect(() => {
    const storedServices = localStorage.getItem('selectedServices');
    const storedSalon = localStorage.getItem('selectedSalon');

    if (storedServices) {
      setSelectedServices(JSON.parse(storedServices));
    }
    if (storedSalon) {
      setSalonDetails(JSON.parse(storedSalon));
    }
  }, []);

  const totalPrice = selectedServices.reduce((sum, service) => sum + (service?.price || 0), 0);
  const totalDuration = selectedServices.reduce((sum, service) => {
    const duration = parseInt(service?.duration || '0');
    return sum + duration;
  }, 0);

  const handleContinue = () => {
    // Save specialist to localStorage
    if (selectedSpecialist) {
      const specialist = specialists.find(s => s.id === selectedSpecialist);
      localStorage.setItem('selectedSpecialist', JSON.stringify({
        specialist
      }));
      navigate('/datetime');
    }
  };

  return (
    <section className="py-12 px-4 dark:bg-gradient-to-b dark:from-black dark:via-zinc-950 dark:to-black cream:bg-gradient-to-b cream:from-[#faf8f3] cream:via-[#f5f1e8] cream:to-[#faf8f3]">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#d4af37]/20 to-[#f0d976]/20 border border-[#d4af37]/30 mb-4">
            <Award className="h-4 w-4 text-[#d4af37]" />
            <span className="text-[#d4af37]">Step 3: Choose Your Specialist</span>
          </div>
          <h2 className="mb-3 bg-gradient-to-r dark:from-white dark:via-[#f0d976] dark:to-white cream:from-foreground cream:via-[#d4af37] cream:to-foreground bg-clip-text text-transparent">
            Select a Specialist
          </h2>
          <p className="dark:text-white/60 cream:text-foreground/60">
            Book with our experienced and highly-rated professionals
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Specialists List - Left Side (2 columns) */}
          <div className="lg:col-span-2 space-y-6">
            {specialists.map((specialist) => {
              const isSelected = selectedSpecialist === specialist.id;

              return (
                <Card
                  key={specialist.id}
                  className={`overflow-hidden cursor-pointer transition-all duration-300 ${
                    isSelected 
                      ? 'bg-gradient-to-br from-[#d4af37]/20 to-[#f0d976]/20 border-[#d4af37] shadow-[0_0_30px_rgba(212,175,55,0.3)]' 
                      : 'border-[#d4af37]/20 hover:border-[#d4af37]/50 dark:bg-gradient-to-br dark:from-zinc-900/90 dark:to-black/90 cream:bg-gradient-to-br cream:from-white cream:to-[#f5f1e8]'
                  }`}
                  onClick={() => setSelectedSpecialist(specialist.id)}
                >
                  <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row">
                      <div className="relative w-full sm:w-40 h-48 sm:h-auto">
                        <ImageWithFallback
                          src={specialist.image}
                          alt={specialist.name}
                          className="w-full h-full object-cover"
                        />
                        {specialist.topRated && (
                          <div className="absolute top-2 left-2">
                            <Badge className="bg-gradient-to-r from-[#d4af37] to-[#f0d976] border-0 dark:text-black cream:text-white">
                              <Award className="h-3 w-3 mr-1" />
                              Top Rated
                            </Badge>
                          </div>
                        )}
                        {isSelected && (
                          <div className="absolute top-2 right-2">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#d4af37] to-[#f0d976] flex items-center justify-center">
                              <Check className="h-4 w-4 dark:text-black cream:text-white" />
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex-1 p-4">
                        <div className="mb-3">
                          <h3 className={`mb-1 ${isSelected ? 'text-[#d4af37]' : 'dark:text-white cream:text-foreground'}`}>
                            {specialist.name}
                          </h3>
                          <p className="dark:text-white/60 cream:text-foreground/60">{specialist.title}</p>
                        </div>

                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-[#d4af37] fill-current" />
                            <span className="text-[#d4af37]">{specialist.rating}</span>
                            <span className="dark:text-white/40 cream:text-foreground/40 text-sm">({specialist.reviews})</span>
                          </div>
                          <div className="dark:text-white/60 cream:text-foreground/60 text-sm">
                            {specialist.experience} exp.
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-3">
                          {specialist.specialties.map((specialty) => (
                            <span
                              key={specialty}
                              className="px-2 py-1 rounded-full bg-gradient-to-r from-[#d4af37]/10 to-[#f0d976]/10 border border-[#d4af37]/30 text-[#d4af37] text-xs"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-green-500" />
                          <span className="text-green-500">Next: {specialist.nextAvailable}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Cart - Right Side (1 column, sticky) */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <Card className="border-[#d4af37]/30 dark:bg-gradient-to-br dark:from-zinc-900/90 dark:to-black/90 cream:bg-gradient-to-br cream:from-white cream:to-[#f5f1e8]">
                <CardContent className="p-6">
                  {/* Salon Details */}
                  {salonDetails && (
                    <div className="mb-6 pb-6 border-b border-[#d4af37]/30">
                      <div className="flex gap-3">
                        <ImageWithFallback
                          src={salonDetails.image}
                          alt={salonDetails.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="dark:text-white cream:text-foreground mb-1">
                            {salonDetails.name}
                          </h3>
                          <div className="flex items-center gap-1 mb-1">
                            <Star className="h-4 w-4 fill-[#d4af37] text-[#d4af37]" />
                            <span className="text-[#d4af37]">{salonDetails.rating}</span>
                            <span className="dark:text-white/60 cream:text-foreground/60 text-xs">
                              ({salonDetails.reviews} reviews)
                            </span>
                          </div>
                          <p className="dark:text-white/60 cream:text-foreground/60 text-xs">
                            {salonDetails.address}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Selected Services */}
                  {selectedServices.length > 0 ? (
                    <>
                      <div className="mb-4">
                        <h4 className="dark:text-white cream:text-foreground mb-3 flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-[#d4af37]" />
                          Selected Services
                        </h4>
                        <div className="space-y-2 max-h-[300px] overflow-y-auto">
                          {selectedServices.map((service) => (
                            <div
                              key={service.id}
                              className="p-3 rounded-lg border border-[#d4af37]/20 dark:bg-black/30 cream:bg-[#faf8f3]/50"
                            >
                              <div className="flex items-start justify-between mb-1">
                                <h5 className="dark:text-white cream:text-foreground text-sm">
                                  {service.name}
                                </h5>
                                <span className="text-[#d4af37] text-sm">
                                  ${service.price}
                                </span>
                              </div>
                              <p className="dark:text-white/60 cream:text-foreground/60 text-xs">
                                {service.duration}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Specialist Selection */}
                      {selectedSpecialist && (
                        <div className="mb-4 p-3 rounded-lg border border-[#d4af37]/20 dark:bg-black/30 cream:bg-[#faf8f3]/50">
                          <h5 className="dark:text-white cream:text-foreground text-sm mb-2">
                            Selected Specialist
                          </h5>
                          <p className="text-[#d4af37] text-sm">
                            {specialists.find(s => s.id === selectedSpecialist)?.name}
                          </p>
                        </div>
                      )}

                      {/* Summary */}
                      <div className="space-y-3 mb-6 pt-4 border-t border-[#d4af37]/30">
                        <div className="flex items-center justify-between">
                          <span className="dark:text-white/60 cream:text-foreground/60 text-sm">
                            Total Services
                          </span>
                          <span className="dark:text-white cream:text-foreground">
                            {selectedServices.length}
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
                      {selectedSpecialist ? (
                        <Button
                          onClick={handleContinue}
                          className="w-full bg-gradient-to-r from-[#d4af37] to-[#f0d976] dark:text-black cream:text-white hover:from-[#b8941f] hover:to-[#d4af37] h-12"
                        >
                          <Calendar className="h-5 w-5 mr-2" />
                          Select Date & Time
                        </Button>
                      ) : (
                        <div className="text-center py-4">
                          <p className="dark:text-white/60 cream:text-foreground/60 text-sm">
                            Select a specialist to continue
                          </p>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-[#f0d976]/20 flex items-center justify-center">
                        <Sparkles className="h-8 w-8 text-[#d4af37]/40" />
                      </div>
                      <p className="dark:text-white/60 cream:text-foreground/60 text-sm">
                        No services selected
                      </p>
                    </div>
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
