import React, { useState, useEffect, useRef } from 'react';
import {Sparkles, Smartphone, Apple, PlayCircle} from 'lucide-react';
import { Button } from './ui/button';
import { SalonCard } from './SalonCard';
import { ImageWithFallback } from './shared/ImageWithFallback';
import { useLazyReverseGeocodeQuery } from '../services/olaMaps.api';
import { SearchControls } from './SearchControls';
import {useNavigate} from "react-router-dom";

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
	// navigate to /salons when the user searches
	const navigate = useNavigate();
	const handleSearch = (details: Record<string, any>) => {
		// store details in history state so SalonsPage can access them via location.state if needed
		navigate('/salons');
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
						<SearchControls
							onSearch={handleSearch}
						/>
					</div>
				</div>
			</section>

			{/* Recently Viewed Salons */}
			<section className="py-12 px-4 dark:bg-gradient-to-b dark:from-black dark:to-zinc-950 cream:bg-gradient-to-b cream:from-[#faf8f3] cream:to-[#f5f1e8]">
				<div className="container mx-auto">
					<h2 className="mb-6 bg-gradient-to-r from-[#d4af37] to-[#f0d976] bg-clip-text text-transparent">
						Recently Booked Salons
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
