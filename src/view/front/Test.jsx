import axios from "axios";
import { useEffect, useMemo, useState } from "react";

// logo icon
import ytIcon from "../../img/logo/yt_icon.png";
import igIcon from "../../img/logo/ig_icon.png";
import threadIcon from "../../img/logo/thread_icon.png";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

// 第一階只是分類導覽，真正篩選用第二階 tag
const FILTER_MAP = {
  健身: ["健身", "彈力繩", "無器械", "胸肌", "腹肌"],
  "建築&室內設計": ["室內設計", "建築設計", "園藝"],
  料理教學: ["健身餐", "微波料理", "電鍋料理", "氣炸料理", "甜點"],
  美食: ["美食", "義式", "日式", "火鍋", "素食", "buffet", "飲料"],
  地區: [
    "全台",
    "台北",
    "新北",
    "台北市",
    "宜蘭縣",
    "基隆市",
    "桃園市",
    "新竹縣市",
    "苗栗縣",
    "台中市",
    "彰化縣",
    "南投縣",
    "雲林縣",
    "嘉義縣市",
    "台南市",
    "高雄市",
    "屏東縣",
    "台東縣",
    "花蓮縣",
    "澎湖縣",
    "金門縣",
    "連江縣",
  ],
  景點: ["景點"],
  測試2: [],
  測試3: [],
  測試4: [],
  測試5: [],
  測試6: [],
  測試7: [],
  測試8: [],
  測試9: [],
  測試10: [],
  測試11: [],
  測試12: [],
  測試13: [],
  測試14: [],
};

