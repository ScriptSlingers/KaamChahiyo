import Image from "next/image";
import { About, Catagories, QuickLinks, Location } from "../components/Menus";

const Item = ({ Links, title }: { Links: string; title: string }) => {
  return (
    <div>
      <ul>
        <h1 className="mb-1 text-xl font-semibold">{title}</h1>
        {Links.map((link) => (
          <li key={link.name}>
            <a
              className="text-gray-400 hover:text-teal-400 text-lg duration-300 cursor-pointer leading-6"
              href={link.link}
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ItemsContainer = () => {
  return (
    <div className="grid grid-cols-4 justify-center m-auto container gap-6 px-5 py-12">
      {/* <Item Links={About} title="ABOUT" /> */}
      <div className="flex flex-col gap-5 pr-10">
        <div className="w-40 h-20 relative">
          <Image
            src="/assets/img/logo-white.png"
            alt="KaamChahiyo"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-lg ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Exercitationem ut at molestias provident sapiente, blanditiis porro
          </p>
        </div>
      </div>
      <Item Links={Catagories} title="CATAGORIES" />
      <Item Links={QuickLinks} title="QUICKLINKS" />
      <Item Links={Location} title="LOCATION" />
    </div>
  );
};

export default ItemsContainer;
