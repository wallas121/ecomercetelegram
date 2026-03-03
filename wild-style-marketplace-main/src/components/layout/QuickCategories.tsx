import { Pill, Sparkles, Gift, ShoppingBag, Laptop, Home, Baby, Shirt } from "lucide-react";

const categories = [
  { icon: Pill, label: "Farmácia", color: "bg-green-100 text-green-600" },
  { icon: Sparkles, label: "Beleza", color: "bg-pink-100 text-pink-600" },
  { icon: Gift, label: "Ofertas", color: "bg-red-100 text-red-600" },
  { icon: ShoppingBag, label: "Roupas", color: "bg-purple-100 text-purple-600" },
  { icon: Laptop, label: "Eletrônicos", color: "bg-blue-100 text-blue-600" },
  { icon: Home, label: "Casa", color: "bg-orange-100 text-orange-600" },
  { icon: Baby, label: "Infantil", color: "bg-cyan-100 text-cyan-600" },
  { icon: Shirt, label: "Masculino", color: "bg-slate-100 text-slate-600" },
];

const QuickCategories = () => {
  return (
    <div className="py-4">
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
        {categories.map((category) => (
          <button
            key={category.label}
            className="flex flex-col items-center gap-2 min-w-[70px] group"
          >
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${category.color}`}
            >
              <category.icon className="h-6 w-6" />
            </div>
            <span className="text-xs font-medium text-foreground text-center">
              {category.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickCategories;
