import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../index.css';



const ProductCard = ({ className, product }) => {
  return (
    <div
      className={`bg-white rounded-md shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 ${className}`}
    >
      <CardImage src={product.thumbnail} alt={product.title} />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
        <p className="text-gray-600 text-sm line-clamp-3">{product.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-green-600 font-bold text-base">${product.price}</span>
          <span className="bg-gray-200 px-3 py-1 text-sm rounded-md">{product.category}</span>
        </div>
      </div>
    </div>
  );
};



const CardImage = ({ src, alt }) => (
  <img
    src={src}
    alt={alt}
    className="w-full h-81 object-cover rounded-t-md"
  />
);



const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');



  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products');
        setProducts(response.data.products);
      } catch (error) {
        setError('Unable to load products');
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);



  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;
  }


  
  return (
    <div className="container mx-auto p-5 bg-[#FBF6E9]">
      <h1 className="text-2xl font-bold text-center mb-8">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
