import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Input } from "reactstrap";
import Statistical from "./Statistical";
import { Link, useNavigate } from "react-router-dom";

function DishList() {
  const [dishes, setDishes] = useState([
    {
      id: "",
      nameFood: "",
      description: "",
      price: "",
      image: "",
    },
  ]);

  const [search, setSearch] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [noDataFound, setNoDataFound] = useState("");
  const navigate = useNavigate();

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

  const handlerOnchange = (e) => {
    const val = e.target.value;
    setSearch(val);
    console.log(search);
  };
  return (
    <div className="container fluid">
      <div className="row">
        <div className="col-4">
          <Input
            search="text"
            className="form-control"
            value={search}
            placeholder="Enter name dish"
            onChange={handlerOnchange}
            style={{ width: "50em" }}
          />
        </div>
        <div className="col-4"></div>
        <div className="col-4">
          <Button
            className="btn btn-success"
            onClick={() => navigate("/statistical")}
          >
            Statistic
          </Button>
        </div>
      </div>
      <br></br>
      <h2>Danh sách món ăn</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name food</th>
            <th>Description</th>
            <th>Type of food</th>
            <th>Price</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {!!dishes ? (
            dishes
              .filter((dishes) =>
                search === ""
                  ? true
                  : dishes.nameFood
                      .toLowerCase()
                      .indexOf(search.toLowerCase()) !== -1
              )
              .map((dish, index) => (
                <tr key={index}>
                  <th scope={"row"}>{dish.id}</th>
                  <td>{dish.nameFood}</td>
                  <td style={{ width: "35em" }}>{dish.description}</td>
                  <td>{dish.name_ctgs}</td>
                  <td>
                    {dish.price} <b>đ</b>
                  </td>
                  <td>
                    <img
                      src={`http://localhost:8000/images/${dish.image}`}
                      style={{ width: "100px" }}
                      alt=""
                    />
                  </td>
                </tr>
              ))
          ) : (
            <tr>
              <td>No Data in API</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DishList;
