import { useState } from "react"
import PriceSlider from './PriceSlider/PriceSlider'
import './FilterSearchClothes.css'

interface Item {
  id: number
  individualName: string
  clothesType: string
  gender: string
  color: string
  material: string
  brand: string
  price: number
  img: string
  isSpecial: boolean
}

interface FilterSearchProps {
  items: Item[]
  onFilterChange: (filters: {
    priceRange: [number, number]
    brands: string[]
    materials: string[]
    clothesType?: string[]
  }) => void
  showClothesTypeFilter?: boolean
}

function FilterSearch({ items, onFilterChange, showClothesTypeFilter = false }: FilterSearchProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([1000, 5000])
  const [brands, setBrands] = useState<string[]>([])
  const [materials, setMaterials] = useState<string[]>([])
  const [clothesTypes, setClothesTypes] = useState<string[]>([])

  const allBrands = Array.from(new Set(items.map(item => item.brand)))
  const allMaterials = Array.from(new Set(items.map(item => item.material)))
  const allClothesTypes = Array.from(new Set(items.map(item => item.clothesType)))

  const handlePriceChange = (newRange: [number, number]) => {
    setPriceRange(newRange)
    updateFilters(newRange, brands, materials, clothesTypes)
  }

  const addToBrandList = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement
    const brandName = target.innerText
    const newBrands = brands.includes(brandName) 
      ? brands.filter(item => item !== brandName)
      : [...brands, brandName]
    setBrands(newBrands)
    updateFilters(priceRange, newBrands, materials, clothesTypes)
  }

  const addToMaterialList = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement
    const materialName = target.innerText
    const newMaterials = materials.includes(materialName)
      ? materials.filter(item => item !== materialName)
      : [...materials, materialName]
    setMaterials(newMaterials)
    updateFilters(priceRange, brands, newMaterials, clothesTypes)
  }

  const addToClothesTypeList = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement
    const clothesTypeName = target.innerText
    const newClothesTypes = clothesTypes.includes(clothesTypeName)
      ? clothesTypes.filter(item => item !== clothesTypeName)
      : [...clothesTypes, clothesTypeName]
    setClothesTypes(newClothesTypes)
    updateFilters(priceRange, brands, materials, newClothesTypes)
  }

  const updateFilters = (
    priceRange: [number, number],
    brands: string[],
    materials: string[],
    clothesTypes: string[]
  ) => {
    const filters = {
      priceRange,
      brands,
      materials,
      ...(showClothesTypeFilter && { clothesType: clothesTypes })
    }
    onFilterChange(filters)
  }

  const resetFilters = () => {
    setPriceRange([1000, 5000])
    setBrands([])
    setMaterials([])
    setClothesTypes([])
    onFilterChange({ 
      priceRange: [1000, 5000], 
      brands: [], 
      materials: [], 
      ...(showClothesTypeFilter && { clothesType: [] })
    })
  }

  return (
    <div className="filter-panel">
      <h3>Подбор параметров</h3>
      
      <div>
        <h4>Размерная цена</h4>
        <PriceSlider currentPrice={priceRange} onPriceChange={handlePriceChange} />
      </div>

      {showClothesTypeFilter && (
        <div className="filter-section">
          <h4>Тип одежды</h4>
          <div className="filter-options">
            {allClothesTypes.map(type => (
              <button
                key={type}
                className={clothesTypes.includes(type) ? "active" : ""}
                onClick={addToClothesTypeList}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      )}

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
    </div>
  )
}

export default FilterSearch