import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Star, MapPin, Clock, Phone, Mail, Award, Image as ImageIcon } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ImageWithFallback } from '../components/shared/ImageWithFallback';
import { useGetLocationDetailsQuery, useGetLocationSpecialistsQuery, Specialist } from '../services/searchSalons.api';
import { useDispatch } from 'react-redux';
import { setLocationDetails, setSpecialists } from '../app/store/searchSalonsSlice';

// Type definitions for service categories
interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: string;
}

interface ServiceCategory {
  id: string;
  name: string;
  services: Service[];
}

interface ApiService {
  serviceId: number;
  serviceName: string;
  description: string;
  durationMinutes: number;
  basePrice: number;
}

interface ApiServiceCategory {
  categoryId: number;
  categoryName: string;
  services: ApiService[];
}

const defaultSalonImages = [
  "https://images.unsplash.com/photo-1681965823525-b684fb97e9fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzYWxvbiUyMGludGVyaW9yfGVufDF8fHx8MTc2MDc2ODE3M3ww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1750263160581-d332256293bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiZWF1dHklMjBzYWxvbnxlbnwxfHx8fDE3NjA4MTc4Njh8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1626379501846-0df4067b8bb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwc2Fsb24lMjBjaGFpcnxlbnwxfHx8fDE3NjA4MTc4Njh8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNwYSUyMHNhbG9ufGVufHx8fDE3NjA3MDEwOTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBzYWxvbnxlbnwxfHx8fDE3NjAwNTgxNDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1624981015149-e01395f1d774?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoYWlyZHJlc3NlcnxlbnwxfHx8fDE3NjAxNjU0MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
];

const serviceCategories = [
  {
    id: 'hair',
    name: 'Hair Services',
    services: [
      { id: 1, name: "Premium Haircut", description: "Expert styling with consultation and finishing", price: 85, duration: "60 min" },
      { id: 2, name: "Hair Coloring", description: "Full color transformation with premium products", price: 150, duration: "120 min" },
      { id: 3, name: "Highlights", description: "Partial or full highlights with toning", price: 180, duration: "150 min" },
      { id: 4, name: "Blowout & Style", description: "Professional blow dry and styling", price: 45, duration: "30 min" },
    ]
  },
  {
    id: 'nails',
    name: 'Nail Care',
    services: [
      { id: 5, name: "Classic Manicure", description: "Traditional nail care with polish", price: 35, duration: "30 min" },
      { id: 6, name: "Gel Manicure", description: "Long-lasting gel polish application", price: 45, duration: "45 min" },
      { id: 7, name: "Deluxe Pedicure", description: "Full foot care with massage and polish", price: 65, duration: "60 min" },
      { id: 8, name: "Acrylic Nails", description: "Full set of acrylic nail extensions", price: 75, duration: "90 min" },
    ]
  },
  {
    id: 'facial',
    name: 'Facial & Spa',
    services: [
      { id: 9, name: "Classic Facial", description: "Deep cleansing and hydration treatment", price: 95, duration: "60 min" },
      { id: 10, name: "Anti-Aging Facial", description: "Advanced treatment for mature skin", price: 135, duration: "75 min" },
      { id: 11, name: "Swedish Massage", description: "Relaxing full body massage", price: 110, duration: "75 min" },
      { id: 12, name: "Hot Stone Massage", description: "Therapeutic massage with heated stones", price: 135, duration: "90 min" },
    ]
  },
  {
    id: 'makeup',
    name: 'Makeup & Styling',
    services: [
      { id: 13, name: "Bridal Makeup", description: "Complete bridal look with trial", price: 200, duration: "120 min" },
      { id: 14, name: "Special Event Makeup", description: "Professional makeup for any occasion", price: 85, duration: "60 min" },
      { id: 15, name: "Hair Extensions", description: "Premium tape-in or clip-in extensions", price: 250, duration: "180 min" },
    ]
  }
];

