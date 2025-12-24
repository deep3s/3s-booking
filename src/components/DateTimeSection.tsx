import { Calendar, Clock, Sparkles, Star, Check } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Calendar as CalendarComponent } from './ui/calendar';
import { ImageWithFallback } from './shared/ImageWithFallback';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
  "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM"
];

export function DateTimeSection() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<any[]>([]);
  const [salonDetails, setSalonDetails] = useState<any>(null);
  const [selectedSpecialist, setSelectedSpecialist] = useState<any>(null);

  // Load data from localStorage
  useEffect(() => {
    const storedServices = localStorage.getItem('selectedServices');
    const storedSalon = localStorage.getItem('selectedSalon');
    const storedSpecialist = localStorage.getItem('selectedSpecialist');

    if (storedServices) {
      setSelectedServices(JSON.parse(storedServices));
    }
    if (storedSalon) {
      setSalonDetails(JSON.parse(storedSalon));
    }
    if (storedSpecialist) {
      const data = JSON.parse(storedSpecialist);
      setSelectedSpecialist(data.specialist);
    }
  }, []);

  const totalPrice = selectedServices.reduce((sum, service) => sum + (service?.price || 0), 0);
  const totalDuration = selectedServices.reduce((sum, service) => {
    const duration = parseInt(service?.duration || '0');
    return sum + duration;
  }, 0);

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      // Save date and time to localStorage
      localStorage.setItem('selectedDateTime', JSON.stringify({
        date: selectedDate.toISOString(),
        time: selectedTime
      }));
      navigate('/payment');
    }
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <section className="py-12 px-4 dark:bg-gradient-to-b dark:from-black dark:via-zinc-950 dark:to-black cream:bg-gradient-to-b cream:from-[#faf8f3] cream:via-[#f5f1e8] cream:to-[#faf8f3]">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#d4af37]/20 to-[#f0d976]/20 border border-[#d4af37]/30 mb-4">
            <Calendar className="h-4 w-4 text-[#d4af37]" />
            <span className="text-[#d4af37]">Step 4: Select Date & Time</span>
          </div>
          <h2 className="mb-3 bg-gradient-to-r dark:from-white dark:via-[#f0d976] dark:to-white cream:from-foreground cream:via-[#d4af37] cream:to-foreground bg-clip-text text-transparent">
            Choose Your Appointment
          </h2>
          <p className="dark:text-white/60 cream:text-foreground/60">
            Select your preferred date and time slot
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Date & Time Selection - Left Side (2 columns) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Calendar */}
            <Card className="border-[#d4af37]/30 dark:bg-gradient-to-br dark:from-zinc-900/90 dark:to-black/90 cream:bg-gradient-to-br cream:from-white cream:to-[#f5f1e8]">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Calendar className="h-5 w-5 text-[#d4af37]" />
                  <h3 className="dark:text-white cream:text-foreground">Select Date</h3>
                </div>

                <div className="flex justify-center">
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                    className="rounded-xl border border-[#d4af37]/20 dark:bg-black/50 cream:bg-white p-4"
                  />
                </div>

                {selectedDate && (
                  <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-[#d4af37]/10 to-[#f0d976]/10 border border-[#d4af37]/30">
                    <p className="dark:text-white/60 cream:text-foreground/60 text-sm mb-1">
                      Selected Date
                    </p>
                    <p className="text-[#d4af37]">
                      {formatDate(selectedDate)}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Time Slots */}
            {selectedDate && (
              <Card className="border-[#d4af37]/30 dark:bg-gradient-to-br dark:from-zinc-900/90 dark:to-black/90 cream:bg-gradient-to-br cream:from-white cream:to-[#f5f1e8]">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Clock className="h-5 w-5 text-[#d4af37]" />
                    <h3 className="dark:text-white cream:text-foreground">Select Time Slot</h3>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                    {timeSlots.map((time) => {
                      const isSelected = selectedTime === time;
                      return (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`px-3 py-3 rounded-lg border transition-all text-sm ${
                            isSelected
                              ? 'bg-gradient-to-r from-[#d4af37] to-[#f0d976] dark:text-black cream:text-white border-transparent shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                              : 'border-[#d4af37]/30 hover:border-[#d4af37]/50 dark:bg-black/50 dark:text-white cream:bg-white cream:text-foreground'
                          }`}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>

                  {selectedTime && (
                    <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-[#d4af37]/10 to-[#f0d976]/10 border border-[#d4af37]/30">
                      <p className="dark:text-white/60 cream:text-foreground/60 text-sm mb-1">
                        Selected Time
                      </p>
                      <p className="text-[#d4af37]">
                        {selectedTime}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
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
                        <div className="space-y-2 max-h-[200px] overflow-y-auto">
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

                      {/* Specialist */}
                      {selectedSpecialist && (
                        <div className="mb-4 p-3 rounded-lg border border-[#d4af37]/20 dark:bg-black/30 cream:bg-[#faf8f3]/50">
                          <h5 className="dark:text-white cream:text-foreground text-sm mb-2">
                            Specialist
                          </h5>
                          <div className="flex items-center gap-2">
                            <ImageWithFallback
                              src={selectedSpecialist.image}
                              alt={selectedSpecialist.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                              <p className="text-[#d4af37] text-sm">
                                {selectedSpecialist.name}
                              </p>
                              <p className="dark:text-white/60 cream:text-foreground/60 text-xs">
                                {selectedSpecialist.title}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Date & Time */}
                      {(selectedDate || selectedTime) && (
                        <div className="mb-4 p-3 rounded-lg border border-[#d4af37]/20 dark:bg-black/30 cream:bg-[#faf8f3]/50">
                          <h5 className="dark:text-white cream:text-foreground text-sm mb-2">
                            Appointment Details
                          </h5>
                          {selectedDate && (
                            <p className="dark:text-white/60 cream:text-foreground/60 text-xs mb-1">
                              <span className="text-[#d4af37]">Date:</span> {formatDate(selectedDate)}
                            </p>
                          )}
                          {selectedTime && (
                            <p className="dark:text-white/60 cream:text-foreground/60 text-xs">
                              <span className="text-[#d4af37]">Time:</span> {selectedTime}
                            </p>
                          )}
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
                      {selectedDate && selectedTime ? (
                        <Button
                          onClick={handleContinue}
                          className="w-full bg-gradient-to-r from-[#d4af37] to-[#f0d976] dark:text-black cream:text-white hover:from-[#b8941f] hover:to-[#d4af37] h-12"
                        >
                          <Check className="h-5 w-5 mr-2" />
                          Continue to Payment
                        </Button>
                      ) : (
                        <div className="text-center py-4">
                          <p className="dark:text-white/60 cream:text-foreground/60 text-sm">
                            {!selectedDate ? 'Select a date' : 'Select a time slot'}
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
