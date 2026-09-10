import { useEffect, useState } from "react"
import UserTable from "../../components/user-table/UserTable"
import { useForm } from "react-hook-form"
import axios from "axios";
import Swal from "sweetalert2";
import '../../services/interceptor/interceptor';
import useApi from "../../services/interceptor/interceptor";
import { useUser } from "../../context/UserContext";

const URL = import.meta.env.VITE_LOCAL_SERVER;

export default function Adminuser() {

  const api = useApi()
  const [users, setUsers] = useState([]);
  const { register, setValue, handleSubmit, formState: { errors } } = useForm()
  const [selectedUser, setSelectedUser] = useState(null);
  const [ provinces, setProvinces ] = useState([])
  const [ budget, setBudget ] = useState([])
  const [ upLoadUser, setUpLoadUser ] = useState(1)
  // const { setTotalItems } = useState([])
  const { token } = useUser()


  useEffect(() => { getProvinces(), getBudget() }, [])
  useEffect(() => { getUsers(); }, [upLoadUser])

  useEffect(() => {
    if (selectedUser) {
      setValue("name", selectedUser.name)
      setValue("email", selectedUser.email)
      setValue("password", selectedUser.password)
      setValue("number", selectedUser.number)
      setValue("birthdate", selectedUser.birthdate)
      setValue("budget", selectedUser.budget)
      setValue("porvince", selectedUser.province)
      setValue("comentary", selectedUser.comentary)
      setValue("image", selectedUser.image)
    }

  }, [selectedUser, setValue,])

  function resetForm() {
    document.getElementById('productForm').reset();
}

  async function getProvinces() {
    try {
        
        const response = await api.get(`/provinces`)

        setProvinces(response.data.provinces)

    } catch (error) {
        console.log(error)
        alert("No se pudieron cargar las provincias")
    }
}

async function getBudget() {
  try {
      
      const response = await api.get(`/budget`)

      setBudget(response.data.budget)

  } catch (error) {
      console.log(error)
      alert("No se pudieron cargar los presupuestos")
  }
}



  async function getUsers() {
    try {
      const response = await api.get(`/users`, {
        headers: {
          Authorization: token
        }
      });
      

      // const { users = [], total = 0 } = response.data || {};
      setUsers(response.data);
      // setTotalItems(total);
    } catch (error) {
      console.log(error);
    }
  }


  function deleteUser(id) {

    Swal.fire({
      title: "Borrar usuario",
      text: "Realmente desea borrar?",
      icon: "warning",
      reverseButtons: true,
      showCancelButton: true,
    }).then(async (result) => {
      try {
        if (result.isConfirmed) {

          await axios.delete(`${URL}/users/${id}`, {
            headers: {
              Authorization: token
            }
          });

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
    

    try {

      const formData = new FormData()
            formData.append("name", user.name);
            formData.append("email", user.email);
            formData.append("password", user.passsword);
            formData.append("number", user.number);
            formData.append("birthdate", user.birthdate);
            formData.append("budget", user.budget);
            formData.append("province", user.province);
            formData.append("comentary", user.comentary);
            if(user.image[0]) {
                formData.append("image", user.image[0])
            }

      if (selectedUser) {

        const { _id } = selectedUser;

        await axios.put(`${URL}/users/${_id}`, formData, { headers: { authorization: token } })

        Swal.fire({
          title: "Actualización correcta",
          text: "El usuario fue actualizado con éxito",
          icon: "success",
          timer: "1500"
        })

        setSelectedUser(null)

    setUpLoadUser(upLoadUser + 1)

      } else {

      await axios.post(`${URL}/users`, formData, { headers: { authorization: token } })
        

        Swal.fire({
          title: "Usuario creado",
          text: "El usuario fue creado correctamente",
          icon: "success",
          timer: "1500"
      })
      
    }
    
    resetForm();
    
    getUsers();
    
    setUpLoadUser(upLoadUser + 1)

    } catch (error) {
      console.log(error)
    }
  }



  function handleEditUser(user) {
    setSelectedUser(user);
  }


  return (
    <section className="form-section">
      <h1 className="section-title"> ADMIN USER  </h1>
      <div className="section-subtitle">Registrar o editar usuario</div>
      <div className="admin-container">
        <div className="form-container-center">
          <div className="form-subcontainer">
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
                <label className="input-label" htmlFor="email">
                  Correo electronico
                </label>
                <input type="text" id="email"
                  {...register("email", { autoComplete: true, autoCapitalize: true, required: true, minLength: 10, maxLength: 30, pattern: "[A-Za-z0-9._+-']+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$" })}
                />

                {errors.email?.type === "required" && <div className="input-error"> El campo es requerido </div>}
                {errors.email?.type === "minLength" && <div className="input-error"> El minimo de caracteres es 10 </div>}
                {errors.email?.type === "maxLength" && <div className="input-error"> El maximo de caracteres es 30 </div>}

              </div>
              <div className="input-group">
                <label className="input-label" htmlFor="password">
                  Contraseña
                </label>
                <input type="password" id="password"
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
                  {...register("birthdate", { required: true, })}
                />

                {errors.birthdate?.type === "required" && <div className="input-error"> El campo es requerido </div>}

              </div>
              <div className="input-group">
                <label className="input-label" htmlFor="province">
                  Seleccione su provincia
                </label>
                <select
                  {...register("province", { required: true })}>
                    {
                      provinces.map(pro => (
                        <option key={pro._id} value={pro.name}> {pro.viewValue} </option>
                      ))
                    }
                </select>

                {errors.province?.type === "required" && <div className="input-error"> El campo es requerido </div>}

              </div>



              <div className="input-group">
              <label className="input-label" htmlFor="budget">
                  Seleccione su presupuesto
                </label>
                <select
                  {...register("budget", { required: true })}>
                    {
                      budget.map(pres => (
                        <option key={pres._id} value={pres.name}> {pres.viewValue} </option>
                      ))
                    }
                </select>

                {errors.budget?.type === "required" && <div className="input-error"> El campo es requerido </div>}

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
                <input accept="image/*" type="file" {...register("image", { required: true })} />

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

