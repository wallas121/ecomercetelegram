import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const PromoBanner = () => {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary via-purple-500 to-pink-500 p-6 md:p-8 my-4">
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <div className="inline-block bg-primary-foreground/20 rounded-full px-3 py-1 text-sm text-primary-foreground mb-2">
            Promoção até 1º de Fevereiro
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
            até <span className="text-5xl">-80%</span>
          </h2>
          <p className="text-primary-foreground/80 text-lg">
            Liquidação da Estação
          </p>
        </div>
        
        <div className="flex flex-col items-center md:items-end gap-2">
          <div className="bg-primary-foreground rounded-xl p-4 text-center shadow-lg">
            <p className="text-sm text-muted-foreground mb-1">Baixe o App</p>
            <p className="font-bold text-foreground">Marketplace</p>
            <p className="text-xs text-primary mt-1">Descontos exclusivos no app!</p>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground rounded-full"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground rounded-full"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-foreground/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary-foreground/5 rounded-full translate-y-1/2 -translate-x-1/2" />
    </div>
  );
};

export default PromoBanner;
