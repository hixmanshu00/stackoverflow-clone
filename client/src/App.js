import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AllRoutes from "./AllRoutes";
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter as Router} from 'react-router-dom'
import { fetchAllQuestions } from "./actions/question";
import { fetchAllUsers } from "./actions/users";
import {Toaster} from 'react-hot-toast'
import { getAllPosts } from "./actions/post";
import { useNavigate } from "react-router-dom";

function App() {

  const dispatch = useDispatch();



  useEffect(() => {
    dispatch(fetchAllQuestions());
    dispatch(fetchAllUsers())
    dispatch(getAllPosts())
  }, [dispatch])
  
  const [slideIn, setSlideIn] = useState(true);

  useEffect(() => {
    if (window.innerWidth <= 760) {
      setSlideIn(false);
    }
  }, []);

  const handleSlideIn = () => {
    if (window.innerWidth <= 760) {
      setSlideIn((state) => !state);
    }
  };
  return (
    <div className="App">
    <Router>
      <Navbar  handleSlideIn={handleSlideIn} />
      <AllRoutes slideIn={slideIn} handleSlideIn={handleSlideIn} />
      <Toaster />
    </Router>
    </div>
  );
}

export default App;
