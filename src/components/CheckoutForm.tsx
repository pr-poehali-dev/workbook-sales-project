import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

interface CheckoutFormProps {
  isOpen: boolean;
  onClose: () => void;
  totalAmount: number;
  onOrderComplete: () => void;
}

export default function CheckoutForm({
  isOpen,
  onClose,
  totalAmount,
  onOrderComplete,
}: CheckoutFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    comment: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      toast({
        title: 'Ошибка',
        description: 'Пожалуйста, заполните все обязательные поля',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Заказ оформлен!',
      description: `Спасибо за покупку на сумму ${totalAmount} ₽. Мы свяжемся с вами в ближайшее время.`,
    });

    onOrderComplete();
    onClose();
    setFormData({ name: '', email: '', phone: '', address: '', comment: '' });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Оформление заказа</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">
              Имя <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              placeholder="Иван Иванов"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              Email <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="example@mail.ru"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">
              Телефон <span className="text-destructive">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+7 (900) 123-45-67"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">
              Адрес доставки <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="address"
              placeholder="Улица, дом, квартира"
              rows={2}
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment">Комментарий к заказу</Label>
            <Textarea
              id="comment"
              placeholder="Дополнительные пожелания"
              rows={3}
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
            />
          </div>

          <div className="bg-secondary p-4 rounded-lg flex justify-between items-center">
            <span className="font-semibold">Сумма заказа:</span>
            <span className="text-2xl font-bold text-primary">{totalAmount} ₽</span>
          </div>

          <Button type="submit" className="w-full" size="lg">
            <Icon name="CheckCircle" className="mr-2 h-5 w-5" />
            Подтвердить заказ
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
