import React, { useState, useEffect, useRef } from 'react';
import {Search, MapPin, Calendar, Sparkles, Smartphone, Apple, PlayCircle, Clock} from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar as CalendarComponent } from './ui/calendar';
import { SalonCard } from './SalonCard';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { format } from 'date-fns';
import { Autocomplete } from './ui/Autocomplete';
import {Slider} from "./ui/slider";
import { useLazyReverseGeocodeQuery } from '../services/olaMaps.api';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from './ui/select';

const timeOptions = Array.from({ length: 48 }, (_, i) => {
	const hour = Math.floor(i / 2);
	const minute = i % 2 === 0 ? '00' : '30';
	const period = hour < 12 ? 'AM' : 'PM';
	const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
	return `${displayHour}:${minute} ${period}`;
});
const mockSalons = [
	{
		id: 1,
		name: 'Golden Crown Salon',
		rating: 4.9,
		reviews: 234,
		image:
			'https://images.unsplash.com/photo-1681965823525-b684fb97e9fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzYWxvbiUyMGludGVyaW9yfGVufDF8fHx8MTc2MDc2ODE3M3ww&ixlib=rb-4.1.0&q=80&w=1080',
		address: '123 Luxury Ave, Downtown',
		distance: '0.5 mi',
		priceRange: '$$$',
		availability: 'Available Today',
	},
	{
		id: 2,
		name: 'Prestige Hair Studio',
		rating: 4.8,
		reviews: 189,
		image:
			'https://images.unsplash.com/photo-1750263160581-d332256293bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiZWF1dHklMjBzYWxvbnxlbnwxfHx8fDE3NjA4MTc4Njh8MA&ixlib=rb-4.1.0&q=80&w=1080',
		address: '456 Fashion St, Midtown',
		distance: '1.2 mi',
		priceRange: '$$',
		availability: '3 slots left',
	},
	{
		id: 3,
		name: 'Elite Beauty Lounge',
		rating: 4.7,
		reviews: 156,
		image:
			'https://images.unsplash.com/photo-1626379501846-0df4067b8bb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwc2Fsb24lMjBjaGFpcnxlbnwxfHx8fDE3NjA4MTc4Njh8MA&ixlib=rb-4.1.0&q=80&w=1080',
		address: '789 Style Blvd, Uptown',
		distance: '2.1 mi',
		priceRange: '$$$',
		availability: 'Book Tomorrow',
	},
	{
		id: 4,
		name: 'Luxury Spa & Salon',
		rating: 4.9,
		reviews: 302,
		image:
			'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGElMjBzYWxvbnxlbnwxfHx8fDE3NjA3MDEwOTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
		address: '321 Wellness Way, Downtown',
		distance: '0.8 mi',
		priceRange: '$$$$',
		availability: 'Available Today',
	},
];

