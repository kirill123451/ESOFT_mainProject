    import { useState } from 'react'
    import RangeSlider from 'react-range-slider-input'
    import 'react-range-slider-input/dist/style.css';
    import './PriceSlider.css'

    function PriceSlider () {
        const [currentPrice, setCurrentPrice] = useState<[number, number]>([1000, 5000])

        const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const minChange = parseInt(e.target.value, 10)
            if(minChange >= 0 && minChange <= currentPrice[1]){
                setCurrentPrice([minChange, currentPrice[1]])
            }else if (minChange > currentPrice[1]) {
                setCurrentPrice([currentPrice[1], currentPrice[1]])
            }
            else{
                setCurrentPrice([0, currentPrice[1]])
            }
        }

        const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const maxChange = parseInt(e.target.value, 10)
            if(maxChange >= 0){
                setCurrentPrice([currentPrice[0], maxChange])
            }else if (maxChange < currentPrice[0]) {
                setCurrentPrice([currentPrice[0], currentPrice[0]])
            }else{
                setCurrentPrice([currentPrice[0], 0])
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
                    onInput={(value) => setCurrentPrice(value)} 
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