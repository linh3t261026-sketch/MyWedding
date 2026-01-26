
const API_URL = "https://script.google.com/macros/s/AKfycbwQNc18uc95u-QzgtmwER3UAFmAXzAHL_2RFkesjoLOrpGBrWdvW77IE3nlVDrM64F7Sg/exec";

const ROWS_PER_PAGE = 10;
let currentPage = 1;
let allData = [];
let filteredData = [];

const tbody = document.getElementById("tbody");
const loading = document.getElementById("loading");
const table = document.getElementById("table");
const pagination = document.getElementById("pagination");

function renderTable(page) {
    tbody.innerHTML = "";

    const start = (page - 1) * ROWS_PER_PAGE;
    const end = start + ROWS_PER_PAGE;
    const pageData = filteredData.slice(start, end);

    pageData.forEach(row => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${row["Time"] || ""}</td>
            <td>${row["Name"] || ""}</td>
            <td>${row["Phone"] || ""}</td>
            <td>${row["Tham gia"] || ""}</td>
            <td>${row["Khách của ai"] || ""}</td>
            <td>${row["Tham gia nhà nào"] || ""}</td>
            <td>${row["Đi mấy người"] || ""}</td>
            <td>${row["Lời chúc"] || ""}</td>
        `;
        tbody.appendChild(tr);
    });
}

function renderPagination() {
    pagination.innerHTML = "";

    const totalPages = Math.ceil(filteredData.length / ROWS_PER_PAGE);

    const prevBtn = document.createElement("button");
    prevBtn.textContent = "← Trước";
    prevBtn.disabled = currentPage === 1;
    prevBtn.onclick = () => {
        currentPage--;
        update();
    };
    pagination.appendChild(prevBtn);

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        if (i === currentPage) btn.classList.add("active");
        btn.onclick = () => {
            currentPage = i;
            update();
        };
        pagination.appendChild(btn);
    }

    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Sau →";
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.onclick = () => {
        currentPage++;
        update();
    };
    pagination.appendChild(nextBtn);
}

function update() {
    renderTable(currentPage);
    renderPagination();
}

fetch(API_URL)
    .then(res => res.json())
    .then(data => {
        allData = data.reverse(); // mới nhất lên đầu
        filteredData = allData;
        loading.style.display = "none";
        table.style.display = "table";
        update();
    })
    .catch(err => {
        loading.innerText = "❌ Không tải được dữ liệu";
        console.error(err);
    });
    document.querySelectorAll(".filter-bar button").forEach(btn => {
    btn.addEventListener("click", () => {
        document
          .querySelectorAll(".filter-bar button")
          .forEach(b => b.classList.remove("active"));

        btn.classList.add("active");

        const filter = btn.dataset.filter;

        if (filter === "all") {
            filteredData = allData;
        } else {
            filteredData = allData.filter(
                row => row["Tham gia"] === filter
            );
        }

        currentPage = 1;
        update();
    });
});
