import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';
import Swal from 'sweetalert2';
import { useUser } from './UserContext';
import axios from 'axios';


const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext)

export default function OrderProvider({ children }) {
    const { user } = useUser()
    const [ count, setCount ] = useState(0)
    const [ order, setOrder ] = useState([]);
    const [ toggleModal, setToggleModal  ] = useState(false)
    const [ total, setTotal ] = useState(0);

    useEffect(() => {
        let cantidadItems = 0;

        for(let item of order) {
            cantidadItems += item.quantity;
        }

        setCount(cantidadItems)
        calculateTotal()
    }, [order])

    function addProduct(product) {

        const productExists = order.find(prod => prod._id === product._id)

        if (productExists) {
            productExists.quantity++;

            setOrder([...order])


        } else {
            product.quantity = 1;
            setOrder([...order, product ])
        }



        Swal.fire({
            position: 'center',
            icon:'success',
            padding:'.5rem',
            title:'Producto Agregado',
            width:'300px'
        })
        
    }

    function calculateTotal() {
        let total = 0;
        order.forEach(item => {
            total += item.price * item.quantity
        })

        setTotal(total)
    }

    function removeItem(_id) {
        const indice = order.findIndex(prod => prod._id === _id);
        
        const orderCopy = [ ...order ];

        orderCopy.splice(indice, 1)

        setOrder(orderCopy)

    }

    function changeItemQuantity(id, value) {
        const newOrder = order.map(prod => {

            if(prod.id === id) {
                prod.quantity = value;
            }

            return prod;
        })

        setOrder(newOrder)

    }

    async function createOrder() {

        try {

            if(!user?._id) {
                Swal.fire({
                    title: "Crear orden",
                    text: "Necesitas iniciar sesion para crear una orden",
                    icon: "warning"
                })
                return;
            }
                const products = order.map(prod => {

                return {
                    product: prod._id,
                    quantity: prod.quantity,
                    price: prod.price
                }
            })

            await axios.post("http://localhost:3000/orders", {
                products, 
                user: user._id, 
                total
            })

            Swal.fire({
                position: 'center',
                icon:'success',
                padding:'.5rem',
                title:'Orden creada',
                width:'300px'
            })

        } catch (error) {
            console.log(error)
            Swal.fire({
                title: "Error",
                text: "Error al crear la orden",
                icon: "error"
            })
        }

        

        
    }

    return (
        <OrderContext.Provider value={{ order, addProduct, toggleModal, setToggleModal, count, total, removeItem, changeItemQuantity, createOrder }}>
            { children }
        </OrderContext.Provider>
    )
}