import { Link } from "react-router";
import Icon from "../../components/ui/icon";
import Text from "../../components/ui/text";

interface ListItemsProps {
  name: string;
  icon: React.ComponentProps<typeof Icon>["svg"];
  category: string;
  price: number;
  id: string;
}

export default function ListOfSolicitations({
  name,
  icon,
  category,
  price,
  id,
}: ListItemsProps) {
  return (
    <Link to={`/details/${id}`} className="flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <div className="flex items-center justify-center bg-gray-400 rounded-full h-8.5 w-8.5 ">
          <Icon svg={icon} className="w-4.5 h-4.5 fill-green-100" />
        </div>

        <div className="flex flex-col">
          <Text variant="body-md" className="text-gray-100">
            {name}
          </Text>
          <Text variant="body-sm" className="text-gray-200">
            {category}
          </Text>
        </div>
      </div>
      <span>
        <Text variant="body-md" className="text-gray-200">
          R${" "}
        </Text>
        <Text variant="body-md" className="text-gray-100">
          {price}
        </Text>
      </span>
    </Link>
  );
}
