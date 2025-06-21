import TshirtManWhite from './allClothes/T-shirt_man_white.jpg'
import TshirtWomanWhite from './allClothes/T-shirt_woman_white.jpg'

export interface clotheList {
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

export const clothesList: clotheList[] = [
    {   
        id: 1,
        individualName: 'Крутая футболка',
        clothesType: 'Футболка',
        gender: 'Мужская',
        color: 'Белая',
        material: "Хлопок",
        brand: 'Gucci',
        price: 4000,
        img: TshirtManWhite,
        isSpecial: true
    },

    {
        id: 2,
        individualName: 'Так себе футболка',
        clothesType: 'Футболка',
        gender: 'Женская',
        color: 'Красная',
        material: "Полиэстер",
        brand: 'Prada',
        price: 1000,
        img: TshirtWomanWhite,
        isSpecial: false
    },
    {
        id: 3,
        individualName: 'Крутая футболка',
        clothesType: 'Футболка',
        gender: 'Мужская',
        color: 'Белая',
        material: "Хлопок",
        brand: 'Гучи',
        price: 1000,
        img: TshirtManWhite,
        isSpecial: true
    },

    {
        id: 4,
        individualName: 'Так себе футболка',
        clothesType: 'Футболка',
        gender: 'Женская',
        color: 'Красная',
        material: "Хлопок",
        brand: 'хопахопа',
        price: 1000,
        img: TshirtWomanWhite,
        isSpecial: false
    },
    {
        id: 5,
        individualName: 'Крутая футболка',
        clothesType: 'Футболка',
        gender: 'Мужская',
        color: 'Белая',
        material: "Хлопок",
        brand: 'хуй',
        price: 1000,
        img: TshirtManWhite,
        isSpecial: true
    },

    {
        id: 6,
        individualName: 'Так себе футболка',
        clothesType: 'Футболка',
        gender: 'Женская',
        color: 'Красная',
        material: "Хлопок",
        brand: 'Гучи',
        price: 1000,
        img: TshirtWomanWhite,
        isSpecial: false
    },
]