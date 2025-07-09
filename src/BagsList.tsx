export interface bagsList {
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
        imgUrl: 'https://ndyehokubzdxtcctwimv.supabase.co/storage/v1/object/sign/bags-images/Women_Bags_1.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jYTlkNThmNS01OTg4LTRkM2YtYjI0Yi0yY2FmZjc1N2E1YTAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJiYWdzLWltYWdlcy9Xb21lbl9CYWdzXzEuanBnIiwiaWF0IjoxNzUxOTg0MjUyLCJleHAiOjE3ODM1MjAyNTJ9.W7NcceAs3V60dQLuXnLxYEPCpDRqkg3W7R_yhmwx18U',
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
        imgUrl: 'https://ndyehokubzdxtcctwimv.supabase.co/storage/v1/object/sign/bags-images/Women_Bags_2.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jYTlkNThmNS01OTg4LTRkM2YtYjI0Yi0yY2FmZjc1N2E1YTAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJiYWdzLWltYWdlcy9Xb21lbl9CYWdzXzIuanBnIiwiaWF0IjoxNzUxOTg0MjcwLCJleHAiOjE3ODM1MjAyNzB9.ce2TbuTutNppypO_bPbg6joDRRYdTiebjWbAQySH4pg',
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
        imgUrl: 'https://ndyehokubzdxtcctwimv.supabase.co/storage/v1/object/sign/bags-images/Women_Bags_3.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jYTlkNThmNS01OTg4LTRkM2YtYjI0Yi0yY2FmZjc1N2E1YTAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJiYWdzLWltYWdlcy9Xb21lbl9CYWdzXzMuanBnIiwiaWF0IjoxNzUxOTg0Mjg0LCJleHAiOjE3ODM1MjAyODR9.shWkbRa8XaBPO_tlIEnXuo_W3A_5FCIqZLPxyWnxFPc',
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
        imgUrl: 'https://ndyehokubzdxtcctwimv.supabase.co/storage/v1/object/sign/bags-images/Women_Bags_4.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jYTlkNThmNS01OTg4LTRkM2YtYjI0Yi0yY2FmZjc1N2E1YTAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJiYWdzLWltYWdlcy9Xb21lbl9CYWdzXzQuanBnIiwiaWF0IjoxNzUxOTg0MzAwLCJleHAiOjE3ODM1MjAzMDB9.rlffcvs8en1-9EtFu4Qcjw294tc_wP80EydYUTUYwWc',
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
        imgUrl: 'https://ndyehokubzdxtcctwimv.supabase.co/storage/v1/object/sign/bags-images/Women_Bags_5.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jYTlkNThmNS01OTg4LTRkM2YtYjI0Yi0yY2FmZjc1N2E1YTAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJiYWdzLWltYWdlcy9Xb21lbl9CYWdzXzUuanBnIiwiaWF0IjoxNzUxOTg0MzExLCJleHAiOjE3ODM1MjAzMTF9.hmTK2GzsiC9Nne4amzlPH5Lm23jieOfSaqXbMkRrEoY',
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
        imgUrl: 'https://ndyehokubzdxtcctwimv.supabase.co/storage/v1/object/sign/bags-images/Women_Bags_6.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jYTlkNThmNS01OTg4LTRkM2YtYjI0Yi0yY2FmZjc1N2E1YTAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJiYWdzLWltYWdlcy9Xb21lbl9CYWdzXzYuanBnIiwiaWF0IjoxNzUxOTg0NTMyLCJleHAiOjE3ODM1MjA1MzJ9.aXVk22c7o37lBQQM-c-i9S2BEkCS1bxzR22PoXSWdZs',
        isSpecial: true
    },
]