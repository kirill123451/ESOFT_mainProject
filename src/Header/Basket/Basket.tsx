
interface BasketItem {
  product: {
    id: number
    name: string
    price: number
  }
  quantity: number
}

interface HeaderProps {
  basket?: BasketItem[]
}

function Basket ({ basket = [] }: HeaderProps) {


    return (
        <div>
            {basket.length === 0 
            ? <p>Ничего нет</p>
            : <div>
              </div>
            }
        </div>
    )
}

export default Basket