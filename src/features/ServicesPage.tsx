import { useNavigate } from 'react-router-dom';
import { ServicesSection } from '../components/ServicesSection';
import { Button } from '../components/ui/button';
import { ArrowRight } from 'lucide-react';

export function ServicesPage() {
  const navigate = useNavigate();

  return (
    <>
      <ServicesSection />
      <div className="py-12 px-4 bg-gradient-to-b from-black to-zinc-950 text-center">
        <Button
          onClick={() => navigate('/specialists')}
          className="bg-gradient-to-r from-[#d4af37] to-[#f0d976] text-black hover:from-[#b8941f] hover:to-[#d4af37] h-12 px-8"
        >
          Continue to Specialists
          <ArrowRight className="h-5 w-5 ml-2" />
        </Button>
      </div>
    </>
  );
}
