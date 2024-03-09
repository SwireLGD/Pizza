import Appbar from "./components/Appbar/Appbar";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminDishes from "./containers/Dishes";
import EditDish from "./containers/EditDish";
import NewDish from "./containers/AddDish";
import PageNotFound from "./containers/PageNotFound";

const App = () => {

  return (
    <>
    <header><Appbar /></header>  
    <main className="container-fluid">
      <Routes>
        <Route path="/" element={<AdminDishes />} />
        <Route path="/admin" element={<Navigate replace to="/admin/dishes" />} />
        <Route path="/admin/dishes" element={<AdminDishes />} />
        <Route path="/admin/edit-dish/:id" element={<EditDish />} />
        <Route path="/admin/add-dish" element={<NewDish />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </main>
    </>
  );
};

export default App;