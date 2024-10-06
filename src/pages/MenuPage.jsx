import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Card } from "flowbite-react";
import Header from "../components/Header";

export default function MenuPage() {
  const [menus, setMenus] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 6,
    total: null,
    prevPage: null,
    nextPage: null,
  });
  const [deleteSuccess, setDeleteSuccess] = useState("");
  const [deleteError, setDeleteError] = useState("");

  const getMenusList = () => {
    axios
      .get(
        `https://api.mudoapi.site/menus?page=${pagination.page}&perPage=${pagination.perPage}`
      )
      .then((res) => {
        setMenus(res.data.data.Data);
        setPagination({
          page: res.data.data.currentPage,
          perPage: res.data.data.perPage,
          total: res.data.data.total,
          prevPage: res.data.data.previousPage,
          nextPage: res.data.data.nextPage,
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    getMenusList();
  }, [pagination.page]);

  const handleNext = () => {
    if (pagination.nextPage) {
      setPagination((prevState) => ({
        ...prevState,
        page: prevState.page + 1,
      }));
    }
  };

  const handleBack = () => {
    if (pagination.prevPage) {
      setPagination((prevState) => ({
        ...prevState,
        page: prevState.page - 1,
      }));
    }
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem("access_token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .delete(`https://api.mudoapi.site/menu/${id}`, config)
      .then((res) => {
        console.log(res);
        setDeleteSuccess("Menu deleted successfully");
        getMenusList();
      })
      .catch((err) => {
        setDeleteError(err.response.data.message);
        setDeleteSuccess("");
      });
  };

  return (
    <div>
      <Header />

      <div className="flex items-center justify-center bg-center gap-2 bg-slate-800 pt-12">
        <Button disabled={pagination.page === 1} onClick={handleBack}>
          Back
        </Button>
        <Button disabled={!pagination.nextPage} onClick={handleNext}>
          Next
        </Button>
      </div>
      <div className="flex items-center justify-center bg-center bg-slate-800 pt-2">
        {deleteSuccess && (
          <p className="text-green-500 font-bold text-3xl">{deleteSuccess}</p>
        )}
        {deleteError && (
          <p className="text-red-500 font-bold text-3xl">{deleteError}</p>
        )}
      </div>
      <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-slate-800 gap-6">
        {menus.map((item, index) => (
          <div key={item.id} className="p-10 flex">
            <Card
              className="max-w-sm h-full flex flex-col justify-between"
              imgSrc={item.imageUrl}
              horizontal
            >
              <div className="flex-1">
                <p className="text-3xl font-bold">{index + 1}</p>
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {item.name}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  {item.description}
                </p>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <Link to={`/detail/${item.id}`}>
                  <Button>Detail</Button>
                </Link>
                <Button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500"
                >
                  Delete
                </Button>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
