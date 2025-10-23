import { CreditCard, Lock, Check, Calendar, Clock, User, Scissors, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { useState } from 'react';

export function PaymentSection() {
  const [paymentComplete, setPaymentComplete] = useState(false);

  const bookingSummary = {
    salon: "Golden Crown Salon",
    specialist: "Sofia Martinez",
    services: [
      { name: "Premium Haircut", price: 75, duration: "60 min" },
      { name: "Hair Coloring", price: 150, duration: "120 min" }
    ],
    date: "Oct 15, 2025",
    time: "2:00 PM",
    subtotal: 225,
    tax: 22.5,
    total: 247.5
  };

  return (
    <section className="py-12 px-4 min-h-screen dark:bg-gradient-to-b dark:from-black dark:via-zinc-950 dark:to-black cream:bg-gradient-to-b cream:from-[#faf8f3] cream:via-[#f5f1e8] cream:to-[#faf8f3]">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#d4af37]/20 to-[#f0d976]/20 border border-[#d4af37]/30 mb-4">
            <CreditCard className="h-4 w-4 text-[#d4af37]" />
            <span className="text-[#d4af37]">Step 4: Payment</span>
          </div>
          <h2 className="mb-3 bg-gradient-to-r dark:from-white dark:via-[#f0d976] dark:to-white cream:from-foreground cream:via-[#d4af37] cream:to-foreground bg-clip-text text-transparent">
            Complete Your Booking
          </h2>
          <p className="dark:text-white/60 cream:text-foreground/60">
            Review your booking and complete payment
          </p>
        </div>

        {!paymentComplete ? (
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Payment Form */}
            <div className="lg:col-span-3 space-y-6">
              <Card className="border-[#d4af37]/20 dark:bg-gradient-to-br dark:from-zinc-900/90 dark:to-black/90 cream:bg-gradient-to-br cream:from-white cream:to-[#f5f1e8]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 dark:text-white cream:text-foreground">
                    <Lock className="h-5 w-5 text-[#d4af37]" />
                    Secure Payment
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="cardName" className="dark:text-white/80 cream:text-foreground/80">Cardholder Name</Label>
                    <Input 
                      id="cardName"
                      placeholder="John Doe"
                      className="mt-1 border-[#d4af37]/30 focus:border-[#d4af37] dark:bg-black/50 dark:text-white dark:placeholder:text-white/40 cream:bg-white cream:text-foreground cream:placeholder:text-foreground/40"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="cardNumber" className="dark:text-white/80 cream:text-foreground/80">Card Number</Label>
                    <div className="relative mt-1">
                      <Input 
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        className="border-[#d4af37]/30 focus:border-[#d4af37] dark:bg-black/50 dark:text-white dark:placeholder:text-white/40 cream:bg-white cream:text-foreground cream:placeholder:text-foreground/40"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                        <div className="w-8 h-5 bg-gradient-to-r from-blue-500 to-blue-600 rounded"></div>
                        <div className="w-8 h-5 bg-gradient-to-r from-red-500 to-orange-500 rounded"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry" className="dark:text-white/80 cream:text-foreground/80">Expiry Date</Label>
                      <Input 
                        id="expiry"
                        placeholder="MM/YY"
                        className="mt-1 border-[#d4af37]/30 focus:border-[#d4af37] dark:bg-black/50 dark:text-white dark:placeholder:text-white/40 cream:bg-white cream:text-foreground cream:placeholder:text-foreground/40"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv" className="dark:text-white/80 cream:text-foreground/80">CVV</Label>
                      <Input 
                        id="cvv"
                        placeholder="123"
                        type="password"
                        maxLength={3}
                        className="mt-1 border-[#d4af37]/30 focus:border-[#d4af37] dark:bg-black/50 dark:text-white dark:placeholder:text-white/40 cream:bg-white cream:text-foreground cream:placeholder:text-foreground/40"
                      />
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-lg bg-gradient-to-r from-[#d4af37]/10 to-[#f0d976]/10 border border-[#d4af37]/30">
                    <Shield className="h-5 w-5 text-[#d4af37] mt-0.5" />
                    <div>
                      <p className="text-[#d4af37] text-sm">
                        Your payment information is encrypted and secure
                      </p>
                      <p className="dark:text-white/60 cream:text-foreground/60 text-xs mt-1">
                        We use industry-standard SSL encryption
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-[#d4af37]/20 dark:bg-gradient-to-br dark:from-zinc-900/90 dark:to-black/90 cream:bg-gradient-to-br cream:from-white cream:to-[#f5f1e8]">
                <CardHeader>
                  <CardTitle className="dark:text-white cream:text-foreground">Billing Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="dark:text-white/80 cream:text-foreground/80">First Name</Label>
                      <Input 
                        id="firstName"
                        placeholder="John"
                        className="mt-1 border-[#d4af37]/30 focus:border-[#d4af37] dark:bg-black/50 dark:text-white dark:placeholder:text-white/40 cream:bg-white cream:text-foreground cream:placeholder:text-foreground/40"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="dark:text-white/80 cream:text-foreground/80">Last Name</Label>
                      <Input 
                        id="lastName"
                        placeholder="Doe"
                        className="mt-1 border-[#d4af37]/30 focus:border-[#d4af37] dark:bg-black/50 dark:text-white dark:placeholder:text-white/40 cream:bg-white cream:text-foreground cream:placeholder:text-foreground/40"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="dark:text-white/80 cream:text-foreground/80">Email</Label>
                    <Input 
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      className="mt-1 border-[#d4af37]/30 focus:border-[#d4af37] dark:bg-black/50 dark:text-white dark:placeholder:text-white/40 cream:bg-white cream:text-foreground cream:placeholder:text-foreground/40"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className="dark:text-white/80 cream:text-foreground/80">Phone Number</Label>
                    <Input 
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="mt-1 border-[#d4af37]/30 focus:border-[#d4af37] dark:bg-black/50 dark:text-white dark:placeholder:text-white/40 cream:bg-white cream:text-foreground cream:placeholder:text-foreground/40"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Booking Summary */}
            <div className="lg:col-span-2">
              <Card className="border-[#d4af37]/20 sticky top-20 dark:bg-gradient-to-br dark:from-zinc-900/90 dark:to-black/90 cream:bg-gradient-to-br cream:from-white cream:to-[#f5f1e8]">
                <CardHeader>
                  <CardTitle className="dark:text-white cream:text-foreground">Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 rounded-lg dark:bg-black/50 cream:bg-white">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d4af37] to-[#f0d976] flex items-center justify-center flex-shrink-0">
                        <Scissors className="h-5 w-5 dark:text-black cream:text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="dark:text-white cream:text-foreground">{bookingSummary.salon}</p>
                        <p className="dark:text-white/60 cream:text-foreground/60 text-sm">Downtown Location</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-lg dark:bg-black/50 cream:bg-white">
                      <User className="h-5 w-5 text-[#d4af37] mt-0.5" />
                      <div className="flex-1">
                        <p className="dark:text-white/60 cream:text-foreground/60 text-sm">Specialist</p>
                        <p className="dark:text-white cream:text-foreground">{bookingSummary.specialist}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-lg dark:bg-black/50 cream:bg-white">
                      <Calendar className="h-5 w-5 text-[#d4af37] mt-0.5" />
                      <div className="flex-1">
                        <p className="dark:text-white/60 cream:text-foreground/60 text-sm">Date & Time</p>
                        <p className="dark:text-white cream:text-foreground">{bookingSummary.date} at {bookingSummary.time}</p>
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-[#d4af37]/20" />

                  <div className="space-y-3">
                    <p className="dark:text-white/60 cream:text-foreground/60 text-sm">Services</p>
                    {bookingSummary.services.map((service, index) => (
                      <div key={index} className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="dark:text-white cream:text-foreground">{service.name}</p>
                          <p className="dark:text-white/40 cream:text-foreground/40 text-sm">{service.duration}</p>
                        </div>
                        <p className="dark:text-white cream:text-foreground">${service.price}</p>
                      </div>
                    ))}
                  </div>

                  <Separator className="bg-[#d4af37]/20" />

                  <div className="space-y-2">
                    <div className="flex justify-between dark:text-white/60 cream:text-foreground/60">
                      <span>Subtotal</span>
                      <span>${bookingSummary.subtotal}</span>
                    </div>
                    <div className="flex justify-between dark:text-white/60 cream:text-foreground/60">
                      <span>Tax (10%)</span>
                      <span>${bookingSummary.tax}</span>
                    </div>
                    <Separator className="bg-[#d4af37]/20" />
                    <div className="flex justify-between">
                      <span className="dark:text-white cream:text-foreground">Total</span>
                      <span className="bg-gradient-to-r from-[#d4af37] to-[#f0d976] bg-clip-text text-transparent">
                        ${bookingSummary.total}
                      </span>
                    </div>
                  </div>

                  <Button 
                    onClick={() => setPaymentComplete(true)}
                    className="w-full bg-gradient-to-r from-[#d4af37] to-[#f0d976] dark:text-black cream:text-white hover:from-[#b8941f] hover:to-[#d4af37] h-12"
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    Complete Payment
                  </Button>

                  <p className="text-center dark:text-white/40 cream:text-foreground/40 text-xs">
                    By completing this booking, you agree to our terms and conditions
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <Card className="border-[#d4af37]/20 max-w-2xl mx-auto dark:bg-gradient-to-br dark:from-zinc-900/90 dark:to-black/90 cream:bg-gradient-to-br cream:from-white cream:to-[#f5f1e8]">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#d4af37] to-[#f0d976] flex items-center justify-center">
                <Check className="h-10 w-10 dark:text-black cream:text-white" />
              </div>
              
              <h2 className="mb-3 bg-gradient-to-r dark:from-white dark:via-[#f0d976] dark:to-white cream:from-foreground cream:via-[#d4af37] cream:to-foreground bg-clip-text text-transparent">
                Booking Confirmed!
              </h2>
              
              <p className="dark:text-white/60 cream:text-foreground/60 mb-6">
                Your appointment has been successfully booked. We've sent a confirmation email to your inbox.
              </p>

              <div className="rounded-lg p-6 mb-6 text-left dark:bg-black/50 cream:bg-white">
                <div className="grid gap-3">
                  <div className="flex justify-between">
                    <span className="dark:text-white/60 cream:text-foreground/60">Confirmation #</span>
                    <span className="text-[#d4af37]">LX-2025-10-15-001</span>
                  </div>
                  <Separator className="bg-[#d4af37]/20" />
                  <div className="flex justify-between">
                    <span className="dark:text-white/60 cream:text-foreground/60">Salon</span>
                    <span className="dark:text-white cream:text-foreground">{bookingSummary.salon}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="dark:text-white/60 cream:text-foreground/60">Specialist</span>
                    <span className="dark:text-white cream:text-foreground">{bookingSummary.specialist}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="dark:text-white/60 cream:text-foreground/60">Date & Time</span>
                    <span className="dark:text-white cream:text-foreground">{bookingSummary.date} at {bookingSummary.time}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 justify-center">
                <Button className="bg-gradient-to-r from-[#d4af37] to-[#f0d976] dark:text-black cream:text-white hover:from-[#b8941f] hover:to-[#d4af37]">
                  View Booking Details
                </Button>
                <Button variant="outline" className="border-[#d4af37]/30 dark:text-white cream:text-foreground hover:bg-[#d4af37]/10">
                  Book Another
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
