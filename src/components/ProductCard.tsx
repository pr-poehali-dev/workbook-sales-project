import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface ProductCardProps {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  onAddToCart: (id: number) => void;
}

export default function ProductCard({
  id,
  title,
  description,
  price,
  image,
  onAddToCart,
}: ProductCardProps) {
  return (
    <Card className="hover-scale overflow-hidden h-full flex flex-col">
      <div className="aspect-square overflow-hidden bg-secondary">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>
      <CardContent className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-lg mb-2 text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4 flex-1">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">{price} ₽</span>
          <Button onClick={() => onAddToCart(id)} size="sm" className="gap-2">
            <Icon name="ShoppingCart" className="h-4 w-4" />
            В корзину
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
