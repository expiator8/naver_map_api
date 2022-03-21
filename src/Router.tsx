import { BrowserRouter, Routes, Route } from "react-router-dom";
import Map from "./routes/map";


function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Map />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default Router;
