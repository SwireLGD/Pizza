import AdminDishes from "./containers/Dishes";
import Appbar from "./components/Appbar/Appbar";

const App = () => {

  return (
    <>
    <header><Appbar /></header>  
    <main className="container-fluid">
      <AdminDishes />
    </main>
    </>
  );
};

export default App;