import { useState } from "react"
import PriceSlider from "./PriceSilder/PriceSlider"
import { clothesList } from "../ClothesList"


function FilterSearch () {
const [brand, setBrand] = useState<string[]>([])


const filteredList = clothesList.filter(item => brand.includes(item.brand))


const addToBrandList = (e: React.MouseEvent<HTMLButtonElement>) => {
        const target = e.target as HTMLButtonElement
        if(!brand.includes(target.innerText)) {
            setBrand([...brand, target.innerText])
        }else{
            setBrand(prev => prev.filter(item => item !== target.innerText))
        }
        }

    return (
        <div>
            <PriceSlider/>
            <div>
                <span>Бренд</span>
                <button onClick={addToBrandList}>Gucci</button>
                <button onClick={addToBrandList}>Prada</button>
                <span>Производитель</span>
            </div>
            <div>
                {filteredList.map(item => (
                    <div key={item.id}>{item.individualName}</div>
                ))}
            </div>
        </div>
    )
}

export default FilterSearch