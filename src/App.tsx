import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";
import Movie from "./Routes/Movie";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}>
            {/* <Route path="movies/:movieId" element={<Home />}></Route> */}
            <Route path="?movies=:Id" element={<Home />}></Route>
            <Route path="?tv=:Id" element={<Home />}></Route>
          </Route>
          <Route path="/movie" element={<Movie />}></Route>
          <Route path="/tv" element={<Tv />}></Route>
          <Route path="/search" element={<Search />}></Route>
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
