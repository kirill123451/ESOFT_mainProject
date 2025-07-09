
export interface clotheList {
        id: number
        individualName: string
        clothesType: string
        gender: string
        color: string
        material: string
        brand: string
        price: number
        imgUrl: string
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
        imgUrl: 'https://ndyehokubzdxtcctwimv.supabase.co/storage/v1/object/sign/clothes-images/Woman_T-shirt_1.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jYTlkNThmNS01OTg4LTRkM2YtYjI0Yi0yY2FmZjc1N2E1YTAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjbG90aGVzLWltYWdlcy9Xb21hbl9ULXNoaXJ0XzEuanBnIiwiaWF0IjoxNzUxOTc4MzMxLCJleHAiOjE3ODM1MTQzMzF9.nei03Tanmc5mDuXgbHYrxDpbrbm_iAgufjkhaGXO6gc',
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
        imgUrl: 'https://ndyehokubzdxtcctwimv.supabase.co/storage/v1/object/sign/clothes-images/Woman_T-shirt_2.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jYTlkNThmNS01OTg4LTRkM2YtYjI0Yi0yY2FmZjc1N2E1YTAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjbG90aGVzLWltYWdlcy9Xb21hbl9ULXNoaXJ0XzIuanBnIiwiaWF0IjoxNzUxOTc4MzQ4LCJleHAiOjE3ODM1MTQzNDh9.h603kiDhg5mQFBVCiKvaUv21_d9xrd5jWZWGU6pjYEE',
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
        imgUrl: 'https://ndyehokubzdxtcctwimv.supabase.co/storage/v1/object/sign/clothes-images/Woman_T-shirt_3.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jYTlkNThmNS01OTg4LTRkM2YtYjI0Yi0yY2FmZjc1N2E1YTAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjbG90aGVzLWltYWdlcy9Xb21hbl9ULXNoaXJ0XzMuanBnIiwiaWF0IjoxNzUxOTc4MzYzLCJleHAiOjE3ODM1MTQzNjN9.GK0j9-OJni1snaPOT07y4GmunpAryPYfp3QeUZYE10s',
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
        imgUrl: 'https://ndyehokubzdxtcctwimv.supabase.co/storage/v1/object/sign/clothes-images/Woman_Dress_1.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jYTlkNThmNS01OTg4LTRkM2YtYjI0Yi0yY2FmZjc1N2E1YTAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjbG90aGVzLWltYWdlcy9Xb21hbl9EcmVzc18xLmpwZyIsImlhdCI6MTc1MTk3ODM4NywiZXhwIjoxNzgzNTE0Mzg3fQ._m6fqQcP5lQZVDSvHA5QZma6pwcAzuhpJ2Bi4xxMMYI',
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
        imgUrl: 'https://ndyehokubzdxtcctwimv.supabase.co/storage/v1/object/sign/clothes-images/Woman_Dress_2.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jYTlkNThmNS01OTg4LTRkM2YtYjI0Yi0yY2FmZjc1N2E1YTAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjbG90aGVzLWltYWdlcy9Xb21hbl9EcmVzc18yLmpwZyIsImlhdCI6MTc1MTk3ODQwNiwiZXhwIjoxNzgzNTE0NDA2fQ.FOkgUyDp_005VYlgb-TQ6sKUOc9kNS2dxtD250-WZ7M',
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
        imgUrl: 'https://ndyehokubzdxtcctwimv.supabase.co/storage/v1/object/sign/clothes-images/Woman_Dress_3.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jYTlkNThmNS01OTg4LTRkM2YtYjI0Yi0yY2FmZjc1N2E1YTAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJjbG90aGVzLWltYWdlcy9Xb21hbl9EcmVzc18zLmpwZyIsImlhdCI6MTc1MTk3ODQyMCwiZXhwIjoxNzgzNTE0NDIwfQ.bUsOgWEs6rKFgL80Fthm1WKw99kkZeCQHzfs1dqdAO8',
        isSpecial: false
    },
]