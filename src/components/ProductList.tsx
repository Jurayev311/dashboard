import { useGetProductsQuery, useDeleteProductMutation } from "../redux/api";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useState } from "react";
import CreateProduct from "./CreateProduct";

interface Product {
  id: string;
  title: string;
  images: string[];
  desc: string;
  category: string;
  price: number;
}

const ProductList = () => {
  const { data: products = [], error, isLoading } = useGetProductsQuery(null);
  const [deleteProduct] = useDeleteProductMutation();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
    } catch (err) {
      console.error("O'chirishda xatolik:", err);
    }
  };

  return (
    <div>
      {editingProduct ? (
        <CreateProduct product={editingProduct} onCancel={() => setEditingProduct(null)} />
      ) : (
        <>
          <h2 style={{ marginTop: "20px", color: "#454545" }}>Manage product</h2>
          {isLoading && <p>Yuklanmoqda...</p>}
          {error && <p>Xatolik yuz berdi</p>}
          <ul style={{ display: "grid", gap: "20px", gridTemplateColumns: "1fr 1fr 1fr", marginTop: "20px" }}>
            {products.map((product: Product) => (
              <li key={product.id} style={{ padding: "16px", width: "300px", height: "396px", color: "#454545" }}>
                {product.images.length > 0 && (
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    style={{
                      width: "100%",
                      height: "250px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      margin: "0 auto",
                      display: "block",
                    }}
                  />
                )}
                <h3 style={{ fontSize: "20px", marginTop: "30px" }}>{product.title}</h3>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "20px" }}>
                  <p style={{ fontSize: "20px", fontWeight: "600" }}>{product.price} ₽</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <button
                      style={{
                        width: "55px",
                        height: "33px",
                        background: "white",
                        border: "#454545 1px solid",
                        borderRadius: "100px",
                        cursor: "pointer",
                      }}
                      onClick={() => setEditingProduct(product)}
                    >
                      <CiEdit style={{ fontSize: "24px" }} />
                    </button>
                    <button
                      style={{
                        width: "55px",
                        height: "33px",
                        background: "#454545",
                        color: "white",
                        border: "none",
                        borderRadius: "100px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleDelete(product.id)}
                    >
                      <RiDeleteBin5Line />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default ProductList;
