import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Card, Modal, TextInput, Label } from "flowbite-react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

export default function MenuPage() {
  const [menus, setMenus] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 3,
    total: null,
    prevPage: null,
    nextPage: null,
  });
  const [deleteSuccess, setDeleteSuccess] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState("");
  const [updateError, setUpdateError] = useState("");
  const [createError, setCreateError] = useState("");
  const [updateMenu, setUpdateMenu] = useState({
    id: null,
    name: "",
    description: "",
    imageUrl: "",
    price: 0,
  });
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newMenu, setNewMenu] = useState({
    name: "",
    description: "",
    imageUrl: "",
    price: 0,
  });

  const navigate = useNavigate();

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

  const openUpdateModal = (menu) => {
    setUpdateMenu(menu); // Load the selected menu's data
    setIsUpdateModalOpen(true);
  };

  const handleCreate = () => {
    const token = localStorage.getItem("access_token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post("https://api.mudoapi.site/menu", newMenu, config)
      .then((res) => {
        console.log(res);
        setUpdateSuccess("Menu created successfully");
        setIsCreateModalOpen(false); // Close modal after success
        getMenusList(); // Refresh menu list
      })
      .catch((err) => {
        setCreateError(err.response.data.message);
      });
  };

  const handleUpdate = () => {
    const token = localStorage.getItem("access_token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .put(`https://api.mudoapi.site/menu/${updateMenu.id}`, updateMenu, config)
      .then((res) => {
        console.log(res);
        setUpdateSuccess("Menu updated successfully");
        setIsUpdateModalOpen(false); // Close modal after success
        getMenusList(); // Refresh menu list
      })
      .catch((err) => {
        setUpdateError(err.response.data.message);
      });
  };

  return (
    <div>
      <Header />

      {/* Pagination Controls */}
      <div className="flex items-center justify-center bg-center gap-2 bg-slate-800 pt-12">
        <Button disabled={pagination.page === 1} onClick={handleBack}>
          Back
        </Button>
        <Button disabled={!pagination.nextPage} onClick={handleNext}>
          Next
        </Button>
      </div>

      {/* Success/Error Messages */}
      <div className="flex flex-col items-center justify-center bg-center bg-slate-800 pt-2">
        {deleteSuccess && (
          <p className="text-green-500 font-bold text-3xl">{deleteSuccess}</p>
        )}
        {deleteError && (
          <p className="text-red-500 font-bold text-3xl">{deleteError}</p>
        )}
        {updateSuccess && (
          <p className="text-green-500 font-bold text-3xl">{updateSuccess}</p>
        )}
        {updateError && (
          <p className="text-red-500 font-bold text-3xl">{updateError}</p>
        )}
        {createError && (
          <p className="text-red-500 font-bold text-3xl">{createError}</p>
        )}
        <h1 className="text-3xl font-bold text-white mt-4">List of Menus</h1>
      </div>

      {/* Menu List */}
      <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-slate-800 gap-6">
        {menus.map((item) => (
          <div key={item.id} className="p-10 flex">
            <Card
              key={item.id}
              className="max-w-sm w-full mx-auto cursor-pointer"
            >
              <img src={item.imageUrl} alt={item.name} className="mx-auto" />
              <h2 className="text-xl font-bold text-center">{item.name}</h2>
              <p className="text-center">{item.description}</p>
              <p className="text-center">Price: ${item.price}</p>
              <Button
                color="success"
                onClick={() => navigate(`/detail/${item.id}`)}
              >
                Detail Menu
              </Button>
              <Button onClick={() => handleDelete(item.id)} color="failure">
                Delete
              </Button>
              <Button onClick={() => openUpdateModal(item)} color="warning">
                Update
              </Button>
            </Card>
          </div>
        ))}
      </div>

      {/* Create Menu Button */}
      <div className="flex justify-center pt-6">
        <Button onClick={() => setIsCreateModalOpen(true)} color="primary">
          Create New Menu
        </Button>
      </div>

      {/* Create Modal */}
      <Modal
        show={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      >
        <Modal.Header>Create Menu</Modal.Header>
        <Modal.Body>
          <div className="gap-6">
            <div>
              <Label htmlFor="name" value="Name" />
              <TextInput
                id="name"
                value={newMenu.name}
                onChange={(e) =>
                  setNewMenu((prevState) => ({
                    ...prevState,
                    name: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <Label htmlFor="description" value="Description" />
              <TextInput
                id="description"
                value={newMenu.description}
                onChange={(e) =>
                  setNewMenu((prevState) => ({
                    ...prevState,
                    description: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <Label htmlFor="imageUrl" value="Image URL" />
              <TextInput
                id="imageUrl"
                value={newMenu.imageUrl}
                onChange={(e) =>
                  setNewMenu((prevState) => ({
                    ...prevState,
                    imageUrl: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <Label htmlFor="price" value="Price" />
              <TextInput
                id="price"
                type="number"
                value={newMenu.price}
                onChange={(e) =>
                  setNewMenu((prevState) => ({
                    ...prevState,
                    price: e.target.value,
                  }))
                }
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCreate}>Create</Button>
          <Button color="gray" onClick={() => setIsCreateModalOpen(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Update Modal */}
      <Modal
        show={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
      >
        <Modal.Header>Update Menu</Modal.Header>
        <Modal.Body>
          <div className="gap-6">
            <div>
              <Label htmlFor="name" value="Name" />
              <TextInput
                id="name"
                value={updateMenu.name}
                onChange={(e) =>
                  setUpdateMenu((prevState) => ({
                    ...prevState,
                    name: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <Label htmlFor="description" value="Description" />
              <TextInput
                id="description"
                value={updateMenu.description}
                onChange={(e) =>
                  setUpdateMenu((prevState) => ({
                    ...prevState,
                    description: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <Label htmlFor="imageUrl" value="Image URL" />
              <TextInput
                id="imageUrl"
                value={updateMenu.imageUrl}
                onChange={(e) =>
                  setUpdateMenu((prevState) => ({
                    ...prevState,
                    imageUrl: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <Label htmlFor="price" value="Price" />
              <TextInput
                id="price"
                type="number"
                value={updateMenu.price}
                onChange={(e) =>
                  setUpdateMenu((prevState) => ({
                    ...prevState,
                    price: e.target.value,
                  }))
                }
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleUpdate}>Update</Button>
          <Button color="gray" onClick={() => setIsUpdateModalOpen(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
