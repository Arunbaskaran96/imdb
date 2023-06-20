import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Portal from "./Components/Portal";
import Actor from "./Pages/Actor/Actor"
import Movie from "./Pages/Movies/Movies"
import Producer from "./Pages/Producers/Producer"
import MoviesDetails from "./Pages/Movies/MoviesDetails";
import Addmovie from "./Pages/Movies/Addmovie";
import Editmovie from "./Pages/Movies/Editmovie";
import Addactor from "./Pages/Actor/Addactor";
import Editactor from "./Pages/Actor/Editactor";
import Addproducer from "./Pages/Producers/Addproducer";
import Editproducer from "./Pages/Producers/Editproducer";
import Actordetails from "./Pages/Actor/Actordetails";
import Producerdetails from "./Pages/Producers/Producerdetails";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Forgotpassword from "./Pages/Forgotpassword/Forgotpassword";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/portal" element={<Portal/>}>
        <Route path="Actors" element={<Actor/>}/>
        <Route path="Movies" element={<Movie/>}></Route>
        <Route path="Producers" element={<Producer/>}></Route>
        <Route path="moviedetail/:id" element={<MoviesDetails/>}></Route>
      </Route>
      <Route path="/addmovie" element={<Addmovie/>}></Route>
      <Route path="/editmovie/:id" element={<Editmovie/>} />
      <Route path="/addactor" element={<Addactor/>}></Route>
      <Route path="/editactor/:id" element={<Editactor/>} />
      <Route path="/addproducer" element={<Addproducer/>} />
      <Route path="/editproducer/:id" element={<Editproducer/>} />
      <Route path="/actordetails/:id" element={<Actordetails/>} />
      <Route path="/producerdetials/:id" element={<Producerdetails/>} />
      <Route path="/"  element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="forgot-password" element={<Forgotpassword/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
