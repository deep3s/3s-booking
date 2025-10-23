import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Star, Clock, Navigation, Search, Calendar, ChevronDown } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar as CalendarComponent } from './ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { format } from 'date-fns';

const timeOptions = Array.from({ length: 48 }, (_, i) => {
  const hour = Math.floor(i / 2);
  const minute = i % 2 === 0 ? '00' : '30';
  const period = hour < 12 ? 'AM' : 'PM';
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${displayHour}:${minute} ${period}`;
});

const salons = [
  {
    id: 1,
    name: "Golden Crown Salon",
    rating: 4.9,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1681965823525-b684fb97e9fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzYWxvbiUyMGludGVyaW9yfGVufDF8fHx8MTc2MDc2ODE3M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    address: "123 Luxury Ave, Downtown",
    distance: "0.5 mi",
    priceRange: "$$$",
    services: [
      { name: "Haircut & Style", price: "$85", duration: "60 min" },
      { name: "Hair Coloring", price: "$150", duration: "120 min" },
      { name: "Blowout", price: "$45", duration: "30 min" },
      { name: "Deep Conditioning", price: "$60", duration: "45 min" },
      { name: "Highlights", price: "$180", duration: "150 min" }
    ],
    availability: "Available Today",
    position: { top: "30%", left: "40%" }
  },
  {
    id: 2,
    name: "Prestige Hair Studio",
    rating: 4.8,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1750263160581-d332256293bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiZWF1dHklMjBzYWxvbnxlbnwxfHx8fDE3NjA4MTc4Njh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    address: "456 Fashion St, Midtown",
    distance: "1.2 mi",
    priceRange: "$$",
    services: [
      { name: "Manicure", price: "$35", duration: "30 min" },
      { name: "Pedicure", price: "$50", duration: "45 min" },
      { name: "Gel Manicure", price: "$45", duration: "45 min" },
      { name: "Acrylic Nails", price: "$65", duration: "90 min" }
    ],
    availability: "3 slots left",
    position: { top: "50%", left: "60%" }
  },
  {
    id: 3,
    name: "Elite Beauty Lounge",
    rating: 4.7,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1626379501846-0df4067b8bb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwc2Fsb24lMjBjaGFpcnxlbnwxfHx8fDE3NjA4MTc4Njh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    address: "789 Style Blvd, Uptown",
    distance: "2.1 mi",
    priceRange: "$$$",
    services: [
      { name: "Facial Treatment", price: "$95", duration: "60 min" },
      { name: "Swedish Massage", price: "$110", duration: "75 min" },
      { name: "Body Scrub", price: "$85", duration: "50 min" },
      { name: "Hot Stone Massage", price: "$135", duration: "90 min" }
    ],
    availability: "Book Tomorrow",
    position: { top: "65%", left: "35%" }
  },
  {
    id: 4,
    name: "Luxury Spa & Salon",
    rating: 4.9,
    reviews: 302,
    image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGElMjBzYWxvbnxlbnwxfHx8fDE3NjA3MDEwOTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    address: "321 Wellness Way, Downtown",
    distance: "0.8 mi",
    priceRange: "$$$$",
    services: [
      { name: "Signature Spa Day", price: "$350", duration: "240 min" },
      { name: "Aromatherapy Massage", price: "$120", duration: "90 min" },
      { name: "Luxury Facial", price: "$150", duration: "90 min" }
    ],
    availability: "Available Today",
    position: { top: "40%", left: "55%" }
  }
];

export function SalonMapView() {
  const navigate = useNavigate();
  const [selectedSalon, setSelectedSalon] = useState<number | null>(null);
  const [date, setDate] = useState<Date>();
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [fromTime, setFromTime] = useState('9:00 AM');
  const [toTime, setToTime] = useState('6:00 PM');
  const [distance, setDistance] = useState([5]);

  const handleQuickDate = (type: 'today' | 'tomorrow') => {
    const newDate = new Date();
    if (type === 'tomorrow') {
      newDate.setDate(newDate.getDate() + 1);
    }
    setDate(newDate);
  };

  const handleTimePreset = (preset: 'morning' | 'afternoon' | 'evening') => {
    switch (preset) {
      case 'morning':
        setFromTime('6:00 AM');
        setToTime('12:00 PM');
        break;
      case 'afternoon':
        setFromTime('12:00 PM');
        setToTime('5:00 PM');
        break;
      case 'evening':
        setFromTime('5:00 PM');
        setToTime('10:00 PM');
        break;
    }
    setShowTimeDropdown(false);
  };

  return (
    <section className="min-h-screen py-6 px-4 dark:bg-gradient-to-b dark:from-black dark:via-zinc-950 dark:to-black cream:bg-gradient-to-b cream:from-[#faf8f3] cream:via-[#f5f1e8] cream:to-[#faf8f3]">
      <div className="container mx-auto">
        <div className="mb-6">
          <h2 className="bg-gradient-to-r from-[#d4af37] to-[#f0d976] bg-clip-text text-transparent mb-2">
            Salons Near You
          </h2>
          <p className="dark:text-white/60 cream:text-foreground/60">{salons.length} salons found</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Salon List - 30% */}
          <div className="w-full lg:w-[30%] space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-2 custom-scrollbar">
            {salons.map((salon) => (
              <Card 
                key={salon.id} 
                className="border-[#d4af37]/20 hover:border-[#d4af37]/50 transition-all cursor-pointer overflow-hidden group dark:bg-gradient-to-br dark:from-zinc-900/90 dark:to-black/90 cream:bg-gradient-to-br cream:from-white cream:to-[#f5f1e8]"
                onClick={() => setSelectedSalon(salon.id)}
              >
                <CardContent className="p-0">
                  <div className="relative w-full h-40 overflow-hidden">
                    <ImageWithFallback 
                      src={salon.image} 
                      alt={salon.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-gradient-to-r from-[#d4af37] to-[#f0d976] border-0 dark:text-black cream:text-white">
                        {salon.priceRange}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="dark:text-white cream:text-foreground mb-2">{salon.name}</h3>
                    
                    <div className="flex items-center gap-2 text-sm dark:text-white/60 cream:text-foreground/60 mb-3">
                      <MapPin className="h-4 w-4" />
                      <span className="truncate">{salon.address}</span>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex items-center gap-1 text-[#d4af37]">
                        <Star className="h-4 w-4 fill-current" />
                        <span>{salon.rating}</span>
                        <span className="dark:text-white/40 cream:text-foreground/40 text-sm">({salon.reviews})</span>
                      </div>
                      <div className="flex items-center gap-1 dark:text-white/60 cream:text-foreground/60 text-sm">
                        <Navigation className="h-4 w-4" />
                        <span>{salon.distance}</span>
                      </div>
                    </div>

                    {/* Services */}
                    <Collapsible>
                      <div className="space-y-2 mb-3">
                        {salon.services.slice(0, 3).map((service, idx) => (
                          <div key={idx} className="flex items-center justify-between text-sm p-2 rounded-lg border border-[#d4af37]/10 dark:bg-black/30 cream:bg-white/50">
                            <span className="dark:text-white/80 cream:text-foreground/80">{service.name}</span>
                            <div className="flex items-center gap-3">
                              <span className="text-[#d4af37]">{service.price}</span>
                              <span className="dark:text-white/40 cream:text-foreground/40">{service.duration}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {salon.services.length > 3 && (
                        <>
                          <CollapsibleContent>
                            <div className="space-y-2 mb-3">
                              {salon.services.slice(3).map((service, idx) => (
                                <div key={idx} className="flex items-center justify-between text-sm p-2 rounded-lg border border-[#d4af37]/10 dark:bg-black/30 cream:bg-white/50">
                                  <span className="dark:text-white/80 cream:text-foreground/80">{service.name}</span>
                                  <div className="flex items-center gap-3">
                                    <span className="text-[#d4af37]">{service.price}</span>
                                    <span className="dark:text-white/40 cream:text-foreground/40">{service.duration}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CollapsibleContent>
                          <CollapsibleTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-full text-[#d4af37] hover:text-[#f0d976] hover:bg-[#d4af37]/10 mb-3"
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                            >
                              See More Services
                              <ChevronDown className="h-4 w-4 ml-1" />
                            </Button>
                          </CollapsibleTrigger>
                        </>
                      )}
                    </Collapsible>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-[#d4af37]/10">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-green-500" />
                        <span className="text-green-500 text-sm">{salon.availability}</span>
                      </div>
                      <Button 
                        size="sm" 
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/salon/${salon.id}`);
                        }}
                        className="bg-gradient-to-r from-[#d4af37] to-[#f0d976] dark:text-black cream:text-white hover:from-[#b8941f] hover:to-[#d4af37]"
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Map View - 70% */}
          <div className="w-full lg:w-[70%]">
            <div className="sticky top-20">
              {/* Search Controls */}
              <div className="backdrop-blur-lg rounded-2xl border border-[#d4af37]/20 p-4 mb-4 shadow-xl dark:bg-gradient-to-br dark:from-zinc-900/90 dark:to-black/90 cream:bg-gradient-to-br cream:from-white/90 cream:to-[#f5f1e8]/90">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 mb-3">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#d4af37]" />
                    <Input 
                      placeholder="Location" 
                      className="pl-9 h-10 border-[#d4af37]/30 focus:border-[#d4af37] text-sm dark:bg-black/50 dark:text-white dark:placeholder:text-white/40 cream:bg-white cream:text-foreground cream:placeholder:text-foreground/40"
                    />
                  </div>
                  
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#d4af37]" />
                    <Input 
                      placeholder="Service or Salon" 
                      className="pl-9 h-10 border-[#d4af37]/30 focus:border-[#d4af37] text-sm dark:bg-black/50 dark:text-white dark:placeholder:text-white/40 cream:bg-white cream:text-foreground cream:placeholder:text-foreground/40"
                    />
                  </div>
                  
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="h-10 justify-start text-left border-[#d4af37]/30 hover:border-[#d4af37] text-sm dark:bg-black/50 dark:text-white dark:hover:bg-black/70 dark:hover:text-white cream:bg-white cream:text-foreground cream:hover:bg-[#f5f1e8]"
                      >
                        <Calendar className="mr-2 h-4 w-4 text-[#d4af37]" />
                        {date ? format(date, 'PP') : <span className="dark:text-white/40 cream:text-foreground/40">Date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 border-[#d4af37]/30 dark:bg-zinc-900 cream:bg-white" align="start">
                      <div className="flex gap-2 p-3 border-b border-[#d4af37]/20">
                        <Button size="sm" onClick={() => handleQuickDate('today')} className="bg-gradient-to-r from-[#d4af37] to-[#f0d976] dark:text-black cream:text-white hover:from-[#b8941f] hover:to-[#d4af37]">
                          Today
                        </Button>
                        <Button size="sm" onClick={() => handleQuickDate('tomorrow')} className="bg-gradient-to-r from-[#d4af37] to-[#f0d976] dark:text-black cream:text-white hover:from-[#b8941f] hover:to-[#d4af37]">
                          Tomorrow
                        </Button>
                      </div>
                      <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus className="dark:bg-zinc-900 dark:text-white cream:bg-white cream:text-foreground" />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                  <Popover open={showTimeDropdown} onOpenChange={setShowTimeDropdown}>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="h-10 justify-start text-left border-[#d4af37]/30 hover:border-[#d4af37] text-sm dark:bg-black/50 dark:text-white dark:hover:bg-black/70 dark:hover:text-white cream:bg-white cream:text-foreground cream:hover:bg-[#f5f1e8]">
                        <Clock className="mr-2 h-4 w-4 text-[#d4af37]" />
                        <span>{fromTime} - {toTime}</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 border-[#d4af37]/30 dark:bg-zinc-900 cream:bg-white" align="start">
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => handleTimePreset('morning')} className="flex-1 bg-gradient-to-r from-[#d4af37] to-[#f0d976] dark:text-black cream:text-white hover:from-[#b8941f] hover:to-[#d4af37]">
                            Morning
                          </Button>
                          <Button size="sm" onClick={() => handleTimePreset('afternoon')} className="flex-1 bg-gradient-to-r from-[#d4af37] to-[#f0d976] dark:text-black cream:text-white hover:from-[#b8941f] hover:to-[#d4af37]">
                            Afternoon
                          </Button>
                          <Button size="sm" onClick={() => handleTimePreset('evening')} className="flex-1 bg-gradient-to-r from-[#d4af37] to-[#f0d976] dark:text-black cream:text-white hover:from-[#b8941f] hover:to-[#d4af37]">
                            Evening
                          </Button>
                        </div>
                        <div>
                          <label className="dark:text-white/80 cream:text-foreground/80 text-sm mb-2 block">From</label>
                          <Select value={fromTime} onValueChange={setFromTime}>
                            <SelectTrigger className="border-[#d4af37]/30 dark:bg-black/50 dark:text-white cream:bg-white cream:text-foreground">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="border-[#d4af37]/30 max-h-60 dark:bg-zinc-900 dark:text-white cream:bg-white cream:text-foreground">
                              {timeOptions.map((time) => (
                                <SelectItem key={time} value={time} className="dark:text-white cream:text-foreground hover:bg-[#d4af37]/20">{time}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="dark:text-white/80 cream:text-foreground/80 text-sm mb-2 block">To</label>
                          <Select value={toTime} onValueChange={setToTime}>
                            <SelectTrigger className="border-[#d4af37]/30 dark:bg-black/50 dark:text-white cream:bg-white cream:text-foreground">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="border-[#d4af37]/30 max-h-60 dark:bg-zinc-900 dark:text-white cream:bg-white cream:text-foreground">
                              {timeOptions.map((time) => (
                                <SelectItem key={time} value={time} className="dark:text-white cream:text-foreground hover:bg-[#d4af37]/20">{time}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="dark:text-white/70 cream:text-foreground/70">Distance</span>
                      <span className="text-[#d4af37]">{distance[0]} km</span>
                    </div>
                    <Slider value={distance} onValueChange={setDistance} max={50} min={1} step={1} className="cursor-pointer" />
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="relative h-[calc(100vh-300px)] rounded-2xl border border-[#d4af37]/20 overflow-hidden dark:bg-gradient-to-br dark:from-zinc-900 dark:to-black cream:bg-gradient-to-br cream:from-[#f5f1e8] cream:to-white">
                {/* Simulated Map Background */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

                {/* Map Pins */}
                {salons.map((salon) => (
                  <button
                    key={salon.id}
                    onClick={() => setSelectedSalon(salon.id)}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
                    style={{ top: salon.position.top, left: salon.position.left }}
                  >
                    <div className={`relative ${selectedSalon === salon.id ? 'scale-125' : 'hover:scale-110'} transition-transform`}>
                      <div className="w-10 h-10 bg-gradient-to-br from-[#d4af37] to-[#f0d976] rounded-full flex items-center justify-center shadow-lg border-2 dark:border-black cream:border-white">
                        <MapPin className="h-5 w-5 dark:text-black dark:fill-black cream:text-white cream:fill-white" />
                      </div>
                      {selectedSalon === salon.id && (
                        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-56 backdrop-blur-sm rounded-lg p-3 border border-[#d4af37]/30 shadow-xl dark:bg-black/95 cream:bg-white/95">
                          <div className="text-sm">
                            <p className="dark:text-white cream:text-foreground mb-1">{salon.name}</p>
                            <div className="flex items-center gap-1 text-[#d4af37] mb-2">
                              <Star className="h-3 w-3 fill-current" />
                              <span>{salon.rating}</span>
                              <span className="dark:text-white/40 cream:text-foreground/40">({salon.reviews})</span>
                            </div>
                            <div className="dark:text-white/60 cream:text-foreground/60 text-xs mb-2">
                              {salon.services[0].name} - {salon.services[0].price}
                            </div>
                            <Button 
                              size="sm" 
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/salon/${salon.id}`);
                              }}
                              className="w-full bg-gradient-to-r from-[#d4af37] to-[#f0d976] dark:text-black cream:text-white hover:from-[#b8941f] hover:to-[#d4af37]"
                            >
                              Book Now
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(212, 175, 55, 0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #d4af37, #f0d976);
          border-radius: 3px;
        }
      `}</style>
    </section>
  );
}
