
export interface shoesList {
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
        imgUrl: 'https://ndyehokubzdxtcctwimv.supabase.co/storage/v1/object/sign/shoes-images/Women_Shoes_1.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jYTlkNThmNS01OTg4LTRkM2YtYjI0Yi0yY2FmZjc1N2E1YTAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaG9lcy1pbWFnZXMvV29tZW5fU2hvZXNfMS5qcGciLCJpYXQiOjE3NTE5ODQ4NjEsImV4cCI6MTc4MzUyMDg2MX0.-SsZjlhEgk7ec2TU-BwOKP1SUi2Z_f96GTWRhlP8C-I',
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
        imgUrl: 'https://ndyehokubzdxtcctwimv.supabase.co/storage/v1/object/sign/shoes-images/Women_Shoes_2.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jYTlkNThmNS01OTg4LTRkM2YtYjI0Yi0yY2FmZjc1N2E1YTAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaG9lcy1pbWFnZXMvV29tZW5fU2hvZXNfMi5qcGciLCJpYXQiOjE3NTE5ODQ4NzUsImV4cCI6MTc4MzUyMDg3NX0.R148dy_0cJT9iFzgDmUM4PK1ktrpexqbusCgUm3b3nQ',
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
        imgUrl: 'https://ndyehokubzdxtcctwimv.supabase.co/storage/v1/object/sign/shoes-images/Women_Shoes_3.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jYTlkNThmNS01OTg4LTRkM2YtYjI0Yi0yY2FmZjc1N2E1YTAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaG9lcy1pbWFnZXMvV29tZW5fU2hvZXNfMy5qcGciLCJpYXQiOjE3NTE5ODQ5MDMsImV4cCI6MTc4MzUyMDkwM30.GAA3st4Ex0rmHlpD9brlSavDfE5y4WgUCUaUHmNv4_A',
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
        imgUrl: 'https://ndyehokubzdxtcctwimv.supabase.co/storage/v1/object/sign/shoes-images/Women_Shoes_4.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jYTlkNThmNS01OTg4LTRkM2YtYjI0Yi0yY2FmZjc1N2E1YTAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaG9lcy1pbWFnZXMvV29tZW5fU2hvZXNfNC5qcGciLCJpYXQiOjE3NTE5ODQ5MTMsImV4cCI6MTc4MzUyMDkxM30.lz3SUguLwyq_MRqwLNOryHqkFpNDp_suWcgMU3jTJyw',
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
        imgUrl: 'https://ndyehokubzdxtcctwimv.supabase.co/storage/v1/object/sign/shoes-images/Women_Shoes_5.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jYTlkNThmNS01OTg4LTRkM2YtYjI0Yi0yY2FmZjc1N2E1YTAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaG9lcy1pbWFnZXMvV29tZW5fU2hvZXNfNS5qcGciLCJpYXQiOjE3NTE5ODQ5MjYsImV4cCI6MTc4MzUyMDkyNn0.DWf4YwJTpPBQQbDUoA-23i3U-K2q951RrThJ1AfJCO4',
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
        imgUrl: 'https://ndyehokubzdxtcctwimv.supabase.co/storage/v1/object/sign/shoes-images/Women_Shoes_6.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jYTlkNThmNS01OTg4LTRkM2YtYjI0Yi0yY2FmZjc1N2E1YTAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaG9lcy1pbWFnZXMvV29tZW5fU2hvZXNfNi5qcGciLCJpYXQiOjE3NTE5ODQ5MzYsImV4cCI6MTc4MzUyMDkzNn0.4kktn0nX-A-AVwabSxhD1UL1brSCJeCONsV8pzg-0TQ',
        isSpecial: true
    },
]