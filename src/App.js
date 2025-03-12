import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignIN from "./pages/Auth/Signin";
import SignUp from "./pages/Auth/Signup";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Profile from "./pages/profile";
import Basket from "./pages/basket/Basket";
import Admin from "./pages/Admin";
import ProtectedRoute from "./ProtectedRoute";
import Orders from "./pages/Orders/Orders";
import AdminProducts from "./pages/AdminProducts/AdminProducts";
import AdminProductDetail from "./pages/Admin/ProductDetail/ProductDetail";
import CreateProduct from "./pages/createProduct/CreateProduct";
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />

        <div id="content">
          <Routes>
            <Route path="/product" element={<Products />}></Route>
            <Route path="/product/:product_id" element={<ProductDetail />} />
            <Route path="/signin" element={<SignIN />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/basket" element={<Basket />}></Route>
            <Route path="/admin/orders" element={<Orders />}></Route>
            <Route path="/admin/products" element={<AdminProducts />}></Route>
            <Route
              path="/admin/products/new"
              element={<CreateProduct />}
            ></Route>
            <Route
              path="/admin/products/:product_id"
              element={<AdminProductDetail />}
            ></Route>
            <Route path="/admin" element={<ProtectedRoute />}>
              <Route path="" element={<Admin />} />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
