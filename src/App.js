import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Login";
import Logout from "./Logout";
import Members from "./Members";
import Protection from "./Protection";

import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Logout />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route element={<Protection />}>
            <Route path='/members' element={<Members />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
