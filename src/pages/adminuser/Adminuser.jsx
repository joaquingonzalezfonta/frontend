import { useEffect, useState } from "react"
import UserTable from "../../components/user-table/UserTable"
import { useForm } from "react-hook-form"
import axios from "axios";
import Swal from "sweetalert2";
// import "./Adminproduct.css"


const URL = "https://66cf3a98901aab24842171a2.mockapi.io/api/v1";

export default function Adminuser() {

  const [users, setUsers] = useState([]);

  const { register, setValue, reset, handleSubmit, formState: { errors } } = useForm()

  const [ selectedUser, setSelectedUser ] = useState(null);

  useEffect(() => { getUsers(); }, [])

  useEffect(() => {
    if (selectedUser) {
      setValue("name", selectedUser.name)
      setValue("mail", selectedUser.mail)
      setValue("password", selectedUser.password)
      setValue("number", selectedUser.number)
      setValue("birthdate", selectedUser.birthdate)
      setValue("porvince", selectedUser.province)
      setValue("budget", selectedUser.budget)
      setValue("image", selectedUser.image)
      setValue("comentary", selectedUser.comentary)
    } else {
      reset()
    }

  }, [selectedUser, setValue, reset])


  async function getUsers() {
    try {
      const response = await axios.get(`${URL}/users`);

      console.log(response.data)

      setUsers(response.data)

    } catch (error) {
      console.log(error)
    }
  }


  function deleteUser(id) {

    Swal.fire({
      title: "Borrar usuario",
      text: "Realmente desea borrar",
      icon: "warning",
      reverseButtons: true,
      showCancelButton: true,
    }).then(async (result) => {
      try {
        if (result.isConfirmed) {
          
          const response = await axios.delete(`${URL}/users/${id}`);

          console.log(response.data)

          getUsers()
        }
      } catch (error) {
        console.log(error)

        Swal.fire({
          title: "Error al borrar",
          text: "El usuario no fue borrado",
          icon: "error"
        })
      }
    })
  }


  async function onUsersSubmit(user) {
    console.log(user)

    try {
      if (selectedUser) {
        
        const { id } = selectedUser;

        const response = await axios.put(`${URL}/users/${id}`, user)
        console.log(response.data)

        Swal.fire({
          title: "Actualización correcta",
          text: "El usuario fue actualizado con éxito",
          icon: "success",
          timer: "1500"
        })

        setSelectedUser(null)

      } else {

        const response = await axios.post(`${URL}/users`, user)
        console.log(response.data)

      }

      getUsers();

    } catch (error) {
      console.log(error)
    }
  }



  function handleEditUser(user) {
    console.log("User a editar", user)
    setSelectedUser(user);
  }


  return (
    <section className="form-section">
      <div className="admin-container">
        <div className="form-container-center">
          <div className="form-subcontainer">
            <h2 className="form-title"> ADMIN USER </h2>
            <form onSubmit={handleSubmit(onUsersSubmit)}>
              <div className="input-group">
                <label className="input-label" htmlFor="name">
                  Nombre completo
                </label>
                <input type="text" id="name"
                  {...register("name", { autoFocus: true, autoComplete: true, autoCapitalize: true, required: true, minLength: 5, maxLength: 40 })}
                />

                  {errors.name?.type === "required" && <div className="input-error"> El campo es requerido </div>}
                  {errors.name?.type === "minLength" && <div className="input-error"> El minimo de caracteres es 3 </div>}
                  {errors.name?.type === "maxLength" && <div className="input-error"> El maximo de caracteres es 40 </div>}

              </div>
              <div className="input-group">
                <label className="input-label" htmlFor="mail">
                  Correo electronico
                </label>
                <input type="text" id="mail" 
                  {...register("mail", { autoComplete: true, autoCapitalize: true, required: true, minLength: 10, maxLength: 30, pattern: "[A-Za-z0-9._+-']+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$" })}
                />

                  {errors.mail?.type === "required" && <div className="input-error"> El campo es requerido </div>}
                  {errors.mail?.type === "minLength" && <div className="input-error"> El minimo de caracteres es 10 </div>}
                  {errors.mail?.type === "maxLength" && <div className="input-error"> El maximo de caracteres es 30 </div>}
                  
              </div>
              <div className="input-group">
                <label className="input-label" htmlFor="password">
                  Contraseña
                </label>
                <input type="text" id="password" 
                  {...register("password", { autoComplete: true, autoCapitalize: true, required: true, minLength: 8, maxLength: 25, })}
                />

                  {errors.password?.type === "required" && <div className="input-error"> El campo es requerido </div>}
                  {errors.password?.type === "minLength" && <div className="input-error"> El minimo de caracteres es 8 </div>}
                  {errors.password?.type === "maxLength" && <div className="input-error"> El maximo de caracteres es 25 </div>}

              </div>
              <div className="input-group">
                <label className="input-label" htmlFor="number">
                  Numero de teléfono
                </label>
                <input type="number" id="number"
                  {...register("number", { autoComplete: true, required: true, minLength: 6, maxLength: 20, })}
                />

                  {errors.number?.type === "required" && <div className="input-error"> El campo es requerido </div>}
                  {errors.number?.type === "minLength" && <div className="input-error"> El minimo de caracteres es 6 </div>}
                  {errors.number?.type === "maxLength" && <div className="input-error"> El maximo de caracteres es 20 </div>}

              </div>
              <div className="input-group">
                <label className="input-label" htmlFor="birthdate">
                  Fecha de cumpleaños
                </label>
                <input type="date" id="birthdate" 
                  {...register("birthdate", { required: true, minLength: 8, maxLength: "2006-09-21", })}
                />

                  {errors.birthdate?.type === "required" && <div className="input-error"> El campo es requerido </div>}
                  {errors.birthdate?.type === "maxLength" && <div className="input-error"> Fecha máxima 2006-09-21 </div>}

              </div>
              <div className="input-group">
                <label className="input-label" htmlFor="province">
                  Seleccione su provincia
                </label>
                <select name="province" id="province" 
                  {...register("province", { autoComplete: true, required: true, minLength: 1, })}
                >
                  <option value="" />
                  <option value="AR">Buenos Aires</option>
                  <option value="BR">Entre Rios</option>
                  <option value="UR">Misiones</option>
                  <option value="CH">Corrientes</option>
                  <option value="PA">Formosa</option>
                  <option value="CO">Salta</option>
                  <option value="ME">Jujuy</option>
                  <option value="ME">Santiago del Estero</option>
                  <option value="ME">San Juan</option>
                  <option value="ME">Catamarca</option>
                  <option value="ME">La Pampa</option>
                  <option value="ME">La Rioja</option>
                  <option value="ME">Mendoza</option>
                  <option value="ME">Neuquen</option>
                  <option value="ME">San Luis</option>
                  <option value="ME">Cordoba</option>
                  <option value="ME">Santa Fe</option>
                </select>

                {errors.province?.type === "required" && <div className="input-error"> El campo es requerido </div>}
                {errors.province?.type === "minLength" && <div className="input-error"> Minimo 1 opcion </div>}

              </div>
              <div className="input-group">
                <label className="input-label" htmlFor="budget">
                  Presupuesto
                </label>
                <div>
                  <input type="radio" name="gbudget" defaultValue="F" {...register("province")} /> +$30.000
                </div>
                <div>
                  <input type="radio" name="gbudget" defaultValue="M" {...register("province")} /> +$100.000
                </div>
                <div>
                  <input type="radio" name="gbudget" defaultValue="O" {...register("province")} /> +$500.000
                </div>
                <div>
                  <input type="radio" name="gebudget" defaultValue="O" {...register("province")} /> +$1.000.000
                </div>
                <div>
                  <input type="radio" name="gbudget" defaultValue="O" {...register("province")} /> +$3.000.000
                </div>
                <div>
                  <input type="radio" name="budget" defaultValue="O" {...register("province")} /> +$10.000.000
                </div>
              </div>
              <div className="input-group">
                <label className="input-label" htmlFor="obs">
                  Comentario
                </label>
                <textarea type="text" id="comentary" 
                  {...register("comentary", { maxLength: 300, })}
                  
                />

                {errors.comentary?.type === "maxLength" && <div className="input-error"> El maximo de caracteres es 300 </div>}
              </div>

              <div className="input-group">
                <label className="input-label" htmlFor="image"> Imagen </label>
                <input type="url" {...register("image", { required: true })} />
                                
                {errors.image?.type === "required" && <div className="input-error">El campo es requerido</div>}
              </div>

              <div className="input-group">
                <button className={`${selectedUser && 'btn-success'}`} type='submit' >
                  {
                    selectedUser ? "Editar" : "Crear"
                  }
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="contenedor-tabla">
          <UserTable 
            users={users} deleteUser={deleteUser} handleEditUser={handleEditUser} />

        </div>

      </div>
    </section>
  )
}
