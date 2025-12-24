import React, {useEffect, useRef, useState} from 'react';
import {MapPin, Search, Calendar, Clock} from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar as CalendarComponent } from './ui/calendar';
import { Autocomplete } from './ui/Autocomplete';
import { Slider } from './ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useLazyReverseGeocodeQuery } from '../services/olaMaps.api';

const timeOptions = Array.from({ length: 48 }, (_, i) => {
  const hour = Math.floor(i / 2);
  const minute = i % 2 === 0 ? '00' : '30';
  const period = hour < 12 ? 'AM' : 'PM';
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${displayHour}:${minute} ${period}`;
});

type Props = {
  // optional callback invoked when user clicks Search; receives the saved search details
  onSearch?: (details: Record<string, any>) => void;
  triggerInitialSearch?: boolean;
};

export function SearchControls({
  triggerInitialSearch,
  onSearch,
}: Props) {
  const [date, setDate] = useState<Date>();
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [fromTime, setFromTime] = useState('9:00 AM');
  const [toTime, setToTime] = useState('6:00 PM');
  const [distance, setDistance] = useState([5]);
  const [location, setLocation] = useState<any>({});
  const [locationText, setLocationText] = useState('');
  const [serviceQuery, setServiceQuery] = useState('');
  const serviceRef = useRef<HTMLInputElement | null>(null);

  const setServiceAndFocus = (val: string) => {
    setServiceQuery(val);
    setTimeout(() => serviceRef?.current?.focus(), 0);
  };

  // Reverse geocode hook (lazy): will be triggered on mount if userLocation exists in localStorage
  const [triggerReverseGeocode, reverseResult] = useLazyReverseGeocodeQuery();
  const didRunReverseGeocodeRef = useRef(false);

  useEffect(() => {
    populateSearchDetailsFromLocalStorage();
    if(triggerInitialSearch) {
        handleSearchClick();
    }
  }, []);

  useEffect(() => {
    // Run reverse geocode only once per mount
    if (didRunReverseGeocodeRef.current) return;
    didRunReverseGeocodeRef.current = true;

    try {
      const lastSearchDetails = localStorage.getItem('lastSearchDetails');
      if (lastSearchDetails) return;

      const raw = localStorage.getItem('userLocation');
      if (!raw) return;
      const parsed = JSON.parse(raw);
      const lat = parsed?.latitude ?? parsed?.lat ?? parsed?.coords?.latitude;
      const lng = parsed?.longitude ?? parsed?.lng ?? parsed?.coords?.longitude;
      if (lat != null && lng != null) {
        triggerReverseGeocode(`${lat},${lng}`);
      }
    } catch (e) {
      // ignore malformed localStorage
    }
  }, [triggerReverseGeocode]);

  // When reverse geocode returns, update location prop via setLocation
  useEffect(() => {
    const data = (reverseResult as any)?.data;
    if (data && data.address) {
      setLocation({
        address: data.address,
        lat: data.lat,
        lng: data.lng,
      });
    }
  }, [reverseResult]);

  // Load lastSearchDetails from localStorage and apply to fields on mount
  const populateSearchDetailsFromLocalStorage = () => {
    try {
      const raw = localStorage.getItem('lastSearchDetails');
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (!parsed) return;
      if (parsed.location) {
        setLocation(parsed.location);
        setLocationText(parsed.location.address);
      }
      if (parsed.serviceQuery) setServiceQuery(parsed.serviceQuery);
      if (parsed.date && setDate) {
        const d = new Date(parsed.date);
        if (!isNaN(d.getTime())) setDate(d);
      }
      if (parsed.fromTime && setFromTime) setFromTime(parsed.fromTime);
      if (parsed.toTime && setToTime) setToTime(parsed.toTime);
      if (parsed.distance != null && setDistance) {
        const num = Number(parsed.distance);
        if (!isNaN(num)) setDistance([num]);
      }
    } catch (e) {
      // ignore malformed or missing storage
    }
  }

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


  // Handler for Search button: save lastSearchDetails to localStorage and call parent onSearch
  const handleSearchClick = () => {
    const rawUserLoc = (() => {
      try { return JSON.parse(localStorage.getItem('userLocation') || 'null'); } catch { return null; }
    })();

    if(!location || !location.address) {
      // if location is not set, do not proceed
      return;
    }
    const lastSearchDetails: Record<string, any> = {
      location,
      serviceQuery,
      date: date ? new Date(date).toISOString() : null,
      fromTime,
      toTime,
      distance: distance[0],
      // prefer reverse geocode lat/lng, fallback to stored userLocation
      lat: location?.lat ?? rawUserLoc?.latitude ?? rawUserLoc?.lat ?? null,
      lng: location?.lng ?? rawUserLoc?.longitude ?? rawUserLoc?.lng ?? null,
      timestamp: new Date().toISOString(),
    };

    try {
      localStorage.setItem('lastSearchDetails', JSON.stringify(lastSearchDetails));
      onSearch && onSearch(lastSearchDetails);
    } catch (e) {
      // ignore storage errors
    }

  };

  const onLocationSelect = (item: any) => {
    setLocation({
      address: item.description,
      lat: item.location.lat,
      lng: item.location.lng,
    });
  }

  return (
    <div className="backdrop-blur-lg rounded-2xl border border-[#d4af37]/20 p-6 shadow-2xl dark:bg-gradient-to-br dark:from-zinc-900/90 dark:to-black/90 cream:bg-gradient-to-br cream:from-white/90 cream:to-[#f5f1e8]/90">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#d4af37]" />
          <Autocomplete
            value={locationText}
            onChange={setLocationText}
            onSelect={onLocationSelect}
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
                {date ? new Date(date).toLocaleDateString() :
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
              onSelect={(d: any) => setDate && setDate(d)}
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
                  className="bg-gradient-to-r from-[#d4af37] to-[#f0d976] dark:text-black cream:text-white hover:from-[#b8941f] hover:to-[#d4af37]"
                >
                  Morning
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleTimePreset('afternoon')}
                  className="bg-gradient-to-r from-[#d4af37] to-[#f0d976] dark:text-black cream:text-white hover:from-[#b8941f] hover:to-[#d4af37]"
                >
                  Afternoon
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleTimePreset('evening')}
                  className="bg-gradient-to-r from-[#d4af37] to-[#f0d976] dark:text-black cream:text-white hover:from-[#b8941f] hover:to-[#d4af37]"
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

      <Button onClick={handleSearchClick}
              className="cursor-pointer w-full mt-6 bg-gradient-to-r from-[#d4af37] to-[#f0d976] dark:text-black cream:text-white hover:from-[#b8941f] hover:to-[#d4af37] h-12">
        <Search className="h-5 w-5 mr-2" />
        Search Salons
      </Button>
    </div>
  );
}
