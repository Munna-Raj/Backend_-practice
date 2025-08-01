import { BrowserRouter, Routes, Route } from "react-router-dom";
import SelectPaymentType from "./pages/SelectPaymentType";
import Khalti from "./pages/khalti";
import PaymentSuccess from "./pages/PaymentSuccess";
import { Provider } from "react-redux";
import store from "./store/store";
import Signup from "./component/Signup";
import Login from "./component/Login";
import ProductList from "./product/ProductForm";
import Nav from "./component/Nav";
import Footer from "./component/footer";
import Account from "./Account/account";
import FoodStoreLanding from "./product/FoodStoreLanding";
import About from "./product/About";
// import Favorite from "../../backend/model/favModel";
// import Favorites from './product/favorites';


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Nav />

        <Routes>
          <Route path="/" element={<FoodStoreLanding />} />
          <Route path="signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/payment" element={<SelectPaymentType />} />
          <Route path="/khalti" element={<Khalti />} />
          <Route path="/success" element={<PaymentSuccess />} />
          <Route path="/product" element={<ProductList />} />
          <Route path="/account" element={<Account />} />
          <Route path="/About" element={<About />} />
          {/* <Route path="/Favorites" element={<Favorites />} /> */}
          
        </Routes>
         <Footer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
