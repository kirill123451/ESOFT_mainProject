import { useEffect } from 'react'
import RangeSlider from 'react-range-slider-input'
import 'react-range-slider-input/dist/style.css'
import './PriceSlider.css'

interface PriceSliderProps {
  currentPrice: [number, number]
  onPriceChange: (value: [number, number]) => void
}

function PriceSlider({ currentPrice, onPriceChange }: PriceSliderProps) {
  useEffect(() => {
    console.log('[PriceSlider] Текущий диапазон цен:', currentPrice)
  }, [currentPrice])

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const minChange = parseInt(e.target.value, 10)
    let newRange: [number, number] = [minChange, currentPrice[1]]
    
    if (minChange >= 0 && minChange <= currentPrice[1]) {
      newRange = [minChange, currentPrice[1]]
    } else if (minChange > currentPrice[1]) {
      newRange = [currentPrice[1], currentPrice[1]]
    } else {
      newRange = [0, currentPrice[1]]
    }
    
    console.log('[PriceSlider] Изменение минимальной цены:', newRange)
    onPriceChange(newRange)
  }

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxChange = parseInt(e.target.value, 10)
    let newRange: [number, number] = [currentPrice[0], maxChange]
    
    if (maxChange >= 0) {
      newRange = [currentPrice[0], maxChange]
    } else if (maxChange < currentPrice[0]) {
      newRange = [currentPrice[0], currentPrice[0]]
    } else {
      newRange = [currentPrice[0], 0]
    }
    
    console.log('[PriceSlider] Изменение максимальной цены:', newRange)
    onPriceChange(newRange)
  }

  return (
    <div className='price-slider-container'>
      <div className='value-changer'>
        <input 
          type='text' 
          value={currentPrice[0]} 
          onChange={handleMinChange} 
          className='value-changer-min'
        />
        <input 
          type='text' 
          value={currentPrice[1]} 
          onChange={handleMaxChange} 
          className='value-changer-max'
        />
      </div>
      <div className="price-slider-with-values">
        <RangeSlider 
          min={1000} 
          max={5000} 
          step={10} 
          onInput={(value) => {
            console.log('[PriceSlider] Изменение слайдера:', value)
            onPriceChange(value)
          }} 
          value={currentPrice} 
        />
        <div className="price-values-display">
          <span>{currentPrice[0]}р</span>
          <span>{currentPrice[1]}р</span>
        </div>
      </div>
    </div>
  )
}

export default PriceSlider