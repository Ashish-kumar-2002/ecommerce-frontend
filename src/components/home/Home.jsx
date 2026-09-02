import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import HeroBanner from "./HeroBanner";
import ProductCard from "../shared/ProductCard";
import { fetchProducts } from "../../store/actions";

const Home = () => {

    const dispatch = useDispatch();

    const { products } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts(""));
    }, [dispatch]);

    return (
        <div className="lg:px-14 sm:px-8 px-4">

            <div className="py-6">
                <HeroBanner />
            </div>

            <div className="py-5">

                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold">
                        Products
                    </h1>

                    <p className="text-gray-600">
                        Discover our handpicked selection of top-rated items.
                    </p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

                    {products?.map((item) => (
                        <ProductCard
                            key={item.productId}
                            {...item}
                        />
                    ))}

                </div>

            </div>

        </div>
    );
};

export default Home;