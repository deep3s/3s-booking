import { ReactNode } from 'react';
import { Header } from './Header';
import { ProgressIndicator } from './ProgressIndicator';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ProgressIndicator />
      
      <main>{children}</main>

      {/* Footer */}
      <footer className="border-t border-[#d4af37]/20 py-12 px-4 dark:bg-gradient-to-b dark:from-zinc-950 dark:to-black cream:bg-gradient-to-b cream:from-[#f5f1e8] cream:to-[#faf8f3]">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#d4af37] to-[#f0d976] flex items-center justify-center">
                  <span className="dark:text-black cream:text-white">✂</span>
                </div>
                <span className="bg-gradient-to-r from-[#d4af37] to-[#f0d976] bg-clip-text text-transparent">
                  LuxeSalon
                </span>
              </div>
              <p className="dark:text-white/60 cream:text-foreground/60 text-sm">
                Your premium salon booking platform
              </p>
            </div>
            
            <div>
              <h4 className="dark:text-white cream:text-foreground mb-3">Company</h4>
              <ul className="space-y-2 text-sm dark:text-white/60 cream:text-foreground/60">
                <li><a href="#" className="hover:text-[#d4af37] transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-[#d4af37] transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-[#d4af37] transition-colors">Press</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="dark:text-white cream:text-foreground mb-3">Support</h4>
              <ul className="space-y-2 text-sm dark:text-white/60 cream:text-foreground/60">
                <li><a href="#" className="hover:text-[#d4af37] transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-[#d4af37] transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-[#d4af37] transition-colors">FAQs</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="dark:text-white cream:text-foreground mb-3">Legal</h4>
              <ul className="space-y-2 text-sm dark:text-white/60 cream:text-foreground/60">
                <li><a href="#" className="hover:text-[#d4af37] transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[#d4af37] transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-[#d4af37] transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-[#d4af37]/20 text-center dark:text-white/40 cream:text-foreground/40 text-sm">
            <p>© 2025 LuxeSalon. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
