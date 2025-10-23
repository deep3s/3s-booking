import { useNavigate } from 'react-router-dom';
import { SpecialistSection } from '../components/SpecialistSection';
import { Button } from '../components/ui/button';
import { ArrowRight } from 'lucide-react';

export function SpecialistsPage() {
  const navigate = useNavigate();

  return (
    <>
      <SpecialistSection />
      <div className="py-12 px-4 bg-gradient-to-b from-black to-zinc-950 text-center">
        <Button
          onClick={() => navigate('/payment')}
          className="bg-gradient-to-r from-[#d4af37] to-[#f0d976] text-black hover:from-[#b8941f] hover:to-[#d4af37] h-12 px-8"
        >
          Continue to Payment
          <ArrowRight className="h-5 w-5 ml-2" />
        </Button>
      </div>
    </>
  );
}
