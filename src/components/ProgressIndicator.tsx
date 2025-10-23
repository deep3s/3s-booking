import { useLocation, useNavigate } from 'react-router-dom';

type Step = {
  path: string;
  label: string;
  number: number;
};

const steps: Step[] = [
  { path: '/', label: 'search', number: 1 },
  { path: '/salons', label: 'salons', number: 2 },
  { path: '/services', label: 'services', number: 3 },
  { path: '/specialists', label: 'specialists', number: 4 },
  { path: '/payment', label: 'payment', number: 5 },
];

export function ProgressIndicator() {
  const location = useLocation();
  const navigate = useNavigate();

  const currentStepIndex = steps.findIndex(step => step.path === location.pathname);

  return (
    <div className="sticky top-16 z-40 border-b border-[#d4af37]/20 backdrop-blur-sm dark:bg-gradient-to-r dark:from-black dark:via-zinc-900 dark:to-black cream:bg-gradient-to-r cream:from-[#faf8f3] cream:via-[#f5f1e8] cream:to-[#faf8f3]">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          {steps.map((step, index) => {
            const isActive = currentStepIndex === index;
            const isCompleted = currentStepIndex > index;
            
            return (
              <div key={step.path} className="flex items-center flex-1">
                <button
                  onClick={() => navigate(step.path)}
                  className={`flex items-center gap-2 transition-all ${
                    isActive || isCompleted ? 'opacity-100' : 'opacity-40'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    isCompleted
                      ? 'bg-gradient-to-br from-[#d4af37] to-[#f0d976] dark:text-black cream:text-white'
                      : isActive
                      ? 'bg-gradient-to-br from-[#d4af37] to-[#f0d976] dark:text-black cream:text-white'
                      : 'dark:bg-zinc-800 dark:text-white/60 cream:bg-[#e8e4d9] cream:text-foreground/60'
                  }`}>
                    {isCompleted ? '✓' : step.number}
                  </div>
                  <span className={`hidden sm:inline ${
                    isActive ? 'text-[#d4af37]' : isCompleted ? 'dark:text-white cream:text-foreground' : 'dark:text-white/40 cream:text-foreground/40'
                  } capitalize text-sm`}>
                    {step.label}
                  </span>
                </button>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 transition-all ${
                    isCompleted ? 'bg-gradient-to-r from-[#d4af37] to-[#f0d976]' : 'dark:bg-zinc-800 cream:bg-[#e8e4d9]'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
