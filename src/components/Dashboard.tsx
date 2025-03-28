import { useState } from "react";
import ProductList from "./ProductList";
import CreateProduct from "./CreateProduct";
import { MdDashboardCustomize } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { IoIosArrowRoundBack } from "react-icons/io";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<"products" | "create">("products");

  return (
    <div style={{ display: "flex", gap: "32px" }} >
      <div
        style={{
          backgroundColor: "#454545",
          height: "100vh",
          display: "block",
          width: "350px",
          padding: "1rem",
          marginBottom: "1rem",
        }}
        className="gap-9 border-b"
      >
        <h2 style={{marginBottom: "20px", color: "white", display: "flex", alignItems: "center", gap: "10px"}}><IoIosArrowRoundBack style={{fontSize: "30px"}}/> Admin Dashboard</h2>
        <button
          style={{
            padding: "0.5rem 1rem",
            background: activeTab === "create" ? "#6a6a6a" : "transparent",
            cursor: "pointer",
            width: "300px",
            color: "white",
            border: "none",
            borderRadius: "8px",
            display: "flex",
            gap: "5px",
            alignItems: "center",
          }}
          onClick={() => setActiveTab("create")}
        >
          <MdDashboardCustomize style={{fontSize: "20px"}} />

          Yangi mahsulot qo‘shish
        </button>

        <button
          style={{
            padding: "0.5rem 1rem",
            background: activeTab === "products" ? "#6a6a6a" : "transparent",
            cursor: "pointer",
            width: "300px",
            color: "white",
            border: "none",
            borderRadius: "8px",
            display: "flex",
            gap: "5px",
            alignItems: "center",
          }}
          onClick={() => setActiveTab("products")}
        >
          <CiEdit style={{fontSize: "20px"}}/>
          Mahsulotlar
        </button>
      </div>

      {activeTab === "products" ? <ProductList /> : <CreateProduct product={null} onCancel={() => setActiveTab("products")} />}

    </div>
  );
};

export default Dashboard;
