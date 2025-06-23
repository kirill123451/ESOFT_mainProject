import RangeSlider from 'react-range-slider-input'
import 'react-range-slider-input/dist/style.css';
import './PriceSlider.css'
import { useEffect } from 'react';

    interface PriceSliderProps {
        currentPrice: [number, number];
        onPriceChange: (value: [number, number]) => void;
    }
    
    function PriceSlider ({ currentPrice, onPriceChange }: PriceSliderProps) {
        useEffect(() => console.log(currentPrice[0], currentPrice[1]), [currentPrice])

        const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const minChange = parseInt(e.target.value, 10)
            if(minChange >= 0 && minChange <= currentPrice[1]){
                onPriceChange([minChange, currentPrice[1]])
            }else if (minChange > currentPrice[1]) {
                onPriceChange([currentPrice[1], currentPrice[1]])
            }
            else{
                onPriceChange([0, currentPrice[1]])
            }
        }

        const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const maxChange = parseInt(e.target.value, 10)
            if(maxChange >= 0){
                onPriceChange([currentPrice[0], maxChange])
            }else if (maxChange < currentPrice[0]) {
                onPriceChange([currentPrice[0], currentPrice[0]])
            }else{
                onPriceChange([currentPrice[0], 0])
            }
        }


        return (
            <div className='price-slider-container'>
                <div className='value-changer'>
                    <input type='text' value={currentPrice[0]} onChange={handleMinChange} className='value-changer-min'></input>
                    <input type='text' value={currentPrice[1]} onChange={handleMaxChange} className='value-changer-max'></input>
                </div>
                <div className="price-slider-with-values">
                    <RangeSlider 
                    min={1000} 
                    max={5000} 
                    step={10} 
                    onInput={(value) => onPriceChange(value)} 
                    value={currentPrice} />
                        <div className="price-values-display">
                        <span>{currentPrice[0]}р</span>
                        <span>{currentPrice[1]}р</span>
                        </div>
                </div>
            </div>
        )
    }

    export default PriceSlider