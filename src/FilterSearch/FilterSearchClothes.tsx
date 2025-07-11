import { useState } from "react";
import PriceSlider from './PriceSlider/PriceSlider';
import './FilterSearchClothes.css';

interface Item {
  id: number;
  individualName: string;
  clothesType?: string;
  shoesType?: string;
  bagsType?: string;
  gender: string;
  color: string;
  material: string;
  brand: string;
  price: number;
  imgUrl: string;
  isSpecial: boolean;
  productType?: 'clothes' | 'shoes' | 'bags';
}

export interface Filters {
  priceRange: [number, number];
  brands?: string[];
  materials?: string[];
  clothesType?: string[];
}

interface FilterSearchProps {
  items: Item[];
  onFilterChange: (filters: Filters) => void;
  showClothesTypeFilter?: boolean;
}

function FilterSearch({ items, onFilterChange, showClothesTypeFilter = false }: FilterSearchProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([1000, 5000]);
  const [brands, setBrands] = useState<string[]>([]);
  const [materials, setMaterials] = useState<string[]>([]);
  const [clothesTypes, setClothesTypes] = useState<string[]>([]);
  const [filtersChanged, setFiltersChanged] = useState(false);

  const allBrands = [...new Set(items.map(item => item.brand).filter(Boolean) as string[])];
  const allMaterials = [...new Set(items.map(item => item.material).filter(Boolean) as string[])];
  const allClothesTypes = showClothesTypeFilter 
    ? [...new Set(items.map(item => item.clothesType).filter(Boolean) as string[])] 
    : [];

  const applyFilters = () => {
    const filters: Filters = {
      priceRange,
      ...(brands.length > 0 && { brands }),
      ...(materials.length > 0 && { materials }),
      ...(showClothesTypeFilter && clothesTypes.length > 0 && { clothesType: clothesTypes })
    };
    onFilterChange(filters);
    setFiltersChanged(false);
  };

  const handlePriceChange = (newRange: [number, number]) => {
    setPriceRange(newRange);
    setFiltersChanged(true);
  };

  const toggleBrand = (brand: string) => {
    setBrands(prevBrands => 
      prevBrands.includes(brand) 
        ? prevBrands.filter(b => b !== brand) 
        : [...prevBrands, brand]
    );
    setFiltersChanged(true);
  };

  const toggleMaterial = (material: string) => {
    setMaterials(prevMaterials => 
      prevMaterials.includes(material) 
        ? prevMaterials.filter(m => m !== material) 
        : [...prevMaterials, material]
    );
    setFiltersChanged(true);
  };

  const toggleClothesType = (type: string) => {
    setClothesTypes(prevTypes => 
      prevTypes.includes(type) 
        ? prevTypes.filter(t => t !== type) 
        : [...prevTypes, type]
    );
    setFiltersChanged(true);
  };

  const resetFilters = () => {
    setPriceRange([1000, 5000]);
    setBrands([]);
    setMaterials([]);
    setClothesTypes([]);
    setFiltersChanged(true);
  };

  return (
    <div className="filter-panel">
      <h3>Подбор параметров</h3>
      
      <div>
        <h4>Ценовой диапазон</h4>
        <PriceSlider currentPrice={priceRange} onPriceChange={handlePriceChange} />
      </div>

      {showClothesTypeFilter && allClothesTypes.length > 0 && (
        <div className="filter-section">
          <h4>Тип одежды</h4>
          <div className="filter-options">
            {allClothesTypes.map(type => (
              <button
                key={type}
                className={clothesTypes.includes(type) ? "active" : ""}
                onClick={() => toggleClothesType(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      )}

      {allBrands.length > 0 && (
        <div className="filter-section">
          <h4>Бренд</h4>
          <div className="filter-options">
            {allBrands.map(brand => (
              <button
                key={brand}
                className={brands.includes(brand) ? "active" : ""}
                onClick={() => toggleBrand(brand)}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>
      )}

      {allMaterials.length > 0 && (
        <div className="filter-section">
          <h4>Материал</h4>
          <div className="filter-options">
            {allMaterials.map(material => (
              <button
                key={material}
                className={materials.includes(material) ? "active" : ""}
                onClick={() => toggleMaterial(material)}
              >
                {material}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="filter-actions">
        <button className="reset-btn" onClick={resetFilters}>Сбросить</button>
        <button 
          className={`apply-btn ${filtersChanged ? 'active' : ''}`}
          onClick={applyFilters}
          disabled={!filtersChanged}
        >
          Применить фильтры
        </button>
      </div>
    </div>
  );
}

export default FilterSearch;