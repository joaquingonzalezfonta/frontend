import './AdminTable.css'
import AdminRow from '../admin-row/AdminRow'

export default function AdminTable({ products, deleteProduct, handleEditProduct}) {
  return (
      <table className="car-table">

        <thead>
          <tr>
            <th>
              Imagen
            </th>
            <th>
              Nombre producto
            </th>
            <th>
              Descripcion
            </th>
            <th>
              Precio
            </th>
            <th>
              Categoria
            </th>
            <th>
              Fecha de ingreso
            </th>
            <th>
              Acciones
            </th>
          </tr>
        </thead>

        <tbody>
        {
            products.map(prod => {
              return <AdminRow key={prod._id} producto={prod} deleteProduct={deleteProduct} handleEditProduct={handleEditProduct}/>
            })
          }
        </tbody>



      </table>

  )
}
