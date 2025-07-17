import sliderClothes from './photoForSlider/slider_clothes.jpg'
import sliderBoots from './photoForSlider/slider_boots.jpg'


interface Slide {
  img: string
  title: string
  description: string
  buttonText: string
}

export const slides:Slide[]= [
    {
        title: 'Новая коллеция одежды',
        description: 'Лучшая одежда от лучших брендов!Спешите!',
        img: sliderClothes,
        buttonText: 'Подробнее...'

    },
    {
        title: 'Новая коллеция обуви',
        description: 'Лучшая обувь от лучших брендов!Спешите!',
        img: sliderBoots,
        buttonText: 'Подробнее...'
    }]