const specialists = [
  {
    id: 1,
    name: "Sofia Martinez",
    title: "Master Stylist",
    rating: 5.0,
    reviews: 342,
    experience: "12 years",
    image: "https://images.unsplash.com/photo-1624981015149-e01395f1d774?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoYWlyZHJlc3NlcnxlbnwxfHx8fDE3NjAxNjU0MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    specialties: ["Color Expert", "Balayage", "Styling"]
  },
  {
    id: 2,
    name: "Emma Thompson",
    title: "Senior Stylist",
    rating: 4.9,
    reviews: 278,
    experience: "8 years",
    image: "https://images.unsplash.com/photo-1759134198561-e2041049419c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwc3R5bGlzdCUyMHdvcmtpbmd8ZW58MXx8fHwxNzYwMTY1NDA2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    specialties: ["Haircut", "Extensions", "Bridal"]
  },
  {
    id: 3,
    name: "Isabella Chen",
    title: "Beauty Specialist",
    rating: 4.8,
    reviews: 195,
    experience: "6 years",
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBzYWxvbnxlbnwxfHx8fDE3NjAwNTgxNDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    specialties: ["Facial", "Skincare", "Spa"]
  },
  {
    id: 4,
    name: "Olivia Rodriguez",
    title: "Nail Artist",
    rating: 4.9,
    reviews: 221,
    experience: "5 years",
    image: "https://images.unsplash.com/photo-1681965823525-b684fb97e9fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzYWxvbiUyMGludGVyaW9yfGVufDF8fHx8MTc2MDA4ODkwOXww&ixlib=rb-4.1.0&q=80&w=1080",
    specialties: ["Manicure", "Pedicure", "Nail Art"]
  }
];

