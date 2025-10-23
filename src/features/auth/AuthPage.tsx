import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Sparkles } from 'lucide-react';
import { Login } from './Login';
import { Register } from './Register';
import { ForgotPassword } from './ForgotPassword';

export function AuthPage() {
  const [date, setDate] = useState<Date>();
  const [gender, setGender] = useState<string>('');

  return (
    <section className="min-h-screen py-20 px-4 relative overflow-hidden dark:bg-gradient-to-br dark:from-black dark:via-zinc-900 dark:to-black cream:bg-gradient-to-br cream:from-[#faf8f3] cream:via-[#f5f1e8] cream:to-[#faf8f3]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(240,217,118,0.05),transparent_50%)]" />

      <div className="container mx-auto max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#d4af37]/20 to-[#f0d976]/20 border border-[#d4af37]/30 mb-4">
            <Sparkles className="h-4 w-4 text-[#d4af37]" />
            <span className="text-[#d4af37]">Welcome to LuxeSalon</span>
          </div>
          <h1 className="mb-3 bg-gradient-to-r dark:from-white dark:via-[#f0d976] dark:to-white cream:from-foreground cream:via-[#d4af37] cream:to-foreground bg-clip-text text-transparent">
            Your Beauty Journey Starts Here
          </h1>
        </div>

        <Card className="border-[#d4af37]/20 backdrop-blur-sm dark:bg-gradient-to-br dark:from-zinc-900/95 dark:to-black/95 cream:bg-gradient-to-br cream:from-white/95 cream:to-[#f5f1e8]/95">
          <CardHeader>
            <CardTitle className="text-center dark:text-white cream:text-foreground">Account Access</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6 dark:bg-black/50 cream:bg-white">
                <TabsTrigger value="login" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#d4af37] data-[state=active]:to-[#f0d976] data-[state=active]:dark:text-black data-[state=active]:cream:text-white">
                  Login
                </TabsTrigger>
                <TabsTrigger value="register" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#d4af37] data-[state=active]:to-[#f0d976] data-[state=active]:dark:text-black data-[state=active]:cream:text-white">
                  Register
                </TabsTrigger>
                <TabsTrigger value="forgot" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#d4af37] data-[state=active]:to-[#f0d976] data-[state=active]:dark:text-black data-[state=active]:cream:text-white">
                  Reset
                </TabsTrigger>
              </TabsList>

              <Login />
              <Register date={date} setDate={setDate} gender={gender} setGender={setGender} />
              <ForgotPassword />
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
