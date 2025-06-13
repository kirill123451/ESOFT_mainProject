import { useEffect, useState } from "react"
import './slider.css'
import { slides } from "./SlidesfInfo"



function Slider () {
    const [currentSlide, setCurrentSlide] = useState<number>(0)

    useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 10000);
    return () => clearInterval(interval);

  });
    return (
        <div className="slider-container">
            <div className="slider" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {slides.map((slide, index) => (
                    <div key={index} className="slide">
                        <img src={slide.img} className="slide-image" alt="фото" />  
                        <div className="slide-content">
                            <h2>{slide.title}</h2>
                            <p>{slide.description}</p>
                            <a href='#' className="slide-link">{slide.buttonText}</a>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="slider-controls">
                {slides.map((_, index) => (
                    <button 
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
                    />
                ))}


            </div>
        </div>
    )
}

export default Slider