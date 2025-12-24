import React, {useState, useRef, useLayoutEffect} from 'react';
import {MapPin, Star, Clock, Navigation, ChevronDown} from 'lucide-react';
import {Card, CardContent} from './ui/card';
import {Button} from './ui/button';
import {Badge} from './ui/badge';
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from './ui/collapsible';
import {SearchControls} from './SearchControls';
import {useLazySearchNearbySalonsQuery} from '../services/searchSalons.api';
import {useNavigate} from "react-router-dom";
import { ImageCarousel } from './shared/imageCarousal';
import { OlaMaps } from 'olamaps-web-sdk'

const salons = [
    {
        id: 1,
        name: "Golden Crown Salon",
        rating: 4.9,
        reviews: 234,
        image: "https://images.unsplash.com/photo-1681965823525-b684fb97e9fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzYWxvbiUyMGludGVyaW9yfGVufDF8fHx8MTc2MDc2ODE3M3ww&ixlib=rb-4.1.0&q=80&w=1080",
        images: ["https://images.unsplash.com/photo-1681965823525-b684fb97e9fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzYWxvbiUyMGludGVyaW9yfGVufDF8fHx8MTc2MDc2ODE3M3ww&ixlib=rb-4.1.0&q=80&w=1080"],
        address: "123 Luxury Ave, Downtown",
        distance: "0.5 mi",
        priceRange: "$$$",
        services: [
            {name: "Haircut & Style", price: "$85", duration: "60 min"},
            {name: "Hair Coloring", price: "$150", duration: "120 min"},
            {name: "Blowout", price: "$45", duration: "30 min"},
            {name: "Deep Conditioning", price: "$60", duration: "45 min"},
            {name: "Highlights", price: "$180", duration: "150 min"}
        ],
        availability: "Available Today",
        position: {top: "30%", left: "40%"}
    },
    {
        id: 2,
        name: "Prestige Hair Studio",
        rating: 4.8,
        reviews: 189,
        image: "https://images.unsplash.com/photo-1750263160581-d332256293bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiZWF1dHklMjBzYWxvbnxlbnwxfHx8fDE3NjA4MTc4Njh8MA&ixlib=rb-4.1.0&q=80&w=1080",
        images: ["https://images.unsplash.com/photo-1750263160581-d332256293bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiZWF1dHklMjBzYWxvbnxlbnwxfHx8fDE3NjA4MTc4Njh8MA&ixlib=rb-4.1.0&q=80&w=1080"],
        address: "456 Fashion St, Midtown",
        distance: "1.2 mi",
        priceRange: "$$",
        services: [
            {name: "Manicure", price: "$35", duration: "30 min"},
            {name: "Pedicure", price: "$50", duration: "45 min"},
            {name: "Gel Manicure", price: "$45", duration: "45 min"},
            {name: "Acrylic Nails", price: "$65", duration: "90 min"}
        ],
        availability: "3 slots left",
        position: {top: "50%", left: "60%"}
    },
    {
        id: 3,
        name: "Elite Beauty Lounge",
        rating: 4.7,
        reviews: 156,
        image: "https://images.unsplash.com/photo-1626379501846-0df4067b8bb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwc2Fsb24lMjBjaGFpcnxlbnwxfHx8fDE3NjA4MTc4Njh8MA&ixlib=rb-4.1.0&q=80&w=1080",
        images: ["https://images.unsplash.com/photo-1626379501846-0df4067b8bb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwc2Fsb24lMjBjaGFpcnxlbnwxfHx8fDE3NjA4MTc4Njh8MA&ixlib=rb-4.1.0&q=80&w=1080"],
        address: "789 Style Blvd, Uptown",
        distance: "2.1 mi",
        priceRange: "$$$",
        services: [
            {name: "Facial Treatment", price: "$95", duration: "60 min"},
            {name: "Swedish Massage", price: "$110", duration: "75 min"},
            {name: "Body Scrub", price: "$85", duration: "50 min"},
            {name: "Hot Stone Massage", price: "$135", duration: "90 min"}
        ],
        availability: "Book Tomorrow",
        position: {top: "65%", left: "35%"}
    },
    {
        id: 4,
        name: "Luxury Spa & Salon",
        rating: 4.9,
        reviews: 302,
        image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGElMjBzYWxvbnxlbnwxfHx8fDE3NjA3MDEwOTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
        images: ["https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGElMjBzYWxvbnxlbnwxfHx8fDE3NjA3MDEwOTd8MA&ixlib=rb-4.1.0&q=80&w=1080"],
        address: "321 Wellness Way, Downtown",
        distance: "0.8 mi",
        priceRange: "$$$$",
        services: [
            {name: "Signature Spa Day", price: "$350", duration: "240 min"},
            {name: "Aromatherapy Massage", price: "$120", duration: "90 min"},
            {name: "Luxury Facial", price: "$150", duration: "90 min"}
        ],
        availability: "Available Today",
        position: {top: "40%", left: "55%"}
    }
];
const olaMaps = new OlaMaps({
    apiKey: 'qOmAe8G8Tbky3bmGXYNM1SwmNyFoC5Oy9T5KW9a4',
})
export function SalonMapView() {
    const navigate = useNavigate();
    const [selectedSalon, setSelectedSalon] = useState<number | null>(null);
    const [triggerInitialSearch, setTriggerInitialSearch] = useState(true);
    const [salonsState, setSalonsState] = useState(salons);
    const [triggerSearchNearbySalons] = useLazySearchNearbySalonsQuery();
    const mapMarkers: any[] = []
    let searchedMapPosition: any = null;

    useLayoutEffect(() => {
        initMap(12.876672, 77.60013);
    }, []);

    const handleSearch = async (searchDetails: Record<string, any>) => {
        setTriggerInitialSearch(false);
        initMap(searchDetails.lat, searchDetails.lng);

        try {
            const {data} = await triggerSearchNearbySalons({lng: searchDetails.lng, lat: searchDetails.lat, radiusKm: searchDetails.distance}).unwrap();
            if (data && Array.isArray(data)) {
                if(mapMarkers.length) {
                    mapMarkers.forEach((marker) => marker.remove());
                }

                const apiSalons: any = data.map((loc) => {
                    mapMarkers.push(
                        olaMaps.addMarker({
                                offset: [0, 6],
                                anchor: 'bottom',
                                color: 'black',
                            }).setLngLat([loc.longitude, loc.latitude])
                            .addTo(searchedMapPosition)
                    );

                    return {
                        id: loc.locationId,
                        name: loc.locationName,
                        latitude: loc.latitude,
                        longitude: loc.longitude,
                        rating: 0,
                        reviews: 0,
                        images: loc.imageNames,
                        address: loc.address,
                        distance: '',
                        priceRange: '',
                        services: [],
                        availability: loc.openingHours,
                    };
                });
                setSalonsState(() => [...apiSalons, ...salons]);
            }
        } catch (e) {
            // handle error
        }
    };

    const initMap = (lat: number, lng: number)=> {
        searchedMapPosition = olaMaps.init({
            style:
                'https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json',
            container: 'map',
            center: [lng, lat],
            zoom: 15,
        });
    }

    return (
        <section
            className="min-h-screen py-6 px-4 dark:bg-gradient-to-b dark:from-black dark:via-zinc-950 dark:to-black cream:bg-gradient-to-b cream:from-[#faf8f3] cream:via-[#f5f1e8] cream:to-[#faf8f3]">
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Salon List - 30% */}
                    <div className="w-full lg:w-[30%]">
                        <div className="flex mb-2">
                            <h2 className="bg-gradient-to-r from-[#d4af37] to-[#f0d976] bg-clip-text text-transparent mb-2">
                                Salons Near You
                            </h2>
                            <p className="dark:text-white/60 cream:text-foreground/60 ml-2"> - {salonsState.length} salons
                                found</p>
                        </div>
                        <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-2 custom-scrollbar">
                            {salonsState.map((salon) => (
                                <Card
                                    key={salon.id}
                                    className="border-[#d4af37]/20 hover:border-[#d4af37]/50 transition-all cursor-pointer overflow-hidden group dark:bg-gradient-to-br dark:from-zinc-900/90 dark:to-black/90 cream:bg-gradient-to-br cream:from-white cream:to-[#f5f1e8]"
                                    onClick={
                                        () => {
                                            setSelectedSalon(salon.id);
                                            navigate(`/salon/${salon.id}`);
                                        }
                                    }
                                >
                                    <CardContent className="p-0">
                                        <div className="relative w-full h-40 overflow-hidden" >
                                            <div className={`w-full h-full transition-all duration-300 ease-in-out`}>
                                                <ImageCarousel images={salon.images}/>
                                            </div>
                                        </div>

                                        <div className="p-4">
                                            <h3 className="dark:text-white cream:text-foreground mb-2">{salon.name}</h3>

                                            <div
                                                className="flex items-center gap-2 text-sm dark:text-white/60 cream:text-foreground/60 mb-3">
                                                <MapPin className="h-4 w-4"/>
                                                <span className="truncate">{salon.address}</span>
                                            </div>

                                            <div className="flex items-center gap-4 mb-3">
                                                <div className="flex items-center gap-1 text-[#d4af37]">
                                                    <Star className="h-4 w-4 fill-current"/>
                                                    <span>{salon.rating}</span>
                                                    <span
                                                        className="dark:text-white/40 cream:text-foreground/40 text-sm">({salon.reviews})</span>
                                                </div>
                                                <div
                                                    className="flex items-center gap-1 dark:text-white/60 cream:text-foreground/60 text-sm">
                                                    <Navigation className="h-4 w-4"/>
                                                    <span>{salon.distance}</span>
                                                </div>
                                            </div>

                                            {/* Services */}
                                            <Collapsible>
                                                <div className="space-y-2 mb-3">
                                                    {salon.services.slice(0, 3).map((service, idx) => (
                                                        <div key={idx}
                                                             className="flex items-center justify-between text-sm p-2 rounded-lg border border-[#d4af37]/10 dark:bg-black/30 cream:bg-white/50">
                                                        <span
                                                            className="dark:text-white/80 cream:text-foreground/80">{service.name}</span>
                                                            <div className="flex items-center gap-3">
                                                                <span className="text-[#d4af37]">{service.price}</span>
                                                                <span
                                                                    className="dark:text-white/40 cream:text-foreground/40">{service.duration}</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                {salon.services.length > 3 && (
                                                    <>
                                                        <CollapsibleContent>
                                                            <div className="space-y-2 mb-3">
                                                                {salon.services.slice(3).map((service, idx) => (
                                                                    <div key={idx}
                                                                         className="flex items-center justify-between text-sm p-2 rounded-lg border border-[#d4af37]/10 dark:bg-black/30 cream:bg-white/50">
                                                                    <span
                                                                        className="dark:text-white/80 cream:text-foreground/80">{service.name}</span>
                                                                        <div className="flex items-center gap-3">
                                                                        <span
                                                                            className="text-[#d4af37]">{service.price}</span>
                                                                            <span
                                                                                className="dark:text-white/40 cream:text-foreground/40">{service.duration}</span>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </CollapsibleContent>
                                                        <CollapsibleTrigger asChild>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                className="cursor-pointer w-full text-[#d4af37] hover:text-[#f0d976] hover:bg-[#d4af37]/10 mb-3"
                                                                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                                                    e.stopPropagation();
                                                                }}
                                                            >
                                                                See More Services
                                                                <ChevronDown className="h-4 w-4 ml-1"/>
                                                            </Button>
                                                        </CollapsibleTrigger>
                                                    </>
                                                )}
                                            </Collapsible>

                                            <div
                                                className="flex items-center justify-between pt-3 border-t border-[#d4af37]/10">
                                                <div className="flex items-center gap-2">
                                                    <Clock className="h-4 w-4 text-green-500"/>
                                                    <span className="text-green-500 text-sm">{salon.availability}</span>
                                                </div>
                                                <Button
                                                    size="sm"
                                                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                                        navigate(`/salon/${salon.id}`);
                                                        e.stopPropagation();
                                                    }}
                                                    className="cursor-pointer bg-gradient-to-r from-[#d4af37] to-[#f0d976] dark:text-black cream:text-white hover:from-[#b8941f] hover:to-[#d4af37]"
                                                >
                                                    Book Now
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Map View - 70% */}
                    <div className="w-full lg:w-[70%]">
                        <div className="sticky top-20">
                            <SearchControls
                                triggerInitialSearch={triggerInitialSearch}
                                onSearch={handleSearch}
                            />
                            <div id="map"
                                className="relative mt-4 h-[calc(100vh-300px)] rounded-2xl border border-[#d4af37]/20 overflow-hidden dark:bg-gradient-to-br dark:from-zinc-900 dark:to-black cream:bg-gradient-to-br cream:from-[#f5f1e8] cream:to-white">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
         @keyframes slideOutLeft {
           from {
             opacity: 1;
             transform: translateX(0);
           }
           to {
             opacity: 0;
             transform: translateX(-100%);
           }
         }

         @keyframes slideOutRight {
           from {
             opacity: 1;
             transform: translateX(0);
           }
           to {
             opacity: 0;
             transform: translateX(100%);
           }
         }

         @keyframes slideIn {
           from {
             opacity: 0;
             transform: translateX(0);
           }
           to {
             opacity: 1;
             transform: translateX(0);
           }
         }

         .animate-slideOutLeft {
           animation: slideOutLeft 0.3s ease-in-out forwards;
         }

         .animate-slideOutRight {
           animation: slideOutRight 0.3s ease-in-out forwards;
         }

         .animate-slideIn {
           animation: slideIn 0.3s ease-in-out forwards;
         }

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
