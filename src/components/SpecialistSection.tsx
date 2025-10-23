import { Star, Award, Check, Calendar, Clock } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';

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

const timeSlots = [
  "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", 
  "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
];

export function SpecialistSection() {
  const [selectedSpecialist, setSelectedSpecialist] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  return (
    <section className="py-12 px-4 dark:bg-gradient-to-b dark:from-black dark:via-zinc-950 dark:to-black cream:bg-gradient-to-b cream:from-[#faf8f3] cream:via-[#f5f1e8] cream:to-[#faf8f3]">
      <div className="container mx-auto">
        <div className="text-center mb-12">
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

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
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

        {/* Time Slot Selection */}
        {selectedSpecialist && (
          <div className="border border-[#d4af37]/20 rounded-2xl p-6 mb-20 dark:bg-gradient-to-br dark:from-zinc-900/90 dark:to-black/90 cream:bg-gradient-to-br cream:from-white cream:to-[#f5f1e8]">
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="h-5 w-5 text-[#d4af37]" />
              <h3 className="dark:text-white cream:text-foreground">Select Time Slot</h3>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`px-4 py-3 rounded-lg border transition-all ${
                    selectedTime === time
                      ? 'bg-gradient-to-r from-[#d4af37] to-[#f0d976] dark:text-black cream:text-white border-transparent'
                      : 'border-[#d4af37]/30 hover:border-[#d4af37]/50 dark:bg-black/50 dark:text-white cream:bg-white cream:text-foreground'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Continue Button */}
        {selectedSpecialist && selectedTime && (
          <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#d4af37]/30 backdrop-blur-lg dark:bg-gradient-to-r dark:from-black dark:via-zinc-900 dark:to-black cream:bg-gradient-to-r cream:from-[#faf8f3] cream:via-[#f5f1e8] cream:to-[#faf8f3]">
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-6">
                  <div>
                    <p className="dark:text-white/60 cream:text-foreground/60 text-sm">Specialist</p>
                    <p className="dark:text-white cream:text-foreground">
                      {specialists.find(s => s.id === selectedSpecialist)?.name}
                    </p>
                  </div>
                  <div>
                    <p className="dark:text-white/60 cream:text-foreground/60 text-sm">Time</p>
                    <p className="text-[#d4af37]">{selectedTime}</p>
                  </div>
                </div>
                
                <Button className="bg-gradient-to-r from-[#d4af37] to-[#f0d976] dark:text-black cream:text-white hover:from-[#b8941f] hover:to-[#d4af37] px-8">
                  Continue to Payment
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
