import './App.css';
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Cart from './Components/Cart/Cart'
import Products from './Components/Products/Products'
import Categories from './Components/Categories/Categories'
import Brands from './Components/Brands/Brands'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Notfound from './Components/Notfound/Notfound'
import UserTokenProvider, { userToken } from './Components/userToken/userToken';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import CartContextProvider, { cartContext } from './Components/CartContext/CartContext';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { store } from './Components/Redux/Store';
import PaymentDetails from './Components/PaymentDetails/PaymentDetails';
import Allorders from './Components/Allorders/Allorders';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import VirfyCode from './Components/VirfyCode/VirfyCode';
import UpdatePassword from './Components/UpdatePassword/UpdatePassword';
import { WishlistContextProvider } from './Components/WishlistContext/WishlistContext';
import Wishlist from './Components/Wishlist/Wishlist';




let routers = createHashRouter([
  {path:'' ,element:<Layout/> ,children:[
    {index:true,element:<Home/>},
    {path:'cart',element: <ProtectedRoute><Cart/></ProtectedRoute>},
    {path:'products',element: <ProtectedRoute><Products/></ProtectedRoute>},
    {path:'categories',element:<ProtectedRoute> <Categories/></ProtectedRoute>},
    {path:'brands',element: <ProtectedRoute><Brands/></ProtectedRoute>},
    {path:'allorders',element: <ProtectedRoute><Allorders/></ProtectedRoute>},
    {path:'paymentDetails',element: <ProtectedRoute><PaymentDetails/></ProtectedRoute>},
    {path:'productdetails/:id',element: <ProtectedRoute><ProductDetails/></ProtectedRoute>},
    {path:'wishlist',element: <ProtectedRoute><Wishlist/></ProtectedRoute>},
    {path:'login',element: <Login/>},
    {path:'forgetPassword',element: <ForgetPassword/>},
    {path:'virfiyCode',element: <VirfyCode/>},
    {path:'updatepassword',element: <UpdatePassword/>},
    {path:'register',element: <Register/>},
    {path:'*',element: <Notfound/>}
  ]}
])



function App() {

 


  return <>
  

        <WishlistContextProvider>
        <CartContextProvider>
        <UserTokenProvider>
        <Provider store={store}>
          <RouterProvider  router={routers} ></RouterProvider>
          <Toaster/>
          </Provider>
        </UserTokenProvider>
        </CartContextProvider>
        </WishlistContextProvider>


    



  
  </>
}

export default App;
