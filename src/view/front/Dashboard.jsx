import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import c3 from "c3";
import "c3/c3.css";
import { FILTER_MAP } from "../../utils/filterMap";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

function Dashboard() {
  const [products, setProducts] = useState([]);

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

  // 統計每個第一階分類下，各二階標籤的數量
  const chartDataMap = useMemo(() => {
    const result = {};

    Object.entries(FILTER_MAP).forEach(([mainCategory, subCategories]) => {
      const counts = {};

      // 先初始化，避免沒資料時順序亂掉
      subCategories.forEach((subCategory) => {
        counts[subCategory] = 0;
      });

      products.forEach((product) => {
        const tagsArray = Array.isArray(product.imagesUrl)
          ? product.imagesUrl
          : [];

        subCategories.forEach((subCategory) => {
          if (tagsArray.includes(subCategory)) {
            counts[subCategory] += 1;
          }
        });
      });

      result[mainCategory] = counts;
    });

    return result;
  }, [products]);

  useEffect(() => {
    Object.entries(chartDataMap).forEach(([mainCategory, subCounts]) => {
      const columns = Object.entries(subCounts)
        .filter(([, count]) => count > 0)
        .map(([label, count]) => [label, count]);

      const chartId = `chart-${mainCategory}`;

      // 如果某一類完全沒有資料，也可以照樣生成空圖
      c3.generate({
        bindto: `#${chartId}`,
        data: {
          columns: columns.length > 0 ? columns : [["無資料", 1]],
          type: "donut",
        },
        donut: {
          title: mainCategory,
          label: {
            show: true,
          },
          width: 18,
        },
        legend: {
          position: "bottom",
        },
        size: {
          height: 320,
        },
        padding: {
          top: 10,
          right: 10,
          bottom: 10,
          left: 10,
        },
      });
    });
  }, [chartDataMap]);

  return (
    <div className="container py-4 py-lg-5">
      {/* 頁面標題 */}
      <section className="section-box rounded-4 p-4 p-lg-5 mb-4">
        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3">
          <div>
            <h1 className="dashboard-title mb-2">收藏儀表板</h1>
          </div>

          <div className="dashboard-summary-chip">
            共 {products.length} 筆收藏資料
          </div>
        </div>
      </section>

      {/* 圖表區 */}
      <section>
        <div className="row g-4">
          {Object.entries(chartDataMap).map(([mainCategory, subCounts]) => {
            const total = Object.values(subCounts).reduce(
              (sum, count) => sum + count,
              0
            );

            return (
              <div className="col-12 col-lg-6" key={mainCategory}>
                <div className="chart-glass-card h-100 p-3 p-lg-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      <h2 className="chart-card-title mb-1">{mainCategory}</h2>
                    </div>

                    <div className="chart-total-badge">總數 {total}</div>
                  </div>

                  <div
                    id={`chart-${mainCategory}`}
                    className="donut-chart-wrap"
                  ></div>

                  <div className="chart-tag-summary mt-3">
                    {Object.entries(subCounts)
                      .filter(([, count]) => count > 0)
                      .map(([subCategory, count]) => (
                        <span key={subCategory} className="chart-summary-chip">
                          {subCategory}：{count}
                        </span>
                      ))}

                    {total === 0 && (
                      <span className="chart-summary-chip">目前無資料</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
