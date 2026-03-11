import axios from "axios";
import { useEffect, useMemo, useState } from "react";

// logo icon
import ytIcon from "../../img/logo/yt_icon.png";
import igIcon from "../../img/logo/ig_icon.png";
import threadIcon from "../../img/logo/thread_icon.png";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

function Test() {
  const [products, setProducts] = useState([]);

  // 搜尋相關 state
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchType, setSearchType] = useState("all");
  const [activeFilter, setActiveFilter] = useState("全部");

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

  // category 對應 icon
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

  // 篩選按鈕清單
  const filterOptions = ["全部", "料理教學", "嘉義", "健身"];

  // 搜尋 + 篩選後的資料
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const keyword = searchKeyword.trim().toLowerCase();

      // tags 陣列
      const tagsArray = Array.isArray(product.imagesUrl)
        ? product.imagesUrl
        : [];

      // 先處理搜尋
      let matchesSearch = true;

      if (keyword) {
        const titleText = product.title?.toLowerCase() || "";
        const descriptionText = product.description?.toLowerCase() || "";
        const tagsText = tagsArray.join(" ").toLowerCase();

        if (searchType === "title") {
          matchesSearch = titleText.includes(keyword);
        } else if (searchType === "tag") {
          matchesSearch = tagsText.includes(keyword);
        } else {
          matchesSearch =
            titleText.includes(keyword) ||
            descriptionText.includes(keyword) ||
            tagsText.includes(keyword);
        }
      }

      // 再處理篩選
      let matchesFilter = true;

      if (activeFilter !== "全部") {
        matchesFilter = tagsArray.includes(activeFilter);
      }

      return matchesSearch && matchesFilter;
    });
  }, [products, searchKeyword, searchType, activeFilter]);

  return (
    <div className="container py-4">
      {/* 搜尋區塊 */}
      <div className="section-box rounded-4 p-3 p-lg-4 mb-4">
        <div className="row g-3 justify-content-center">
          <div className="col-12 col-lg-5">
            <input
              type="text"
              className="form-control form-control-lg search-input"
              placeholder="關鍵字(例如：雞肉飯、飲料店)"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
          </div>

          <div className="col-12 col-md-6 col-lg-3">
            <select
              className="form-select form-select-lg search-select"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
            >
              <option value="all">標題 / 標籤</option>
              <option value="title">標題</option>
              <option value="tag">標籤</option>
            </select>
          </div>

          <div className="col-12 col-md-6 col-lg-2">
            <button type="button" className="btn search-btn w-100 fw-bold">
              搜尋
            </button>
          </div>
        </div>
      </div>

      {/* 篩選區塊 */}
      <div className="section-box rounded-4 p-3 p-lg-4 mb-4">
        <div className="d-flex flex-column flex-lg-row align-items-lg-center gap-3 gap-lg-4">
          <div className="filter-label fs-5">篩選</div>

          <div className="d-flex flex-wrap gap-3 flex-grow-1">
            {filterOptions.map((filterItem) => (
              <button
                key={filterItem}
                type="button"
                className={`btn filter-chip px-4 py-2 fw-bold ${
                  activeFilter === filterItem ? "active-filter" : ""
                }`}
                onClick={() => setActiveFilter(filterItem)}
              >
                {filterItem}
              </button>
            ))}
          </div>

          <div className="all-filter-text">目前篩選：{activeFilter}</div>
        </div>
      </div>

      {/* 卡片區塊 */}
      <div className="row g-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="col-md-6 col-lg-4" key={product.id}>
              <div className="ig-card h-100">
                {/* 圖片 */}
                <div className="ig-card-media">
                  <img src={product.imageUrl} alt={product.title} />

                  {/* 左上 logo */}
                  <div className="brand-badge">
                    <img
                      src={getCategoryIcon(product.category)}
                      alt={product.category}
                      className="brand-icon"
                    />
                  </div>
                </div>

                {/* 內容 */}
                <div className="p-4">
                  {/* tags */}
                  <div className="d-flex flex-wrap gap-2 mb-3">
                    {Array.isArray(product.imagesUrl) &&
                      product.imagesUrl.map((tag, index) => (
                        <span key={index} className="card-tag">
                          {tag}
                        </span>
                      ))}
                  </div>

                  {/* title */}
                  <h5 className="fw-bold mb-2">{product.title}</h5>

                  {/* description */}
                  <p className="card-description mb-3">{product.description}</p>

                  {/* 外部連結 */}
                  <div className="text-end">
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
          ))
        ) : (
          <div className="col-12">
            <div className="section-box rounded-4 p-4 text-center">
              <h5 className="fw-bold mb-2">查無符合條件的內容</h5>
              <p className="mb-0 text-secondary">請更換搜尋關鍵字或篩選條件</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Test;
