import { useState } from "react";
import PriceSlider from "./PriceSilder/PriceSlider";
import { clothesList } from "../ClothesList";
import './FilterSearchClothes.css'

interface FilterSearchProps {
  onFilterChange: (filters: {
    priceRange: [number, number];
    brands: string[];
    materials: string[];
  }) => void;
}

function FilterSearch({ onFilterChange }: FilterSearchProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([1000, 5000]);
  const [brands, setBrands] = useState<string[]>([]);
  const [materials, setMaterials] = useState<string[]>([]);

  const allBrands = Array.from(new Set(clothesList.map(item => item.brand)));
  const allMaterials = Array.from(new Set(clothesList.map(item => item.material)));

  const handlePriceChange = (newRange: [number, number]) => {
    setPriceRange(newRange);
    updateFilters(newRange, brands, materials);
  };

  const addToBrandList = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    const brandName = target.innerText;
    if (!brands.includes(brandName)) {
      const newBrands = [...brands, brandName];
      setBrands(newBrands);
      updateFilters(priceRange, newBrands, materials);
    } else {
      const newBrands = brands.filter(item => item !== brandName);
      setBrands(newBrands);
      updateFilters(priceRange, newBrands, materials);
    }
  };

  const addToMaterialList = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    const materialName = target.innerText;
    if (!materials.includes(materialName)) {
      const newMaterials = [...materials, materialName];
      setMaterials(newMaterials);
      updateFilters(priceRange, brands, newMaterials);
    } else {
      const newMaterials = materials.filter(item => item !== materialName);
      setMaterials(newMaterials);
      updateFilters(priceRange, brands, newMaterials);
    }
  };

  const updateFilters = (
    priceRange: [number, number],
    brands: string[],
    materials: string[]
  ) => {
    onFilterChange({ priceRange, brands, materials });
  };

  const resetFilters = () => {
    setPriceRange([1000, 5000]);
    setBrands([]);
    setMaterials([]);
    onFilterChange({ priceRange: [1000, 5000], brands: [], materials: [] });
  };

  return (
    <div className="filter-panel">
      <h3>Подбор параметров</h3>
      
      <div className="filter-section">
        <h4>Размерная цена</h4>
        <PriceSlider currentPrice={priceRange} onPriceChange={handlePriceChange} />
        <div className="price-marks">
        </div>
      </div>

      <div className="filter-section">
        <h4>Бренд</h4>
        <div className="filter-options">
          {allBrands.map(brand => (
            <button
              key={brand}
              className={brands.includes(brand) ? "active" : ""}
              onClick={addToBrandList}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h4>Материал</h4>
        <div className="filter-options">
          {allMaterials.map(material => (
            <button
              key={material}
              className={materials.includes(material) ? "active" : ""}
              onClick={addToMaterialList}
            >
              {material}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-actions">
        <button className="reset-btn" onClick={resetFilters}>Сбросить</button>
      </div>

      <div className="contact-info">
        <p>Всегда на связи</p>
        <p>Связаться с нами можно любым удобным для вас способом: e-mail, телефон, социальные сети и мессенджеры.</p>
      </div>
    </div>
  );
}

export default FilterSearch;