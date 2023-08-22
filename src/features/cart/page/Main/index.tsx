import React, { useEffect, useState } from 'react'
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate'
import { Link } from 'react-router-dom'

const Main = () => {
  const axiosPrivate = useAxiosPrivate()
  const [products, setProducts] = useState<any[]>()
  useEffect(()=>{
    const getProducts = async ()=>{
       const resp = await axiosPrivate.get(
         'http://127.0.0.1:3333/v1/api/product/drafts/all'
       );
       setProducts(resp.data.metadata.products)
    }

    getProducts()
  },[])

  console.log(products);
  
  return (
    <div>
      {products?.map((p) => (
        <p>{p.product_name}</p>
      ))}
      <Link to="..">go back</Link>
    </div>
  );
}

export default Main