function Home() {
  const [products, setProducts] = useState([]);

  // 搜尋
  const [keywordInput, setKeywordInput] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchType, setSearchType] = useState("all");

  // modal 內暫存的篩選
  const [activeMainCategory, setActiveMainCategory] = useState("健身");
  const [tempSelectedTags, setTempSelectedTags] = useState([]);

  // 真正套用到列表的篩選
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(
          `${API_BASE}/api/${API_PATH}/products/all`
        );
        setProducts(response.data.products);
      } catch (error) {
        console.log(error.response?.data);
      }
    };

    getProducts();
  }, []);

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

  const currentSubOptions = FILTER_MAP[activeMainCategory] || [];

  const handleSearch = () => {
    setSearchKeyword(keywordInput.trim());
  };

  const handleKeyDownSearch = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const openFilterModal = () => {
    setTempSelectedTags(selectedTags);
  };

  const handleToggleTempTag = (tag) => {
    setTempSelectedTags((prev) => {
      // 已經有這個 tag -> 取消勾選
      if (prev.includes(tag)) {
        return prev.filter((item) => item !== tag);
      }

      // 還沒選，但已達上限 5 個
      if (prev.length >= 5) {
        alert("最多只能選擇 5 個篩選條件");
        return prev;
      }

      // 正常加入
      return [...prev, tag];
    });
  };

  const handleApplyFilters = () => {
    setSelectedTags(tempSelectedTags);
  };

  const handleClearModalFilters = () => {
    setTempSelectedTags([]);
  };

  const handleClearAllFilters = () => {
    setKeywordInput("");
    setSearchKeyword("");
    setSearchType("all");
    setSelectedTags([]);
    setTempSelectedTags([]);
    setActiveMainCategory("健身");
  };

  const handleRemoveSelectedTag = (tag) => {
    setSelectedTags((prev) => prev.filter((item) => item !== tag));
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const tagsArray = Array.isArray(product.imagesUrl)
        ? product.imagesUrl
        : [];

      const titleText = product.title?.toLowerCase() || "";
      const descriptionText = product.description?.toLowerCase() || "";
      const tagsText = tagsArray.join(" ").toLowerCase();
      const keyword = searchKeyword.toLowerCase();

      let matchesSearch = true;
      if (keyword) {
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

      let matchesSelectedTags = true;
      if (selectedTags.length > 0) {
        matchesSelectedTags = selectedTags.every((tag) =>
          tagsArray.includes(tag)
        );
      }

      return matchesSearch && matchesSelectedTags;
    });
  }, [products, searchKeyword, searchType, selectedTags]);

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
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              onKeyDown={handleKeyDownSearch}
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
            <button
              type="button"
              className="btn search-btn w-100 fw-bold"
              onClick={handleSearch}
            >
              搜尋
            </button>
          </div>
        </div>
      </div>

      {/* 簡化後篩選區塊 */}
      <div className="section-box rounded-4 p-3 p-lg-4 mb-4">
        <div className="d-flex flex-column gap-3">
          <div className="d-flex flex-column flex-lg-row align-items-lg-center gap-3 gap-lg-4">
            <div className="filter-label fs-5">篩選</div>

            <div className="d-flex flex-wrap gap-2 ms-lg-auto">
              <button
                type="button"
                className="btn filter-chip px-4 py-2 fw-bold"
                data-bs-toggle="modal"
                data-bs-target="#advancedFilterModal"
                onClick={openFilterModal}
              >
                所有篩選條件
              </button>

              <button
                type="button"
                className="btn filter-chip px-4 py-2 fw-bold"
                onClick={handleClearAllFilters}
              >
                清除全部
              </button>
            </div>
          </div>

          {selectedTags.length > 0 && (
            <div className="d-flex flex-wrap gap-2">
              {selectedTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className="selected-chip"
                  onClick={() => handleRemoveSelectedTag(tag)}
                >
                  {tag} ×
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 卡片區塊 */}
      <div className="row g-3">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="col-4" key={product.id}>
              <div className="ig-card h-100">
                <div className="ig-card-media">
                  <img src={product.imageUrl} alt={product.title} />

                  <div className="brand-badge">
                    {getCategoryIcon(product.category) ? (
                      <img
                        src={getCategoryIcon(product.category)}
                        alt={product.category}
                        className="brand-icon"
                      />
                    ) : (
                      <span>{product.category}</span>
                    )}
                  </div>
                </div>

                <div className="p-2 p-md-3 p-lg-4">
                  <div className="d-flex flex-wrap gap-2 mb-2 mb-lg-3">
                    {Array.isArray(product.imagesUrl) &&
                      product.imagesUrl.map((tag, index) => (
                        <span key={index} className="card-tag">
                          {tag}
                        </span>
                      ))}
                  </div>

                  <h5 className="fw-bold mb-2 card-title-custom">
                    {product.title}
                  </h5>

                  <p className="card-description mb-2 mb-lg-3">
                    {product.description}
                  </p>

                  <div className="text-end">
                    <a
                      href={product.content}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-link card-link-btn"
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

      {/* Bootstrap 5 Modal */}
      <div
        className="modal fade"
        id="advancedFilterModal"
        tabIndex="-1"
        aria-labelledby="advancedFilterModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content glass-modal">
            <div className="modal-header border-0 pb-2">
              <h5 className="modal-title fw-bold" id="advancedFilterModalLabel">
                篩選條件
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body pt-2">
              <div className="mb-3">
                <div className="all-filter-text mb-2">
                  已選擇：{tempSelectedTags.length} / 5 項
                </div>

                {tempSelectedTags.length > 0 && (
                  <div className="d-flex flex-wrap gap-2">
                    {tempSelectedTags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        className="selected-chip"
                        onClick={() => handleToggleTempTag(tag)}
                      >
                        {tag} ×
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="filter-panel-layout">
                {/* 左側第一階分類 */}
                <div className="filter-main-list">
                  {Object.keys(FILTER_MAP).map((mainCategory) => (
                    <button
                      key={mainCategory}
                      type="button"
                      className={`filter-main-item ${
                        activeMainCategory === mainCategory ? "active" : ""
                      }`}
                      onClick={() => setActiveMainCategory(mainCategory)}
                    >
                      <span>{mainCategory}</span>
                      <span>›</span>
                    </button>
                  ))}
                </div>

                {/* 右側第二階複選 */}
                <div className="filter-sub-list">
                  <div className="filter-sub-header">
                    <span>{activeMainCategory}</span>
                    <span>可複選</span>
                  </div>

                  <div className="filter-sub-options">
                    {currentSubOptions.map((tag) => {
                      const isChecked = tempSelectedTags.includes(tag);
                      const isDisabled =
                        !isChecked && tempSelectedTags.length >= 5;

                      return (
                        <label
                          key={tag}
                          className={`filter-check-item ${
                            isDisabled ? "is-disabled" : ""
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            disabled={isDisabled}
                            onChange={() => handleToggleTempTag(tag)}
                          />
                          <span>{tag}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer border-0 pt-2">
              <button
                type="button"
                className="btn filter-chip fw-bold px-4"
                onClick={handleClearModalFilters}
              >
                清除進階
              </button>

              <button
                type="button"
                className="btn search-btn fw-bold px-4"
                data-bs-dismiss="modal"
                onClick={handleApplyFilters}
              >
                確定
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
