import { supabase } from "api/supabaseClient";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Category = {
  id: number;
  categoryName: string;
  linkTitle: string;
  link: string;
  order: number;
};

const Home = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = async () => {
    let { data } = await supabase.from("category").select("*").order("order", { ascending: true });
    setCategories(data || []);
  };

  console.log("loadData->", categories);

  return (
    <div>
      {categories.map(item => (
        <div className="container py-4 flex justify-center">
          <div className="p-6 max-w-sm mx-auto bg-gray-200 text-black font-medium px-10 py-2 rounded-3xl shadow-md items-center  hover:bg-primary hover:text-white inline-block">
            <Link to={`/${item.categoryName}`}>{item.categoryName}</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
