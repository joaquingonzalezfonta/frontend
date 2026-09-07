import { useForm } from 'react-hook-form'
import './Adminproduct.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import AdminTable from "../../components/admin-table/AdminTable"
import Swal from 'sweetalert2';
import '../../services/interceptor/interceptor'
import useApi from '../../services/interceptor/interceptor';


const URL = import.meta.env.VITE_LOCAL_SERVER;

export default function Adminproduct() {

    const api = useApi()
    const [products, setProducts] = useState([])
    const { register, setValue, handleSubmit, formState: { errors, isValid } } = useForm()
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [ categories, setCategories ] = useState([])
    const {setTotalItems} = useState([])

    useEffect(() => { getProducts(); getCategories() }, [])


    useEffect(() => {
        if (selectedProduct) {
            setValue("name", selectedProduct.name),
                setValue("price", selectedProduct.price),
                setValue("description", selectedProduct.description),
                // setValue("image", selectedProduct.image),
                setValue("category", selectedProduct.category),
                setValue("createdAt", selectedProduct.createdAt)
        }
    }, [selectedProduct, setValue,])

    function resetForm() {
        document.getElementById('productForm').reset();
    }

    async function getCategories() {
        try {
            
            const response = await api.get(`/categories`)

            setCategories(response.data.categories)

        } catch (error) {
            console.log(error)
            alert("No se pudieron cargar las categorias")
        }
    }

    async function getProducts() {
        try {
            // const response = await axios.get(`${URL}/products`);
            const response = await api.get(`/products`) 

            const { products, total } = response.data;

            

            setProducts(products)
            setTotalItems(total)

        } catch (error) {
            console.log(error)
        }
    }


    function deleteProduct(id) {

        Swal.fire({
            title: "Borrar producto",
            text: "Realmente desea borrar?",
            icon: "warning",
            reverseButtons: true,
            showCancelButton: true,
        }).then(async (result) => {
            try {
                if (result.isConfirmed) {
                    await axios.delete(`${URL}/products/${id}`);

                    getProducts();
                }
            } catch (error) {
                console.log(error)

                Swal.fire({
                    title: "Error al borrar",
                    text: "El producto no fue borrado",
                    icon: "error"
                })
            }
        })
    }


    async function onProductSubmit(producto) {

        try {

            const formData = new FormData()
            formData.append("name", producto.name);
            formData.append("price", producto.price);
            formData.append("description", producto.description);
            formData.append("category", producto.category);
            formData.append("createdAt", producto.createdAt);
            if(producto.image[0]) {
                formData.append("image", producto.image[0])
            }

            if (selectedProduct) {
                // Hacer un put
                const { _id } = selectedProduct;

                await axios.put(`${URL}/products/${_id}`, formData)
                

                Swal.fire({
                    title: "Actualizacion correcta",
                    text: "El producto fue actualizado correctamente",
                    icon: "success",
                    timer: "1500"
                })

                setSelectedProduct(null)

            } else {
                // si no tengo estado selectedProduct (null) significa que estoy creando un producto
                await axios.post(`${URL}/products`, formData)
                

                Swal.fire({
                    title: "Producto creado",
                    text: "El producto fue creado correctamente",
                    icon: "success",
                    timer: "1500"
                })

                resetForm();
                
            }


            getProducts();

        } catch (error) {
            console.log(error)
        }
    }


    function handleEditProduct(producto) {

        
        setSelectedProduct(producto);
    }


    return (
        <section className='form-section'>
            <h1 className="section-title"> Registro </h1>
            <div className="section-subtitle">Registrate para una mejor experiencia</div>
            <div className="admin-container">
                <div className="form-container-center">
                    <div className="form-subcontainer">
                        <h2 className='form-title'> ADMIN PRODUCT </h2>
                        <form onSubmit={handleSubmit(onProductSubmit)} id='productForm'>
                            <div className="input-group">
                                <label htmlFor="name"> Nombre producto </label>
                                <input type="text" id='name'
                                    {...register("name", { required: true, minLength: 3 })
                                    } />

                                {errors.name?.type === "required" && <div className="input-error">El campo es requerido</div>}
                                {errors.name?.type === "minLength" && <div className="input-error">Minimo de caracteres es 3</div>}


                            </div>

                            <div className="input-group">
                                <label htmlFor="price"> Precio producto </label>
                                <input type="number" id='price'
                                    {...register("price", { required: true, minLength: 1 })
                                    } />

                                {errors.price?.type === "required" && <div className="input-error">El campo es requerido</div>}
                                {errors.price?.type === "minLength" && <div className="input-error">Minimo de caracteres es 1</div>}


                            </div>

                            <div className="input-group">
                                <label htmlFor="description"> Descripción </label>
                                <textarea {...register("description",)} rows={5}></textarea>
                            </div>

                            <div className="input-group">
                                <label htmlFor="">Categoria</label>
                                <select {...register("category", { required: true })}>
                                    {
                                        categories.map(cat => (
                                            <option key={cat._id} value={cat.name}> { cat.viewValue } </option>
                                        ))
                                    }
                                </select>

                                {errors.category?.type === "required" && <div className="input-error">El campo es requerido</div>}

                            </div>

                            <div className="input-group">
                                <label htmlFor="createdAt">Fecha de ingreso</label>
                                <input type="date" id="createdAt" {...register("createdAt", { required: true })} />

                                {errors.createdAt?.type === "required" && <div className="input-error">El campo es requerido</div>}
                            </div>

                            <div className="input-group">
                                <label htmlFor="image"> Imagen </label>
                                <input accept='image/*' type="file" {...register("image", { required: true })} />

                                {errors.image?.type === "required" && <div className="input-error">El campo es requerido</div>}
                            </div>


                            <div className="input-group">
                                <button className={`${selectedProduct && 'btn-success'}`} type='submit' disabled={!isValid}>
                                    {
                                        selectedProduct ? "Editar" : "Crear"
                                    }
                                </button>

                            </div>
                        </form>
                    </div>

                </div>

                <div className="contenedor-tabla">
                    <AdminTable products={products} deleteProduct={deleteProduct} handleEditProduct={handleEditProduct} />

                </div>
            </div>




        </section>
    )
}



