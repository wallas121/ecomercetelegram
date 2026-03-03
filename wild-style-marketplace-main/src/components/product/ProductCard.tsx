import { Heart, Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviews: number;
  brand?: string;
  delivery?: string;
  isNew?: boolean;
}

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className }: ProductCardProps) => {
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round((1 - product.price / product.originalPrice!) * 100)
    : 0;

  return (
    <div
      className={cn(
        "group relative bg-card rounded-xl overflow-hidden border border-border transition-all hover:shadow-lg hover:-translate-y-1 animate-fade-in",
        className
      )}
    >
      {/* Image container */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
        
        {/* Discount badge */}
        {discountPercent > 0 && (
          <span className="absolute top-2 left-2 bg-discount text-primary-foreground text-xs font-bold px-2 py-1 rounded-md">
            -{discountPercent}%
          </span>
        )}

        {/* New badge */}
        {product.isNew && (
          <span className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-md">
            Novidade
          </span>
        )}

        {/* Favorite button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-card/80 hover:bg-card text-muted-foreground hover:text-discount opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="p-3">
        {/* Price */}
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-lg font-bold text-price">
            R$ {product.price.toLocaleString('pt-BR')}
          </span>
          {hasDiscount && (
            <span className="text-sm text-price-old line-through">
              R$ {product.originalPrice!.toLocaleString('pt-BR')}
            </span>
          )}
        </div>

        {/* Brand */}
        {product.brand && (
          <p className="text-xs text-muted-foreground mb-1">{product.brand}</p>
        )}

        {/* Name */}
        <h3 className="text-sm font-medium text-foreground line-clamp-2 mb-2 min-h-[2.5rem]">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <Star className="h-3.5 w-3.5 fill-rating text-rating" />
          <span className="text-xs font-medium text-foreground">{product.rating}</span>
          <span className="text-xs text-muted-foreground">
            ({product.reviews.toLocaleString()})
          </span>
        </div>

        {/* Delivery */}
        {product.delivery && (
          <div className="mb-3">
            <span className="inline-block bg-delivery-bg text-delivery-text text-xs font-medium px-2 py-1 rounded-md">
              {product.delivery}
            </span>
          </div>
        )}

        {/* Add to cart button */}
        <Button
          className="w-full h-9 text-sm font-medium bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg"
          size="sm"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          У кошик
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