export function SalonDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  // Parse salon ID from route parameter, default to 6 if not provided
  const salonId = id ? parseInt(id, 10) : 6;

  // Fetch location details from API using the salon ID from route
  const { data: locationDetailsResponse } = useGetLocationDetailsQuery(salonId);
  const { data: specialistsResponse } = useGetLocationSpecialistsQuery(salonId);

  const [showAllImages, setShowAllImages] = useState(false);
  const [activeCategory, setActiveCategory] = useState('hair');
  const [locationImages, setLocationImages] = useState<string[]>(defaultSalonImages);
  const [displayedServiceCategories, setDisplayedServiceCategories] = useState(serviceCategories);
  const [displayedSpecialists, setDisplayedSpecialists] = useState(specialists);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({})

  // Transform API serviceCategories to match component structure
  const transformApiServiceCategories = (apiCategories: ApiServiceCategory[]): ServiceCategory[] => {
    return apiCategories.map((category) => ({
      id: category.categoryName.toLowerCase().replace(/\s+/g, '-'),
      name: category.categoryName,
      services: category.services.map((service: ApiService) => ({
        id: service.serviceId,
        name: service.serviceName,
        description: service.description,
        price: service.basePrice,
        duration: `${service.durationMinutes} min`,
      })),
    }));
  };

  // Transform API specialists to match component structure
  const transformApiSpecialists = (apiSpecialists: Specialist[]): typeof specialists => {
    const salonSpaSpecialties = [
      'Hair Expert',
      'Color Specialist',
      'Balayage',
      'Styling',
      'Extensions',
      'Bridal',
      'Haircut',
      'Manicure',
      'Pedicure',
      'Nail Art',
      'Facial',
      'Skincare',
      'Spa',
      'Massage',
      'Makeup',
      'Waxing',
      'Threading',
      'Treatments'
    ];

    const getRandomNumber = (min: number, max: number) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const getRandomSpecialties = () => {
      const shuffled = [...salonSpaSpecialties].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, getRandomNumber(2, 4));
    };

    return apiSpecialists.map((specialist) => ({
      id: specialist.specialistId || 0,
      name: (specialist.firstName || '') + (specialist.lastName ? ` ${specialist.lastName}` : ''),
      title: specialist.notes || '',
      rating: parseFloat((getRandomNumber(1, 5) + Math.random()).toFixed(1)),
      reviews: getRandomNumber(200, 1000),
      experience: `${getRandomNumber(5, 15)} years`,
      image: specialist.profileImageUrl || '',
      specialties: getRandomSpecialties(),
    }));
  };

  // Update images and services when API data is received
  useEffect(() => {
    if (locationDetailsResponse?.data) {
      const apiImages = locationDetailsResponse.data.images || locationDetailsResponse.data.imageNames || [];
      if (apiImages.length > 0) {
        setLocationImages(apiImages);
      }

      // Merge API serviceCategories with defaults
      if (locationDetailsResponse.data.serviceCategories && locationDetailsResponse.data.serviceCategories.length > 0) {
        const apiServiceCategories = transformApiServiceCategories(locationDetailsResponse.data.serviceCategories);
        // Prepend API categories to defaults
        const mergedCategories = [...apiServiceCategories, ...serviceCategories];
        setDisplayedServiceCategories(mergedCategories);
        // Set first API category as active
        if (mergedCategories.length > 0) {
          setActiveCategory(mergedCategories[0].id);
        }
      }

      dispatch(setLocationDetails({
        locationId: locationDetailsResponse.data.locationId,
        locationName: locationDetailsResponse.data.locationName,
        images: apiImages,
        address: locationDetailsResponse.data.address,
      }));
    }
  }, [locationDetailsResponse, dispatch]);

  // Update specialists when API data is received
  useEffect(() => {
    if (specialistsResponse?.data && specialistsResponse.data.length > 0) {
      const apiSpecialists = transformApiSpecialists(specialistsResponse.data);
      // Prepend API specialists to defaults
      const mergedSpecialists = [...apiSpecialists, ...specialists];
      setDisplayedSpecialists(mergedSpecialists);

      dispatch(setSpecialists(specialistsResponse.data));
    }
  }, [specialistsResponse, dispatch]);

  const scrollToSection = (categoryId: string) => {
    setActiveCategory(categoryId);
    sectionRefs.current[categoryId]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="min-h-screen pb-12 dark:bg-gradient-to-b dark:from-black dark:via-zinc-950 dark:to-black cream:bg-gradient-to-b cream:from-[#faf8f3] cream:via-[#f5f1e8] cream:to-[#faf8f3]">
      {/* Header Section */}
      <div className="relative h-96 overflow-hidden">
        <ImageWithFallback
          src={locationImages[0]}
          alt="Golden Crown Salon"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <Badge className="bg-gradient-to-r from-[#d4af37] to-[#f0d976] border-0 dark:text-black cream:text-white mb-3">
              Premium Salon
            </Badge>
            <h1 className="text-white mb-3">{locationDetailsResponse?.data.locationName}</h1>
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 text-[#d4af37] fill-current" />
                <span className="text-white">4.9</span>
                <span className="text-white/60">(234 reviews)</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <MapPin className="h-4 w-4" />
                <span>{locationDetailsResponse?.data.address}</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Clock className="h-4 w-4" />
                <span>Open until 8:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-12 relative z-10">
        {/* Image Gallery Section */}
        <Card className="border-[#d4af37]/20 mb-8 dark:bg-gradient-to-br dark:from-zinc-900/95 dark:to-black/95 cream:bg-gradient-to-br cream:from-white/95 cream:to-[#f5f1e8]/95">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="flex items-center gap-2 dark:text-white cream:text-foreground">
                <ImageIcon className="h-5 w-5 text-[#d4af37]" />
                Gallery
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAllImages(true)}
                className="border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37]/10"
              >
                See All Images
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {locationImages.slice(0, 4).map((image, index) => (
                <div key={index} className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer" onClick={() => setShowAllImages(true)}>
                  <ImageWithFallback
                    src={image}
                    alt={`Salon ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Services Section with Category Tabs */}
        <Card className="border-[#d4af37]/20 mb-8 dark:bg-gradient-to-br dark:from-zinc-900/95 dark:to-black/95 cream:bg-gradient-to-br cream:from-white/95 cream:to-[#f5f1e8]/95">
          <CardContent className="p-6">
            <h2 className="mb-6 bg-gradient-to-r from-[#d4af37] to-[#f0d976] bg-clip-text text-transparent">
              Our Services
            </h2>

            {/* Sticky Category Tabs */}
            <div className="sticky top-20 z-30 -mx-6 px-6 py-4 mb-6 backdrop-blur-sm dark:bg-zinc-900/95 cream:bg-white/95 border-b border-[#d4af37]/20">
              <Tabs value={activeCategory} onValueChange={scrollToSection}>
                <TabsList className="w-full justify-start overflow-x-auto dark:bg-black/50 cream:bg-[#f5f1e8] flex-wrap h-auto gap-2 p-2">
                  {displayedServiceCategories.map((category) => (
                    <TabsTrigger
                      key={category.id}
                      value={category.id}
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#d4af37] data-[state=active]:to-[#f0d976] data-[state=active]:dark:text-black data-[state=active]:cream:text-white whitespace-nowrap"
                    >
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            {/* Service Categories */}
            <div className="space-y-12">
              {displayedServiceCategories.map((category) => (
                <div
                  key={category.id}
                  ref={(el) => {
                    if (el) sectionRefs.current[category.id] = el;
                  }}
                  className="scroll-mt-40"
                >
                  <h3 className="mb-6 dark:text-white cream:text-foreground">
                    {category.name}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {category.services.map((service) => (
                      <Card
                        key={service.id}
                        className="border-[#d4af37]/20 hover:border-[#d4af37]/50 transition-all dark:bg-gradient-to-br dark:from-black/50 dark:to-zinc-900/50 cream:bg-gradient-to-br cream:from-white cream:to-[#f5f1e8]/50"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h4 className="dark:text-white cream:text-foreground mb-1">
                                {service.name}
                              </h4>
                              <p className="text-sm dark:text-white/60 cream:text-foreground/60 mb-3">
                                {service.description}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between pt-3 border-t border-[#d4af37]/10">
                            <div className="flex items-center gap-4">
                              <span className="text-[#d4af37]">${service.price}</span>
                              <span className="text-sm dark:text-white/40 cream:text-foreground/40">
                                {service.duration}
                              </span>
                            </div>
                            <Button
                              size="sm"
                              onClick={() => navigate('/services')}
                              className="bg-gradient-to-r from-[#d4af37] to-[#f0d976] dark:text-black cream:text-white hover:from-[#b8941f] hover:to-[#d4af37]"
                            >
                              Book
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Specialists Section */}
        <Card className="border-[#d4af37]/20 mb-8 dark:bg-gradient-to-br dark:from-zinc-900/95 dark:to-black/95 cream:bg-gradient-to-br cream:from-white/95 cream:to-[#f5f1e8]/95">
          <CardContent className="p-6">
            <h2 className="mb-6 bg-gradient-to-r from-[#d4af37] to-[#f0d976] bg-clip-text text-transparent">
              Our Specialists
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayedSpecialists.map((specialist) => (
                <div key={specialist.id} className="text-center">
                  <div className="relative inline-block mb-4">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37] to-[#f0d976] rounded-full blur-md opacity-50" />
                    <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-transparent bg-gradient-to-br from-[#d4af37] to-[#f0d976] p-1">
                      <div className="w-full h-full rounded-full overflow-hidden">
                        <ImageWithFallback
                          src={specialist.image}
                          alt={specialist.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                  <h4 className="dark:text-white cream:text-foreground mb-1">
                    {specialist.name}
                  </h4>
                  <p className="text-sm dark:text-white/60 cream:text-foreground/60 mb-2">
                    {specialist.title}
                  </p>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <Star className="h-4 w-4 text-[#d4af37] fill-current" />
                    <span className="text-[#d4af37]">{specialist.rating}</span>
                    <span className="text-sm dark:text-white/40 cream:text-foreground/40">
                      ({specialist.reviews})
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm dark:text-white/60 cream:text-foreground/60 mb-3">
                    <Award className="h-4 w-4" />
                    <span>{specialist.experience} exp.</span>
                  </div>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {specialist.specialties.map((specialty) => (
                      <Badge
                        key={specialty}
                        variant="outline"
                        className="text-xs border-[#d4af37]/30 text-[#d4af37]"
                      >
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <Card className="border-[#d4af37]/20 dark:bg-gradient-to-br dark:from-zinc-900/95 dark:to-black/95 cream:bg-gradient-to-br cream:from-white/95 cream:to-[#f5f1e8]/95">
          <CardContent className="p-6">
            <h3 className="mb-4 dark:text-white cream:text-foreground">Contact Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-[#f0d976]/20 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-[#d4af37]" />
                </div>
                <div>
                  <p className="text-sm dark:text-white/60 cream:text-foreground/60">Phone</p>
                  <p className="dark:text-white cream:text-foreground">{locationDetailsResponse?.data.contactPhone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-[#f0d976]/20 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-[#d4af37]" />
                </div>
                <div>
                  <p className="text-sm dark:text-white/60 cream:text-foreground/60">Email</p>
                  <p className="dark:text-white cream:text-foreground">{locationDetailsResponse?.data.locationEmail}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Image Gallery Dialog */}
      <Dialog open={showAllImages} onOpenChange={setShowAllImages}>
        <DialogContent className="max-w-4xl dark:bg-zinc-900 cream:bg-white border-[#d4af37]/20">
          <DialogHeader>
            <DialogTitle className="dark:text-white cream:text-foreground">Salon Gallery</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[70vh] overflow-y-auto p-4">
            {locationImages.map((image, index) => (
              <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                <ImageWithFallback
                  src={image}
                  alt={`Salon ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
