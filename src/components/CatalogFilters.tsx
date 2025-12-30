import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface CatalogFiltersProps {
  subjects: string[];
  selectedSubjects: string[];
  onSubjectToggle: (subject: string) => void;
  priceRange: [number, number];
  maxPrice: number;
  onPriceChange: (range: [number, number]) => void;
  onReset: () => void;
}

export default function CatalogFilters({
  subjects,
  selectedSubjects,
  onSubjectToggle,
  priceRange,
  maxPrice,
  onPriceChange,
  onReset,
}: CatalogFiltersProps) {
  const hasActiveFilters = selectedSubjects.length > 0 || priceRange[1] < maxPrice;

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Фильтры</h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onReset} className="gap-2">
            <Icon name="X" className="h-4 w-4" />
            Сбросить
          </Button>
        )}
      </div>

      <div className="space-y-3">
        <Label className="text-base">Предмет</Label>
        <div className="flex flex-wrap gap-2">
          {subjects.map((subject) => {
            const isSelected = selectedSubjects.includes(subject);
            return (
              <Badge
                key={subject}
                variant={isSelected ? 'default' : 'outline'}
                className="cursor-pointer hover:opacity-80 transition-opacity px-3 py-1.5"
                onClick={() => onSubjectToggle(subject)}
              >
                {subject}
                {isSelected && <Icon name="Check" className="ml-1 h-3 w-3" />}
              </Badge>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-base">Цена</Label>
          <span className="text-sm text-muted-foreground">
            {priceRange[0]} - {priceRange[1]} ₽
          </span>
        </div>
        <Slider
          min={0}
          max={maxPrice}
          step={10}
          value={priceRange}
          onValueChange={(value) => onPriceChange(value as [number, number])}
          className="py-4"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0 ₽</span>
          <span>{maxPrice} ₽</span>
        </div>
      </div>
    </div>
  );
}
