import { useState, useEffect } from "react";
import axios from "axios";
import { Link} from "react-router-dom";

function Statistical() {
  const [dishes, setDishes] = useState([
    {
      id: "",
      nameFood: "",
      description: "",
      price: "",
      image: "",
    },
  ]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [noDataFound, setNoDataFound] = useState("");
  useEffect(() => {
    if (!isLoaded) getDishes();
  }, [isLoaded]);

  const getDishes = () => {
    axios
      .get("http://127.0.0.1:8000/api/dishes")
      .then(function (res) {
        if (res.status === 200) {
          setDishes(res.data.data ? res.data.data : []);
          console.log(res.data.data ? res.data.data : []);
          console.log(dishes);
        }
        if (res.data.status === "failed" && res.data.success === false) {
          setNoDataFound(res.data.data);
          console.log(noDataFound);
        }
        console.log(res.data.data);
        setDishes(res.data.data);
        setIsLoaded(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const breadList = dishes.filter((dishes) => dishes.category_id === 1);
  const noodleList = dishes.filter((dishes) => dishes.category_id === 2);
  const riceList = dishes.filter((dishes) => dishes.category_id === 3);
  

  return (
    <div className="container fluid">
      <Link to="/">Go to back</Link>
      <h2>Danh sách số lượng món ăn theo từng loại</h2>
      <div className="row">
        <div className="col-4"> <h3>Bánh Mì</h3><p>{breadList.length}</p></div>
        <div className="col-4"><h3>Bún Phở</h3><p>{noodleList.length}</p></div>
        <div className="col-4"><h3>Cơm dĩa</h3><p>{riceList.length}</p></div>
      </div>
    </div>
  );
}

export default Statistical;
