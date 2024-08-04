
import { Routes,Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Policy from './pages/Policy';
import About from './pages/About';
import Contact from './pages/Contact';
import PageNotFound from './pages/PageNotFound';
import  { Toaster } from 'react-hot-toast';

import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Dashboard from './pages/user/Dashboard';
import Private from './components/routes/Private';

import ForgetPassword from './pages/auth/ForgetPassword';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminPrivate from './components/routes/AdminPrivate';
import Createcategory from './pages/admin/Createcategory';
import Createproduct from './pages/admin/Createproduct';
import AllUser from './pages/admin/AllUser';
import Profile from './pages/user/Profile';
import Orders from './pages/user/Orders';
import Products from './pages/admin/Products';
import Updateproduct from './pages/admin/Updateproduct';
import Searchpage from './pages/Searchpage';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Categories';
import CategoryProduct from './pages/CategoryProduct';
import Cart from './pages/Cart';
import AdminOrders from './pages/admin/AdminOrders';
function App() {
  return (
   <>
   <Toaster/>
   <Routes>
    <Route path='/' element={<Homepage/>}/>
    <Route path='/categories' element={<Categories/>}/>
    <Route path='/cart' element={<Cart/>}/>

    <Route path='/category/:slug' element={<CategoryProduct/>}/>
    <Route path='/search' element={<Searchpage/>}/>
    
    <Route path='/product/:slug' element={<ProductDetails/>}/>

    <Route path='/dashboard' element={<Private/>}>
    <Route path='user' element={<Dashboard/>}/>
    <Route path='user/profile' element={<Profile/>}/>
    <Route path='user/orders' element={<Orders/>}/>


    </Route>
    <Route path='/dashboard' element={<AdminPrivate/>}>
    <Route path='admin' element={<AdminDashboard/>}/>
    <Route path='admin/create-category' element={<Createcategory/>}/>
    <Route path='admin/create-product' element={<Createproduct/>}/>
    <Route path='admin/products/:slug' element={<Updateproduct/>}/>
    <Route path='admin/users' element={<AllUser/>}/>
    <Route path='admin/orders' element={<AdminOrders/>}/>

    <Route path='admin/products' element={<Products/>}/>




    </Route>

    <Route path='/register' element={<Register/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/forget-password' element={<ForgetPassword/>}/>


    

    <Route path='/about' element={<About/>}/>

    <Route path='/contact' element={<Contact/>}/>

    <Route path='/policy' element={<Policy/>}/>
    <Route path='*' element={<PageNotFound/>}/>

   </Routes>
   
   </>
  );
}

export default App;
