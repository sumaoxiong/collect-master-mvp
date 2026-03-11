//首頁

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

//logo icon
import ytIcon from "../../img/logo/yt_icon.png";
import igIcon from "../../img/logo/ig_icon.png";
import threadIcon from "../../img/logo/thread_icon.png";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(
          `${API_BASE}/api/${API_PATH}/products`
        );
        setProducts(response.data.products);
      } catch (error) {
        console.log(error.response?.data);
      }
    };
    getProducts();
  }, []);

  //因目前API資料欄位不符合使用，所以詳細頁面暫無
  const handleView = (id) => {
    navigate(`/product/${id}`);
  };

  //category 對應 icon
  const getCategoryIcon = (category) => {
    switch (category) {
      case "youtube":
        return ytIcon;
      case "instagram":
        return igIcon;
      case "thread":
        return threadIcon;
      default:
        return "";
    }
  };

  return (
    <div className="container py-4">
      {/* 卡片區塊 */}
      <div className="row g-4">
        {products.map((product) => (
          <div className="col-md-6 col-lg-4" key={product.id}>
            <div className="ig-card h-100">
              {/* 圖片區 */}
              <div className="ig-card-media">
                <img src={product.imageUrl} alt={product.title} />

                {/* 左上 logo */}
                <div className="brand-badge">
                  <img
                    src={getCategoryIcon(product.category)}
                    alt={product.category}
                    style={{ width: "20px", height: "20px" }}
                  />
                </div>
              </div>

              {/* 內容 */}
              <div className="p-4">
                {/* tags */}
                <div className="d-flex flex-wrap gap-2 mb-3">
                  {product.imagesUrl &&
                    product.imagesUrl.map((tag, index) => (
                      <span key={index} className="card-tag">
                        {tag}
                      </span>
                    ))}
                </div>

                {/* title */}
                <h5 className="fw-bold mb-2">{product.title}</h5>

                {/* button */}
                <div className="text-end">
                  {/* <button
                    className="btn btn-link"
                    onClick={() => handleView(product.id)}
                  >
                    查看原始內容
                  </button> */}
                  <a
                    href={product.content}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-link"
                  >
                    查看原始內容
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
