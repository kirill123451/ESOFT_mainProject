import Bags1 from './allBags/Women_Bags_1.jpg'
import Bags2 from './allBags/Women_Bags_2.jpg'
import Bags3 from './allBags/Women_Bags_3.jpg'
import Bags4 from './allBags/Women_Bags_4.jpg'
import Bags5 from './allBags/Women_Bags_5.jpg'
import Bags6 from './allBags/Women_Bags_6.jpg'

export interface bagsList {
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

export const bagsList: bagsList[] = [
    {   
        id: 1,
        individualName: 'Сумка багет',
        clothesType: 'Сумка',
        gender: 'Женский',
        color: 'Черный',
        material: "Искусственная кожа",
        brand: 'MalletteM',
        price: 1690,
        img: Bags1,
        isSpecial: false
    },

    {
        id: 2,
        individualName: 'Сумка тоут',
        clothesType: 'Сумка',
        gender: 'Женский',
        color: 'Черный',
        material: "Полиэстер",
        brand: 'OneSumkis',
        price: 2190,
        img: Bags2,
        isSpecial: true
    },
    {
        id: 3,
        individualName: 'сумка багет на плечо маленькая',
        clothesType: 'Сумка',
        gender: 'Женский',
        color: 'Черный',
        material: "Экокожа",
        brand: '1SUPIS',
        price: 3190,
        img: Bags3,
        isSpecial: true
    },

    {
        id: 4,
        individualName: 'Сумка клатч',
        clothesType: 'клатч',
        gender: 'Женский',
        color: 'Бежевый',
        material: "Экокожа",
        brand: 'Jingpinpiju',
        price: 4190,
        img: Bags4,
        isSpecial: false
    },
    {
        id: 5,
        individualName: 'Сумка багет',
        clothesType: 'сумка',
        gender: 'Женский',
        color: 'Коричневый',
        material: "Искусственная кожа",
        brand: 'Prills',
        price: 4190,
        img: Bags5,
        isSpecial: true
    },

    {
        id: 6,
        individualName: 'Сумка шоппер',
        clothesType: 'Сумка',
        gender: 'Женский',
        color: 'Черный',
        material: "Полиэстер",
        brand: 'Kongunla',
        price: 3390,
        img: Bags6,
        isSpecial: true
    },
]