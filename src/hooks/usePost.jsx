import { useState, useEffect } from "react";
import axios from "axios";

const usePost = (id) => {
  const [menu, setMenu] = useState({});

  const getDetailMenu = () => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => setMenu(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getDetailMenu();
  }, []);

  return {
    menu,
    getDetailMenu,
  };
};

export default usePost;
