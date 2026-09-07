import { useEffect, useState } from 'react';
import ProductCard from '../product-card/ProductCard';
import axios from 'axios';
import { useUser } from '../../context/UserContext';
import Pagination from '../paginattion/Pagination';

const URL = import.meta.env.VITE_LOCAL_SERVER;


export default function ProductGallery() {

    const [ products, setProducts ] = useState([]);
    const [ limit, setLimit ] = useState(6);
    const [ total, setTotal ] = useState(0);

    const { logout } = useUser()

    useEffect(() => { getProducts() }, [limit])

    async function getProducts(skip = 0) {
        try {
            
            const response = await axios.get(`${URL}/products?skip=${skip}&limit=${limit}`)

            setProducts(response.data.products)
            setTotal(response.data.total)


        } catch (error) {

            if(error.response.status === 401) {
                alert("Usuario no autorizado");
                logout();
                return;
            }

            alert("Error al obtener productos");
            console.log(error);
        }

    }

    return (
        <section>
            <div className="product-card-container">
            {
                products.map(producto => (<ProductCard key={producto._id} prod={producto} />
                ))
            }
        </div>

            <Pagination total={total} limit={limit} getFn={getProducts}/>
            
            <div className='selectPaginationContainer'>
                <select className='selectPagination' onChange={(evt) => setLimit(Number(evt.target.value))}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    </select>
            </div>
            
            

        </section>
        
    )
}
