import { BrowserRouter, Routes, Route } from "react-router-dom";
import SelectPaymentType from "./pages/SelectPaymentType";
import Khalti from "./pages/khalti"; 
import PaymentSuccess from "./pages/PaymentSuccess";
import { Provider } from "react-redux";
import store from "./store/store";
import Signup from "./component/Signup";
import Login from "./component/login";
import ProductList from "./product/ProductForm";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/payment" element={<SelectPaymentType />} />
          <Route path="/khalti" element={<Khalti />} />
          <Route path="/success" element={<PaymentSuccess />} />
          <Route path="/product" element={< ProductList/>} />

        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
