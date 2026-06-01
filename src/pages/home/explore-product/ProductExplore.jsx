import { MdOutlineArrowForward } from "react-icons/md";
import { MdOutlineArrowBack } from "react-icons/md";
import ProductCard from "./ProductCard";
import { useUser } from "../../../components/context/UserProvider";
import { useNavigate } from "react-router-dom";

const ProductExplore = () => {
  const navigate = useNavigate();
  const { products, isFetching } = useUser();
  return (
    <div>
      <div className="flex flex-col gap-y-10 mb-35">
        <div className="w-full">
          <div className="flex flex-col gap-y-5 mb- 15 ">
            <div className="flex items-center gap-x-4">
              <div className="w-5 h-10 bg-[#DB4444] rounded-sm "></div>
              <p className="text-[#DB4444] font-bold">Our Products</p>
            </div>
            <div className="flex justify-between items-center end gap-x-22  h-15">
              <p className="text-3xl font-semibold ">Explore Our Products</p>
              <div className="hidden md:flex items-center gap-x-3">
                <div className="rounded-full bg-gray-100 w-10 h-10 flex items-center justify-center cursor-pointer">
                  <MdOutlineArrowBack size={20} />
                </div>
                <div className="rounded-full bg-gray-100 w-8 h-8 flex items-center justify-center cursor-pointer">
                  <MdOutlineArrowForward size={20} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-ful space-y-5">
          {isFetching ? (
            <p>Loading Products ...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 ">
              {products.map((product, i) => {
                if (i < 8) {
                  return (
                    <ProductCard
                      key={i}
                      image={product.image}
                      name={product.name}
                      currentPrice={product.priceCents}
                      previousPrice={product.previousPrice}
                      stars={product.rating.stars}
                      counts={product.rating.counts}
                      discount={product.discount}
                      colors={product.colors}
                      status={product.C}
                    />
                  );
                }
              })}
            </div>
          )}
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => {
              navigate("/products");
            }}
            className="py-5 px-12 bg-[#DB4444] text-white font-semibold rounded-sm  cursor-pointer"
          >
            View All Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductExplore;
