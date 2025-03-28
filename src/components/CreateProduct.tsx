import { useState, useEffect } from "react";
import { useCreateProductMutation, useUpdateProductMutation } from "../redux/api";

interface Product {
  id?: string;
  title: string;
  desc: string;
  category: string;
  price: number;
  image: string;
}

interface CreateProductProps {
  product?: Product | null;
  onCancel: () => void;
}

const CreateProduct = ({ product, onCancel }: CreateProductProps) => {
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [formData, setFormData] = useState<Product>({
    title: "",
    desc: "",
    category: "",
    price: 0,
    image: "",
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "price" ? Number(value) || 0 : value,
    }));
  };

  const handleSave = async () => {
    if (!formData.title || !formData.desc || !formData.category || !formData.price || !formData.image) return;

    if (product?.id) {
      await updateProduct({ id: product.id, ...formData });
    } else {
      await createProduct(formData);
    }

    setFormData({ title: "", desc: "", category: "", price: 0, image: "" });
    onCancel();
  };

  return (
    <div>
      <h2 style={{ marginTop: "15px", color: "#454545" }}>
        {product ? "Edit product" : "Create product"}
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "600px", marginTop: "30px" }}>
        <label style={{ color: "#4C4C4C", fontSize: "16px" }} htmlFor="title">Title</label>
        <input style={{ background: "#F8F8F8", borderRadius: "10px", border: "none", height: "58px", textIndent: "10px" }} type="text" name="title" value={formData.title} onChange={handleChange} />

        <label style={{ color: "#4C4C4C", fontSize: "16px" }} htmlFor="price">Price</label>
        <input style={{ background: "#F8F8F8", borderRadius: "10px", border: "none", height: "58px", textIndent: "10px" }} type="number" name="price" value={formData.price || ""} onChange={handleChange} />

        <label style={{ color: "#4C4C4C", fontSize: "16px" }} htmlFor="image">Image URL</label>
        <input style={{ background: "#F8F8F8", borderRadius: "10px", border: "none", height: "58px", textIndent: "10px" }} type="text" name="image" value={formData.image || ""} onChange={handleChange} />

        <label style={{ color: "#4C4C4C", fontSize: "16px" }} htmlFor="category">Category</label>
        <input style={{ background: "#F8F8F8", borderRadius: "10px", border: "none", height: "58px", textIndent: "10px" }} type="text" name="category" value={formData.category} onChange={handleChange} />

        <label style={{ color: "#4C4C4C", fontSize: "16px" }} htmlFor="desc">Description</label>
        <input style={{ background: "#F8F8F8", borderRadius: "10px", border: "none", height: "58px", textIndent: "10px" }} type="text" name="desc" value={formData.desc} onChange={handleChange} />
      </div>

      <button style={{ width: "180px", height: "46px", background: "#454545", color: "white", border: "none", borderRadius: "5px", marginTop: "20px" }} onClick={handleSave}>
        {product ? "Update" : "Create"}
      </button>

      <button style={{ width: "180px", height: "46px", background: "gray", color: "white", border: "none", borderRadius: "5px", marginTop: "20px", marginLeft: "10px" }} onClick={onCancel}>
        Cancel
      </button>
    </div>
  );
};

export default CreateProduct;
