import { TabsContent } from '../../components/ui/tabs';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Button } from '../../components/ui/button';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { Calendar } from '../../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/popover';
import { User, Mail, Phone, Lock, CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

type RegisterProps = {
  date?: Date;
  setDate: (date?: Date) => void;
  gender: string;
  setGender: (gender: string) => void;
};

export function Register({ date, setDate, gender, setGender }: RegisterProps) {
  return (
    <TabsContent value="register" className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="register-name" className="dark:text-white/80 cream:text-foreground/80">
          Full Name
        </Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#d4af37]" />
          <Input
            id="register-name"
            type="text"
            placeholder="John Doe"
            className="pl-10 border-[#d4af37]/30 focus:border-[#d4af37] dark:bg-black/50 dark:text-white dark:placeholder:text-white/40 cream:bg-white cream:text-foreground cream:placeholder:text-foreground/40"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="register-email" className="dark:text-white/80 cream:text-foreground/80">
          Email Address
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#d4af37]" />
          <Input
            id="register-email"
            type="email"
            placeholder="your@email.com"
            className="pl-10 border-[#d4af37]/30 focus:border-[#d4af37] dark:bg-black/50 dark:text-white dark:placeholder:text-white/40 cream:bg-white cream:text-foreground cream:placeholder:text-foreground/40"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="register-phone" className="dark:text-white/80 cream:text-foreground/80">
          Phone Number
        </Label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#d4af37]" />
          <Input
            id="register-phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            className="pl-10 border-[#d4af37]/30 focus:border-[#d4af37] dark:bg-black/50 dark:text-white dark:placeholder:text-white/40 cream:bg-white cream:text-foreground cream:placeholder:text-foreground/40"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="dark:text-white/80 cream:text-foreground/80">Date of Birth</Label>
        <Popover>
          <PopoverTrigger className="w-full h-10 px-4 py-2 inline-flex items-center justify-start text-left rounded-md border transition-colors focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:ring-offset-2 border-[#d4af37]/30 hover:border-[#d4af37] dark:bg-black/50 dark:text-white dark:hover:bg-black/70 cream:bg-white cream:text-foreground cream:hover:bg-[#f5f1e8]">
            <CalendarIcon className="mr-2 h-4 w-4 text-[#d4af37]" />
            {date ? format(date, 'PPP') : <span className="dark:text-white/40 cream:text-foreground/40">Pick a date</span>}
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 border-[#d4af37]/30 dark:bg-zinc-900 cream:bg-white" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              className="dark:bg-zinc-900 dark:text-white cream:bg-white cream:text-foreground"
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Label className="dark:text-white/80 cream:text-foreground/80">Gender</Label>
        <RadioGroup value={gender} onValueChange={setGender} className="flex gap-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="male" id="male" className="border-[#d4af37]/30 text-[#d4af37]" />
            <Label htmlFor="male" className="cursor-pointer dark:text-white/80 cream:text-foreground/80">Male</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="female" id="female" className="border-[#d4af37]/30 text-[#d4af37]" />
            <Label htmlFor="female" className="cursor-pointer dark:text-white/80 cream:text-foreground/80">Female</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="register-password" className="dark:text-white/80 cream:text-foreground/80">
          Password
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#d4af37]" />
          <Input
            id="register-password"
            type="password"
            placeholder="••••••••"
            className="pl-10 border-[#d4af37]/30 focus:border-[#d4af37] dark:bg-black/50 dark:text-white dark:placeholder:text-white/40 cream:bg-white cream:text-foreground cream:placeholder:text-foreground/40"
          />
        </div>
      </div>

      <Button className="w-full bg-gradient-to-r from-[#d4af37] to-[#f0d976] dark:text-black cream:text-white hover:from-[#b8941f] hover:to-[#d4af37] h-12">
        Create Account
      </Button>

      <div className="text-center text-sm dark:text-white/60 cream:text-foreground/60">
        Already have an account?{' '}
        <button className="text-[#d4af37] hover:underline">
          Sign in
        </button>
      </div>
    </TabsContent>
  );
}
