import { useParams } from "react-router-dom";
import { Card } from "flowbite-react";
import usePost from "../hooks/usePost";

export default function DetailMenuPage() {
  const [menu, getDetailMenu] = usePost(id);
  const { id } = useParams();

  return (
    <div>
      <Card>
        <h3 className="text-3xl font-bold ">{menu.name}</h3>
        <p className="text-gray-600 text-2xl py-2">{menu.description}</p>
        <img src={menu.imageUrl} className="w-96" alt={menu.name} />
        <p className="font-bold text-2xl py-2">Price: {menu.priceFormatted}</p>
      </Card>
    </div>
  );
}
