import Shoes1 from './allShoes/Women_Shoes_1.jpg'
import Shoes2 from './allShoes/Women_Shoes_2.jpg'
import Shoes3 from './allShoes/Women_Shoes_3.jpg'
import Shoes4 from './allShoes/Women_Shoes_4.jpg'
import Shoes5 from './allShoes/Women_Shoes_5.jpg'
import Shoes6 from './allShoes/Women_Shoes_6.jpg'

export interface shoesList {
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

export const shoesList: shoesList[] = [
    {   
        id: 21,
        individualName: 'женские туфли EKONIKA',
        clothesType: 'Каблуки',
        gender: 'Женский',
        color: 'Черный',
        material: "Кожа",
        brand: 'Ekonika',
        price: 4990,
        img: Shoes1,
        isSpecial: false
    },

    {
        id: 22,
        individualName: 'Лоферы замшевые',
        clothesType: 'Лоферы',
        gender: 'Женский',
        color: 'Бежевый',
        material: "Замша натуральная",
        brand: 'Arcadia',
        price: 1790,
        img: Shoes2,
        isSpecial: true
    },
    {
        id: 23,
        individualName: 'Лоферы классические',
        clothesType: 'Лоферы',
        gender: 'Женский',
        color: 'Белый',
        material: "Экокожа",
        brand: 'Grandini',
        price: 2190,
        img: Shoes3,
        isSpecial: true
    },

    {
        id: 24,
        individualName: 'Туфли Аруни',
        clothesType: 'Каблуки',
        gender: 'Женский',
        color: 'Синий',
        material: "Экозамша",
        brand: 'Aruni',
        price: 3490,
        img: Shoes4,
        isSpecial: false
    },
    {
        id: 25,
        individualName: 'Мокасины летние',
        clothesType: 'Мокасины',
        gender: 'Женский',
        color: 'Белый',
        material: "Кожа",
        brand: 'MEITESI',
        price: 1990,
        img: Shoes5,
        isSpecial: true
    },

    {
        id: 26,
        individualName: 'Кеды на платформе',
        clothesType: 'Кеды',
        gender: 'Женский',
        color: 'Белый',
        material: "Экокожа",
        brand: 'Lifexpert',
        price: 3390,
        img: Shoes6,
        isSpecial: true
    },
]