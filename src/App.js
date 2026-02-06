import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Website Pages
import SignUp from "./pages/Auth/SignUp";
import SignIn from "./pages/Auth/SignIn";
import Home from "./pages/WebSite/Home";
import About from "./pages/WebSite/About";
import ContactUs from "./pages/WebSite/Contact";

// Dashboard Pages
import Dashboard from "./pages/Dashboards/Dashboard";
import Users from "./component/Dashboard/UsersManagement/Users";
import AddNewUser from "./component/Dashboard/UsersManagement/AddNewUser";
import UpdateUser from "./component/Dashboard/UsersManagement/UpdateUser"

// UI Components
import Header from "./component/Layout/Header";
import ReloadAndTop from "./component/Ui/ReloadAndTop";
import ScrollToTopButton from "./component/Ui/ScrollToTop";
import NotFound from "./component/Ui/NotFound";
import RequireAdmin from "./Permmations/Permission";
import DashboardHome from "./component/Dashboard/UsersManagement/Stats";
import ProductsTable from "./component/Dashboard/ProductManagement/ProductsTable";
import AddNewProduct from "./component/Dashboard/ProductManagement/AddNewProduct";
import UpdateProduct from "./component/Dashboard/ProductManagement/UpdateProduct";
import DetailsProduct from "./component/Home/DetailsProduct";
// import DetailsProduct from "./component/Home/DetailsProduct";
const queryClient = new QueryClient();

function App() {
  const location = useLocation();

  return (
    <QueryClientProvider client={queryClient}>
      <ReloadAndTop />
      <ScrollToTopButton />
      {!location.pathname.includes("/dashboard") && <Header />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/details/:id" element={<DetailsProduct />} />
        {/* Dashboard Routes */}
        <Route element={<RequireAdmin />}>
          <Route path="/dashboard" element={<Dashboard />}>
            {/* start users routes  */}
            <Route path="/dashboard/users" element={<Users />} />
            <Route path="/dashboard/user/add" element={<AddNewUser />} />
            <Route path="/dashboard/users/:id" element={<UpdateUser />} />
            <Route path="/dashboard" element={<DashboardHome />} />
            {/* end users routes  */}
            {/* start product routes  */}
            <Route path="/dashboard/products" element={<ProductsTable />} />
            <Route path="/dashboard/create" element={<AddNewProduct />} />
            <Route path="/dashboard/product/edit/:id" element={<UpdateProduct />} />
            {/* end product routes  */}

          </Route>
        </Route>
        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
