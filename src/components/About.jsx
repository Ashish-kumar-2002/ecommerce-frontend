import aboutImage from "../assets/silders/about.png";
import ProductCard from "./shared/ProductCard";
import iphone13 from "../assets/silders/iphone13.png";
import sumsung from "../assets/silders/sumsung.png";
import GooglePixel from "../assets/silders/GooglePixel .png";

const products = [
                {
    image: iphone13,
    productName: "iPhone 13 Pro Max",
    description:
      "The iPhone 13 Pro Max offers exceptional performance with its A15 Bionic chip, stunning Super Retina XDR display, and advanced camera features for breathtaking photos.",
    specialPrice: 720,
    price: 780,
  },

  {
    image: sumsung,
    productName: "Samsung Galaxy S21",
    description:
      "Experience the brilliance of the Samsung Galaxy S21 with its vibrant AMOLED display, powerful camera, and sleek design that fits perfectly in your hand.",
    specialPrice: 699,
    price: 799,
  },
  {
    image: GooglePixel,
    productName: "Google Pixel 6",
    description:
      "The Google Pixel 6 boasts cutting-edge AI features, exceptional photo quality, and a stunning display, making it a perfect choice for Android enthusiasts.",
    price: 599,
    specialPrice: 400,
  }
];
const About = () =>{
    return(
        <div  className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-slate-800 text-4xl font-bold text-center mb-12">
                About Us 
            </h1>
           <div className="flex flex-col lg:flex-row justify-between items-center mb-12">
              <div className="w-full md:w-1/2 text-center md:text-left ">
                <p className="text-lg mb-4">
                     Welcome to our e-commerce store! We are committed to providing high-quality
                        products at affordable prices with a seamless and secure shopping experience.
                        Our platform offers a wide range of products, ensuring that every customer
                        finds exactly what they need with ease and confidence.
                </p>
              </div>
               
               <div className="w-full md:w-1/2 mb-6 md:mb-8 flex justify-center">
                   <img
                        src={aboutImage}
                        alt="About Us"
                        className="w-full max-w-md rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105"
                        img/>
               </div>

           </div>

           <div className="py-7 space-y-8">
            <h1  className="text-slate-800 text-4xl font-bold text-center mb-12">
                Our Products
            </h1>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-6"> 
                {products.map((product,index)=>(
                    <ProductCard
                    key={index}
                    image={product.image}
                    productName={product.productName}
                    description={product.description}
                    specialPrice={product.specialPrice}
                    price={product.price}
                    about />
                ))
                }
           </div>

        </div>
    );
}

export default About;