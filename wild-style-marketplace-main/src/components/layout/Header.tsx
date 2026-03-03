import { Search, Heart, User, ShoppingCart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const categories = [
  "Roupas Femininas",
  "Sapatos",
  "Infantil",
  "Roupas Masculinas",
  "Acessórios",
  "Eletrônicos",
  "Casa e Jardim",
  "Beleza",
];

const Header = () => {
  return (
    <header className="sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-header-gradient">
        <div className="container mx-auto flex items-center justify-between py-3 px-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-foreground/20">
              <span className="text-primary-foreground font-bold text-xl">M</span>
            </div>
            <span className="text-primary-foreground font-bold text-xl hidden sm:block">
              Marketplace
            </span>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-2xl mx-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Buscar produtos..."
                className="w-full h-10 pl-4 pr-12 rounded-lg border-none bg-primary-foreground text-foreground placeholder:text-muted-foreground"
              />
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-muted"
              >
                <Search className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-3">
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/20">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/20 relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-discount text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                3
              </span>
            </Button>
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/20">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Categories bar */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-2 px-4">
            <Button variant="ghost" size="sm" className="lg:hidden shrink-0">
              <Menu className="h-4 w-4 mr-2" />
              Menu
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant="ghost"
                size="sm"
                className="shrink-0 text-sm font-medium text-foreground hover:text-primary hover:bg-secondary"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
