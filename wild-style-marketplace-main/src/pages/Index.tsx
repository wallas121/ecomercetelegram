import Header from "@/components/layout/Header";
import PromoBanner from "@/components/layout/PromoBanner";
import QuickCategories from "@/components/layout/QuickCategories";
import ProductGrid from "@/components/product/ProductGrid";
import { sampleProducts } from "@/data/products";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4">
        {/* Promo Banner */}
        <PromoBanner />
        
        {/* Quick Categories */}
        <QuickCategories />
        
        {/* Products Grid */}
        <ProductGrid products={sampleProducts} title="Recomendado para você" />
        
        {/* More products section */}
        <ProductGrid 
          products={sampleProducts.slice(0, 12).reverse()} 
          title="Produtos Populares" 
        />
      </main>

      {/* Footer */}
      <footer className="bg-muted py-8 mt-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold text-foreground mb-4">Para Compradores</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Como fazer um pedido</a></li>
                <li><a href="#" className="hover:text-primary">Métodos de Pagamento</a></li>
                <li><a href="#" className="hover:text-primary">Entrega</a></li>
                <li><a href="#" className="hover:text-primary">Devoluções</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4">Parceiros</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Venda no Marketplace</a></li>
                <li><a href="#" className="hover:text-primary">Verificação de Produto</a></li>
                <li><a href="#" className="hover:text-primary">Publicidade</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Sobre Nós</a></li>
                <li><a href="#" className="hover:text-primary">Carreiras</a></li>
                <li><a href="#" className="hover:text-primary">Contatos</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4">Contatos</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>0800 123-45-67</li>
                <li>suporte@marketplace.com.br</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2026 Marketplace. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