export function SearchSection() {
     const [date, setDate] = useState<Date>();
	const [showTimeDropdown, setShowTimeDropdown] = useState(false);
	const [fromTime, setFromTime] = useState('9:00 AM');
	const [toTime, setToTime] = useState('6:00 PM');
	const [distance, setDistance] = useState([5]);
	const [location, setLocation] = useState('');
	// Controlled state for the "Service or Salon" input
	const [serviceQuery, setServiceQuery] = useState('');
	const serviceRef = useRef<HTMLInputElement | null>(null);

	const setServiceAndFocus = (val: string) => {
		setServiceQuery(val);
		// focus the input after state update
		setTimeout(() => serviceRef.current?.focus(), 0);
	};

	// lazy reverse geocode hook - we'll trigger on mount when localStorage has userLocation
	const [triggerReverseGeocode, reverseResult] = useLazyReverseGeocodeQuery();
	const didRunRef = useRef(false);

	useEffect(() => {
		// run only once
		if (didRunRef.current) return;
		didRunRef.current = true;

		try {
			const raw = localStorage.getItem('userLocation');
			if (!raw) return;
			const parsed = JSON.parse(raw);
			// expected shape: { latitude, longitude, timestamp, source }
			const lat = parsed?.latitude ?? parsed?.lat ?? parsed?.coords?.latitude;
			const lng = parsed?.longitude ?? parsed?.lng ?? parsed?.coords?.longitude;
			if (lat != null && lng != null) {
				// trigger reverse geocode with "lat,lng" string
				triggerReverseGeocode(`${lat},${lng}`);
			}
		} catch (e) {
			// ignore parse errors
		}
	}, [triggerReverseGeocode]);

	// when reverse geocode returns, set location from the address field (if present)
	useEffect(() => {
		const data = (reverseResult as any)?.data;
		if (data && data.address) {
			setLocation(data.address);
		}
	}, [reverseResult]);

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
		<>
			<section className="relative py-20 px-4 overflow-hidden">
				<div className="absolute inset-0 dark:bg-gradient-to-br dark:from-black dark:via-zinc-900 dark:to-black cream:bg-gradient-to-br cream:from-[#faf8f3] cream:via-[#f5f1e8] cream:to-[#faf8f3]" />
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.1),transparent_50%)]" />
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(240,217,118,0.05),transparent_50%)]" />

				<div className="container mx-auto relative z-10">
					<div className="text-center mb-12">
						<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#d4af37]/20 to-[#f0d976]/20 border border-[#d4af37]/30 mb-6">
							<Sparkles className="h-4 w-4 text-[#d4af37]" />
							<span className="text-[#d4af37]">Premium Salon Booking</span>
						</div>

						<h1 className="mb-4 bg-gradient-to-r dark:from-white dark:via-[#f0d976] dark:to-white cream:from-foreground cream:via-[#d4af37] cream:to-foreground bg-clip-text text-transparent">
							Discover Your Perfect Salon Experience
						</h1>
						<p className="dark:text-white/60 cream:text-foreground/60 max-w-2xl mx-auto">
							Book appointments with top-rated salons and beauty specialists in your area
						</p>
					</div>

					<div className="max-w-5xl mx-auto">
						<div className="backdrop-blur-lg rounded-2xl border border-[#d4af37]/20 p-6 shadow-2xl dark:bg-gradient-to-br dark:from-zinc-900/90 dark:to-black/90 cream:bg-gradient-to-br cream:from-white/90 cream:to-[#f5f1e8]/90">
							<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
								<div className="relative">
									<MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#d4af37]" />
									<Autocomplete
										value={location}
										onChange={setLocation}
										onSelect={(item) => setLocation(item.description || '')}
										placeholder="Location"
										className="pl-10 border-[#d4af37]/30 focus:border-[#d4af37] dark:bg-black/50 dark:text-white dark:placeholder:text-white/40 cream:bg-white cream:text-foreground cream:placeholder:text-foreground/40"
									/>
								</div>

								<div className="relative">
									<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#d4af37]" />
									<Input
										ref={(serviceRef as any)}
										value={serviceQuery}
										onChange={(e) => setServiceQuery((e as any).target.value)}
										placeholder="Service or Salon"
										className="pl-10 border-[#d4af37]/30 focus:border-[#d4af37] dark:bg-black/50 dark:text-white dark:placeholder:text-white/40 cream:bg-white cream:text-foreground cream:placeholder:text-foreground/40"
									/>
								</div>

								<Popover>
									<PopoverTrigger asChild>
										<div className="relative w-full">
											<Button
												variant="outline"
												className="justify-start text-left w-full border-[#d4af37]/30 hover:border-[#d4af37] dark:bg-black/50 dark:text-white dark:hover:bg-black/70 dark:hover:text-white cream:bg-white cream:text-foreground cream:hover:bg-[#f5f1e8]"
											>
												<Calendar className="mr-2 h-5 w-5 text-[#d4af37]"/>
												{date ? format(date, 'PPP') :
													<span className="dark:text-white/40 cream:text-foreground/40">Pick a date</span>}
											</Button>
										</div>
									</PopoverTrigger>
									<PopoverContent className="w-auto p-0 border-[#d4af37]/30 dark:bg-zinc-900 cream:bg-white" align="start">
										<div className="flex gap-2 p-3 border-b border-[#d4af37]/20 ">
											<Button
												size="sm"
												onClick={() => handleQuickDate('today')}
												className="bg-gradient-to-r from-[#d4af37] to-[#f0d976] dark:text-black cream:text-white hover:from-[#b8941f] hover:to-[#d4af37]"
											>
												Today
											</Button>
											<Button
												size="sm"
												onClick={() => handleQuickDate('tomorrow')}
												className="bg-gradient-to-r from-[#d4af37] to-[#f0d976] dark:text-black cream:text-white hover:from-[#b8941f] hover:to-[#d4af37]"
											>
												Tomorrow
											</Button>
										</div>
										<CalendarComponent
											mode="single"
											selected={date}
											onSelect={setDate}
											initialFocus
											className="dark:bg-zinc-900 dark:text-white cream:bg-white cream:text-foreground"
										/>
									</PopoverContent>
								</Popover>
							</div>

							<div className="grid md:grid-cols-2 gap-4 mb-4">
								<Popover open={showTimeDropdown} onOpenChange={setShowTimeDropdown}>
									<PopoverTrigger asChild>
										<div className="relative w-full">
											<Button
												variant="outline"
												className="justify-start w-full text-left border-[#d4af37]/30 hover:border-[#d4af37] dark:bg-black/50 dark:text-white dark:hover:bg-black/70 dark:hover:text-white cream:bg-white cream:text-foreground cream:hover:bg-[#f5f1e8]"
											>
												<Clock className="mr-2 h-5 w-5 text-[#d4af37]"/>
												<span>{fromTime} - {toTime}</span>
											</Button>
										</div>
									</PopoverTrigger>
									<PopoverContent className="w-80 border-[#d4af37]/30 dark:bg-zinc-900 cream:bg-white" align="start">
                    <div className="space-y-4">
                      <div className="flex gap-2 mb-3">
                        <Button
                          size="sm"
                          onClick={() => handleTimePreset('morning')}
                          className="flex-1 bg-gradient-to-r from-[#d4af37] to-[#f0d976] dark:text-black cream:text-white hover:from-[#b8941f] hover:to-[#d4af37]"
                        >
                          Morning
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleTimePreset('afternoon')}
                          className="flex-1 bg-gradient-to-r from-[#d4af37] to-[#f0d976] dark:text-black cream:text-white hover:from-[#b8941f] hover:to-[#d4af37]"
                        >
                          Afternoon
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleTimePreset('evening')}
                          className="flex-1 bg-gradient-to-r from-[#d4af37] to-[#f0d976] dark:text-black cream:text-white hover:from-[#b8941f] hover:to-[#d4af37]"
                        >
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
                              <SelectItem key={time} value={time} className="dark:text-white cream:text-foreground hover:bg-[#d4af37]/20">
                                {time}
                              </SelectItem>
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
                              <SelectItem key={time} value={time} className="dark:text-white cream:text-foreground hover:bg-[#d4af37]/20">
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

								<div className="space-y-2">
									<div className="flex items-center justify-between text-sm">
										<span className="dark:text-white/80 cream:text-foreground/80">Distance</span>
										<span className="text-[#d4af37]">{distance[0]} km</span>
									</div>
									<Slider
										value={distance}
										onValueChange={setDistance}
										max={50}
										min={1}
										step={1}
										className="cursor-pointer"
									/>
								</div>
							</div>

							<div className="mt-4 flex flex-wrap gap-3">
								<span className="dark:text-white/60 cream:text-foreground/60">Popular:</span>
								<button onClick={() => setServiceAndFocus('Haircut')} className="px-4 py-1 rounded-full bg-gradient-to-r from-[#d4af37]/10 to-[#f0d976]/10 border border-[#d4af37]/30 text-[#d4af37] hover:from-[#d4af37]/20 hover:to-[#f0d976]/20 transition-all">
									Haircut
								</button>
								<button onClick={() => setServiceAndFocus('Manicure')} className="px-4 py-1 rounded-full bg-gradient-to-r from-[#d4af37]/10 to-[#f0d976]/10 border border-[#d4af37]/30 text-[#d4af37] hover:from-[#d4af37]/20 hover:to-[#f0d976]/20 transition-all">
									Manicure
								</button>
								<button onClick={() => setServiceAndFocus('Facial')} className="px-4 py-1 rounded-full bg-gradient-to-r from-[#d4af37]/10 to-[#f0d976]/10 border border-[#d4af37]/30 text-[#d4af37] hover:from-[#d4af37]/20 hover:to-[#f0d976]/20 transition-all">
									Facial
								</button>
								<button onClick={() => setServiceAndFocus('Spa')} className="px-4 py-1 rounded-full bg-gradient-to-r from-[#d4af37]/10 to-[#f0d976]/10 border border-[#d4af37]/30 text-[#d4af37] hover:from-[#d4af37]/20 hover:to-[#f0d976]/20 transition-all">
									Spa
								</button>
							</div>

							<Button className="w-full mt-6 bg-gradient-to-r from-[#d4af37] to-[#f0d976] dark:text-black cream:text-white hover:from-[#b8941f] hover:to-[#d4af37] h-12">
								<Search className="h-5 w-5 mr-2" />
								Search Salons
							</Button>
						</div>
					</div>
				</div>
			</section>

			{/* Recently Viewed Salons */}
			<section className="py-12 px-4 dark:bg-gradient-to-b dark:from-black dark:to-zinc-950 cream:bg-gradient-to-b cream:from-[#faf8f3] cream:to-[#f5f1e8]">
				<div className="container mx-auto">
					<h2 className="mb-6 bg-gradient-to-r from-[#d4af37] to-[#f0d976] bg-clip-text text-transparent">
						Recently Viewed
					</h2>
					<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
						{mockSalons.map((salon) => (
							<SalonCard key={salon.id} {...salon} />
						))}
					</div>
				</div>
			</section>

			{/* Recommended Salons */}
			<section className="py-12 px-4 dark:bg-gradient-to-b dark:from-zinc-950 dark:to-black cream:bg-gradient-to-b cream:from-[#f5f1e8] cream:to-[#faf8f3]">
				<div className="container mx-auto">
					<h2 className="mb-6 bg-gradient-to-r from-[#d4af37] to-[#f0d976] bg-clip-text text-transparent">
						Recommended for You
					</h2>
					<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
						{mockSalons.map((salon) => (
							<SalonCard key={salon.id} {...salon} />
						))}
					</div>
				</div>
			</section>

			{/* Newly Launched Salons */}
			<section className="py-12 px-4 dark:bg-gradient-to-b dark:from-black dark:to-zinc-950 cream:bg-gradient-to-b cream:from-[#faf8f3] cream:to-[#f5f1e8]">
				<div className="container mx-auto">
					<h2 className="mb-6 bg-gradient-to-r from-[#d4af37] to-[#f0d976] bg-clip-text text-transparent">
						Newly Launched
					</h2>
					<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
						{mockSalons.map((salon) => (
							<SalonCard key={salon.id} {...salon} />
						))}
					</div>
				</div>
			</section>

			{/* Popular Salons */}
			<section className="py-12 px-4 dark:bg-gradient-to-b dark:from-zinc-950 dark:to-black cream:bg-gradient-to-b cream:from-[#f5f1e8] cream:to-[#faf8f3]">
				<div className="container mx-auto">
					<h2 className="mb-6 bg-gradient-to-r from-[#d4af37] to-[#f0d976] bg-clip-text text-transparent">
						Popular Salons
					</h2>
					<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
						{mockSalons.map((salon) => (
							<SalonCard key={salon.id} {...salon} />
						))}
					</div>
				</div>
			</section>

			{/* Mobile App Download Section */}
			<section className="py-20 px-4 relative overflow-hidden dark:bg-gradient-to-b dark:from-black dark:via-zinc-900 dark:to-black cream:bg-gradient-to-b cream:from-[#faf8f3] cream:via-[#f5f1e8] cream:to-[#faf8f3]">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.1),transparent_70%)]" />

				<div className="container mx-auto relative z-10">
					<div className="grid lg:grid-cols-2 gap-12 items-center">
						<div>
							<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#d4af37]/20 to-[#f0d976]/20 border border-[#d4af37]/30 mb-6">
								<Smartphone className="h-4 w-4 text-[#d4af37]" />
								<span className="text-[#d4af37]">Get the App</span>
							</div>

							<h2 className="mb-4 bg-gradient-to-r dark:from-white dark:via-[#f0d976] dark:to-white cream:from-foreground cream:via-[#d4af37] cream:to-foreground bg-clip-text text-transparent">
								Book on the Go
							</h2>
							<p className="dark:text-white/60 cream:text-foreground/60 mb-8 max-w-lg">
								Download our mobile app for the ultimate booking experience. Get exclusive deals, instant notifications, and manage your appointments anywhere, anytime.
							</p>

							<div className="flex flex-col sm:flex-row gap-4">
								<Button className="border border-[#d4af37]/30 hover:border-[#d4af37] h-14 px-6 dark:bg-black dark:text-white cream:bg-white cream:text-foreground">
									<Apple className="h-6 w-6 mr-3" />
									<div className="text-left">
										<div className="text-xs dark:text-white/60 cream:text-foreground/60">Download on the</div>
										<div>App Store</div>
									</div>
								</Button>
								<Button className="border border-[#d4af37]/30 hover:border-[#d4af37] h-14 px-6 dark:bg-black dark:text-white cream:bg-white cream:text-foreground">
									<PlayCircle className="h-6 w-6 mr-3" />
									<div className="text-left">
										<div className="text-xs dark:text-white/60 cream:text-foreground/60">Get it on</div>
										<div>Google Play</div>
									</div>
								</Button>
							</div>
						</div>

						<div className="relative flex justify-center gap-6">
							<div className="relative animate-float">
								<div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/20 to-[#f0d976]/20 blur-3xl" />
								<ImageWithFallback
									src="https://images.unsplash.com/photo-1629697776809-f37ceac39e77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBtb2NrdXB8ZW58MXx8fHwxNzYwNzQ4NTcyfDA&ixlib=rb-4.1.0&q=80&w=1080"
									alt="Mobile App"
									className="relative w-64 h-auto rounded-3xl shadow-2xl border border-[#d4af37]/20"
								/>
							</div>
							<div className="relative animate-float-delayed">
								<div className="absolute inset-0 bg-gradient-to-br from-[#f0d976]/20 to-[#d4af37]/20 blur-3xl" />
								<ImageWithFallback
									src="https://images.unsplash.com/photo-1730818028738-21c19c7103fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwYXBwJTIwc2NyZWVufGVufDF8fHx8MTc2MDc2MTYzMnww&ixlib=rb-4.1.0&q=80&w=1080"
									alt="Mobile App"
									className="relative w-64 h-auto rounded-3xl shadow-2xl border border-[#d4af37]/20"
								/>
							</div>
						</div>
					</div>
				</div>
			</section>

			<style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(-10px);
          }
          50% {
            transform: translateY(-30px);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 3s ease-in-out infinite;
          animation-delay: 0.5s;
        }
      `}</style>
		</>
	);
}
