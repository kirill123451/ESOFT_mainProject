import Tshirt1 from './allClothes/Woman_T-shirt_1.jpg'
import Tshirt2 from './allClothes/Woman_T-shirt_2.jpg'
import Tshirt3 from './allClothes/Woman_T-shirt_3.jpg'
import Dress1 from './allClothes/Woman_Dress_1.jpg'
import Dress2 from './allClothes/Woman_Dress_2.jpg'
import Dress3 from './allClothes/Woman_Dress_3.jpg'

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
        id: 11,
        individualName: 'Футболка белая',
        clothesType: 'Футболка',
        gender: 'Женская',
        color: 'Белый',
        material: "Хлопок",
        brand: 'Gucci',
        price: 1990,
        img: Tshirt1,
        isSpecial: true
    },

    {
        id: 12,
        individualName: 'Футболка с принтом нарядная',
        clothesType: 'Футболка',
        gender: 'Женская',
        color: 'Белый',
        material: "Хлопок",
        brand: 'Wake',
        price: 1590,
        img: Tshirt2,
        isSpecial: false
    },
    {
        id: 13,
        individualName: 'Футболка базовая хлопковая',
        clothesType: 'Футболка',
        gender: 'Женская',
        color: 'Кофейный',
        material: "Хлопок",
        brand: 'JustFire',
        price: 2390,
        img: Tshirt3,
        isSpecial: true
    },

    {
        id: 14,
        individualName: 'Платье женское вязаное для пляжа',
        clothesType: 'Платье',
        gender: 'Женская',
        color: 'Бежевый',
        material: "Акрил",
        brand: 'SALTRENDY',
        price: 3590,
        img: Dress1,
        isSpecial: true
    },
    {
        id: 15,
        individualName: 'Платье летнее крестьянка миди',
        clothesType: 'Платье',
        gender: 'Женская',
        color: 'Голубой',
        material: "Вискоза",
        brand: 'iDiLiS CLO',
        price: 4190,
        img: Dress2,
        isSpecial: true
    },

    {
        id: 16,
        individualName: 'Платье облегающее',
        clothesType: 'Платье',
        gender: 'Женская',
        color: 'Черный',
        material: "Хлопок",
        brand: 'POZITIVITI',
        price: 4590,
        img: Dress3,
        isSpecial: false
    },
]