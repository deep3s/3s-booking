import { TabsContent } from '../../components/ui/tabs';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Button } from '../../components/ui/button';
import { CardDescription } from '../../components/ui/card';
import { Mail } from 'lucide-react';

export function ForgotPassword() {
  return (
    <TabsContent value="forgot" className="space-y-4">
      <CardDescription className="text-center dark:text-white/60 cream:text-foreground/60">
        Enter your email address and we'll send you a link to reset your password
      </CardDescription>

      <div className="space-y-2">
        <Label htmlFor="forgot-email" className="dark:text-white/80 cream:text-foreground/80">
          Email Address
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#d4af37]" />
          <Input
            id="forgot-email"
            type="email"
            placeholder="your@email.com"
            className="pl-10 border-[#d4af37]/30 focus:border-[#d4af37] dark:bg-black/50 dark:text-white dark:placeholder:text-white/40 cream:bg-white cream:text-foreground cream:placeholder:text-foreground/40"
          />
        </div>
      </div>

      <Button className="w-full bg-gradient-to-r from-[#d4af37] to-[#f0d976] dark:text-black cream:text-white hover:from-[#b8941f] hover:to-[#d4af37] h-12">
        Send Reset Link
      </Button>

      <div className="text-center text-sm dark:text-white/60 cream:text-foreground/60">
        Remember your password?{' '}
        <button className="text-[#d4af37] hover:underline">
          Sign in
        </button>
      </div>
    </TabsContent>
  );
}
