import React, { useEffect, useState } from "react";
import MainCarousel from "../../components/MainCarousel/MainCarousel";
import HomeSectionCarousel from "../../components/HomeSectionCarousel/HomeSectionCarousel";
import { mens_kurta } from "../../../data/Men/men_kurta";
import { men_shirt } from "../../../data/Men/men_shirt";
import { women_dress } from "../../../data/Women/women_dress";
import { gounsPage1 } from "../../../data/Gouns/gouns";
import { lengha_page1 } from "../../../data/Women/LenghaCholi";
import { women_top } from "../../../data/Women/women_top";
import { productApi } from "../../../configuration/ApiConfig";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

export const HomePage = () => {
  const [womenDress, setWomenDress] = useState([]);
  const [mensShirt, setMensShirt] = useState([]);
  const [womenTops, setWomenTops] = useState([]);
  const location = useLocation();

  const findProductsByCategory = async (category) => {
    const { data } = await productApi.get(
      `/api/products?color=${[]}&size=${[]}&minPrice=${0}&maxPrice=${1000000}&minDiscount=${0}&category=${category}&stock=${"in_stock"}&sort=${"price_high"}&pageNumber=${0}&pageSize=${30}`
    );
    return data;
  };

  const fetchData = async () => {
    const womenDressData = await findProductsByCategory("women_dress");
    setWomenDress(womenDressData.content);

    const womenTopsData = await findProductsByCategory("top");
    setWomenTops(womenTopsData.content);

    const mensShirtData = await findProductsByCategory("shirt");
    setMensShirt(mensShirtData.content);
  };
  useEffect(() => {
    fetchData();
    // Message to show for demo user
    // Swal.fire({
    //   title: "TO USE ADMIN ACCOUNT",
    //   text: "Email : admin@admin.com , Password : admin",
    //   icon: "info",
    //   timer: 10000, // Auto close after 3 seconds
    //   showConfirmButton: true,
    // });
  }, []);

  useEffect(() =>
    //if(location.pathname === "/login")
    {}, []);

  return (
    <div className="bg-stone-300">
      <MainCarousel />
      <div className="space-y-10 py-10 flex flex-col justify-center">
        <h1 className="text-4xl font-bold mb-4 ml-10">
          Explore Our Collection of
          <span className="text-pink-500"> Women's Dresses</span>
        </h1>
        {womenDress && <HomeSectionCarousel data={womenDress} />}
        <h1 className="text-4xl font-bold mb-4 ml-10">
          Explore Our Collection of
          <span className="text-pink-500"> Men's Shirts</span>
        </h1>
        {mensShirt && <HomeSectionCarousel data={mensShirt} />}
        <h1 className="text-4xl font-bold mb-4 ml-10">
          Explore Our Collection of
          <span className="text-pink-500"> Women's Tops</span>
        </h1>
        {womenTops && <HomeSectionCarousel data={womenTops} />}
      </div>
    </div>
  );
};
