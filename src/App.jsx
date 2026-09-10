import { Route, Routes } from "react-router-dom"
import Contact from "./pages/contact/Contact"
import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import Adminproduct from "./pages/adminproduct/Adminproduct"
import ProductDetail from "./pages/product-detail/ProductDetail"
import Adminuser from "./pages/adminuser/Adminuser"
import Layout from "./layout/Layout"
import AdminGuard from "./services/guard/AdminGuard"


export default function App() {

  return (
    <>



        <Routes>

          <Route path="/login" element={<Login />} />

          <Route path="/" element={<Layout />} >

            <Route index element={<Home />} />

            <Route path="product-detail/:id" element={<ProductDetail />} />

            <Route path="register" element={<Register />} />

            <Route path="contact" element={<Contact />} />

            <Route path="adminproduct" element={
              
              <AdminGuard>
                <Adminproduct />
              </AdminGuard>
          
            } />

            <Route path="adminuser" element={
              
              <AdminGuard>
                <Adminuser />
              </AdminGuard>
              
            } />

          </Route>
        </Routes>

    </>
  )
}
