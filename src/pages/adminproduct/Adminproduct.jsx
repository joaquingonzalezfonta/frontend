import { useForm } from 'react-hook-form'
import './Adminproduct.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import AdminTable from "../../components/admin-table/AdminTable"
import Swal from 'sweetalert2';


const URL = "https://66cf3a98901aab24842171a2.mockapi.io/api/v1";

export default function Adminproduct() {
    const [products, setProducts] = useState([])


    const { register, setValue, reset, handleSubmit, formState: { errors, isValid } } = useForm()

    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => { getProducts(); }, [])



    useEffect(() => {
        if (selectedProduct) {
            // reset({
            setValue("name", selectedProduct.name),
                setValue("price", selectedProduct.price),
                setValue("description", selectedProduct.description),
                setValue("image", selectedProduct.image),
                setValue("category", selectedProduct.category),
                setValue("createdAt", selectedProduct.createdAt)
            // })
        } else {
            reset()
        }
    }, [selectedProduct, setValue, reset])

    async function getProducts() {
        try {
            // Carga de productos
            const response = await axios.get(`${URL}/products`);

            console.log(response.data)

            setProducts(response.data)

        } catch (error) {
            console.log(error)
        }
    }

    function deleteProduct(identificador) {

        Swal.fire({
            title: "Borrar producto",
            text: "Realmente desea borrar",
            icon: "warning",
            reverseButtons: true,
            showCancelButton: true,
        }).then(async (result) => {
            try {
                if (result.isConfirmed) {
                    const response = await axios.delete(`${URL}/products/${identificador}`);

                    console.log(response.data)

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
        console.log(producto)

        try {
            if (selectedProduct) {
                // Hacer un put
                const { id } = selectedProduct;

                const response = await axios.put(`${URL}/products/${id}`, producto)
                console.log(response.data)

                Swal.fire({
                    title: "Actualizacion correcta",
                    text: "El producto fue actualizado correctamente",
                    icon: "success",
                    timer: "1500"
                })

                setSelectedProduct(null)

            } else {
                // si no tengo estado selectedProduct (null) significa que estoy creando un producto
                const response = await axios.post(`${URL}/products`, producto)
                console.log(response.data)
            }

            // reset();
            getProducts();

        } catch (error) {
            console.log(error)
        }
    }

    // EDITAR PRODUCTOS
    // Crear un funcion para obtener los datos del producto a editar
    function handleEditProduct(producto) {

        console.log("Producto a editar", producto)
        setSelectedProduct(producto);
        // setValue("name", producto.name);
        // setValue("price", producto.price);

    }
    // Rellenar el formulario con la data del producto seleccionado
    // Definir alguna formar de determinar si estamos editando o agregando un producto
    // Enviar la nueva data a nuestro backend (mockapi) con una peticion a traves del metodo PUT
    // Solicitar los productos nuevamente para poder  ver las modificaciones en el prod editado




    return (
        <section className='form-section'>
            <div className="admin-container">
                <div className="admin-container">
                    <div className="form-container-center">
                            <div className="form-subcontainer">
                            <h1 className='form-title'> Admin Prodcut </h1>
                            <form onSubmit={handleSubmit(onProductSubmit)}>
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
                                        <option value="Europa"> Europa </option>
                                        <option value="Asia"> Asia </option>
                                        <option value="América"> América </option>
                                        <option value="Oceanía"> Oceanía </option>
                                        <option value="África"> África </option>
                                    </select>

                                    {errors.price?.type === "required" && <div className="input-error">El campo es requerido</div>}

                                </div>

                                <div className="input-group">
                                    <label htmlFor="createdAt">Fecha de ingreso</label>
                                    <input type="date" {...register("createdAt", { required: true })} />

                                    {errors.price?.type === "required" && <div className="input-error">El campo es requerido</div>}
                                </div>

                                <div className="input-group">
                                    <label htmlFor="image"> Imagen </label>
                                    <input type="url" {...register("image", { required: true })} />
                                </div>

                                {errors.price?.type === "required" && <div className="input-error">El campo es requerido</div>}

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
                    
                </div>

                <div className="contenedor-tabla">
                    <AdminTable products={products} deleteProduct={deleteProduct} handleEditProduct={handleEditProduct} />

                </div>
            </div>




        </section>
    )
}

