import { MapPin, Star, Clock } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './shared/ImageWithFallback';
import { useState, useEffect } from 'react';

interface SalonCardProps {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  image: string;
  images?: string[];
  address: string;
  distance: string;
  priceRange: string;
  availability?: string;
}

export function SalonCard({
  name,
  rating,
  reviews,
  image,
  images = [],
  address,
  distance,
  priceRange,
  availability
}: SalonCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const imageList = images && images.length > 0 ? images : [image];

  useEffect(() => {
    if (imageList.length <= 1) return;

    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % imageList.length);
        setIsAnimating(false);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, [imageList.length]);

  return (
    <Card className="border-[#d4af37]/20 hover:border-[#d4af37]/50 transition-all cursor-pointer overflow-hidden group dark:bg-gradient-to-br dark:from-zinc-900/90 dark:to-black/90 cream:bg-gradient-to-br cream:from-white cream:to-[#f5f1e8]">
      <CardContent className="p-0">
        <div className="relative w-full h-48 overflow-hidden bg-black/10">
          <ImageWithFallback
            src={imageList[currentImageIndex]}
            alt={name}
            className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-110 ${
              isAnimating ? 'opacity-0 translate-x-full' : 'opacity-100 translate-x-0'
            }`}
          />
          {imageList.length > 1 && (
            <div className="absolute bottom-2 right-2 flex gap-1">
              {imageList.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === currentImageIndex
                      ? 'bg-white w-4'
                      : 'bg-white/50 w-1.5'
                  }`}
                />
              ))}
            </div>
          )}
          <div className="absolute top-2 right-2">
            <Badge className="bg-gradient-to-r from-[#d4af37] to-[#f0d976] border-0 dark:text-black cream:text-white">
              {priceRange}
            </Badge>
          </div>
        </div>

        <div className="p-4">
          <h3 className="dark:text-white cream:text-foreground mb-2">{name}</h3>

          <div className="flex items-center gap-2 text-sm dark:text-white/60 cream:text-foreground/60 mb-3">
            <MapPin className="h-4 w-4" />
            <span>{address}</span>
          </div>

          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-1 text-[#d4af37]">
              <Star className="h-4 w-4 fill-current" />
              <span>{rating}</span>
              <span className="dark:text-white/40 cream:text-foreground/40">({reviews})</span>
            </div>
            <div className="flex items-center gap-1 dark:text-white/60 cream:text-foreground/60 text-sm">
              <span>{distance}</span>
            </div>
          </div>

          {availability && (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-green-500" />
              <span className="text-green-500 text-sm">{availability}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
