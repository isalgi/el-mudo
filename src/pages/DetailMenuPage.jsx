import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button } from "flowbite-react";

export default function DetailMenuPage() {
  const [detailMenu, setDetailMenu] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const getDetailMenu = () => {
    axios
      .get(`https://api.mudoapi.site/menu/${id}`)
      .then((res) => setDetailMenu(res.data.data))
      .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    getDetailMenu();
  }, []);

  console.log(detailMenu);

  return (
    <div>
      <Card>
        <h3 className="text-3xl font-bold ">{detailMenu.name}</h3>
        <p className="text-gray-600 text-2xl py-2">{detailMenu.description}</p>
        <img src={detailMenu.imageUrl} className="w-96" alt={detailMenu.name} />
        <p className="font-bold text-2xl py-2">
          Harga: {detailMenu.priceFormatted}
        </p>
        <Button onClick={() => navigate("/menu")}>Back</Button>
      </Card>
    </div>
  );
}
