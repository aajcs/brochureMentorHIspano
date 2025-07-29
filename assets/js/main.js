// JS personalizado extraído de index.html
const navButtons = document.querySelectorAll(".nav-central-btn");
const contentPopup = document.getElementById("content-popup");
const popupOverlay = document.getElementById("popup-overlay");
const closePopupButton = document.getElementById("close-popup");
const popupContentWrapper = document.getElementById("popup-content-wrapper");
let charts = {};
const carouselImagesContainer = document.getElementById("carousel-images");
const carouselPrevButton = document.getElementById("carousel-prev");
const carouselNextButton = document.getElementById("carousel-next");
const images = carouselImagesContainer.querySelectorAll("img");
let currentIndex = 0;

function showImage(index) {
  images.forEach((img, i) => {
    img.classList.remove("visible", "prev", "next");
    if (i === index) {
      img.classList.add("visible");
    } else if (i === (index - 1 + images.length) % images.length) {
      img.classList.add("prev");
    } else if (i === (index + 1) % images.length) {
      img.classList.add("next");
    }
  });
  currentIndex = index;
}

carouselPrevButton.addEventListener("click", () => {
  showImage((currentIndex - 1 + images.length) % images.length);
});

carouselNextButton.addEventListener("click", () => {
  showImage((currentIndex + 1) % images.length);
});

showImage(currentIndex);

const toggleTextButton = document.getElementById("toggle-text-button");
const additionalTextContainer = document.getElementById(
  "additional-text-container"
);
const toggleArrow = toggleTextButton.querySelector("svg");
additionalTextContainer.classList.remove("active");
toggleArrow.style.transform = "rotate(0deg)";
toggleTextButton.addEventListener("click", () => {
  if (additionalTextContainer.classList.contains("active")) {
    additionalTextContainer.classList.remove("active");
    toggleArrow.style.transform = "rotate(0deg)";
  } else {
    additionalTextContainer.classList.add("active");
    toggleArrow.style.transform = "rotate(180deg)";
  }
});

function initializeChart(id, config) {
  if (charts[id]) {
    charts[id].destroy();
  }
  const ctx = document.getElementById(id);
  if (ctx) {
    charts[id] = new Chart(ctx.getContext("2d"), config);
  }
}

const tooltipTitleCallback = {
  plugins: {
    tooltip: {
      callbacks: {
        title: function (tooltipItems) {
          const item = tooltipItems[0];
          let label = item.chart.data.labels[item.dataIndex];
          return Array.isArray(label) ? label.join(" ") : label;
        },
        label: function (context) {
          let label = context.dataset.label || "";
          if (label) {
            label += ": ";
          }
          if (context.parsed.y !== null) {
            label += context.parsed.y + "%";
          } else if (context.parsed) {
            label += context.parsed + "%";
          }
          return label;
        },
      },
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      titleFont: { size: 16, weight: "bold" },
      bodyFont: { size: 14 },
      padding: 10,
      cornerRadius: 8,
    },
  },
};

const chartConfigs = {
  aiFocusChart: {
    type: "doughnut",
    data: {
      labels: [
        "Lecciones Personalizadas",
        "Evaluaciones Adaptativas",
        "Desarrollo de Habilidades",
      ],
      datasets: [
        {
          data: [50, 30, 20],
          backgroundColor: ["#1E3A8A", "#3B82F6", "#10B981"],
          borderColor: "#ffffff",
          borderWidth: 5,
          hoverOffset: 12,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: tooltipTitleCallback.plugins.tooltip,
        legend: {
          position: "bottom",
          labels: {
            font: { size: 14, family: "Inter" },
            color: "#333",
          },
        },
      },
      cutout: "70%",
      animation: {
        animateRotate: true,
        animateScale: true,
      },
    },
  },
  adminTimeChart: {
    type: "bar",
    data: {
      labels: ["Tiempo en Tareas Administrativas"],
      datasets: [
        {
          label: "Sin Mentor Hispano",
          data: [100],
          backgroundColor: "#3B82F6",
          borderRadius: 10,
          barThickness: 50,
        },
        {
          label: "Con Mentor Hispano",
          data: [40],
          backgroundColor: "#F59E0B",
          borderRadius: 10,
          barThickness: 50,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: {
            callback: (v) => v + "%",
            font: { size: 12, family: "Inter" },
            color: "#555",
          },
          grid: { display: false },
        },
        x: {
          ticks: { display: false },
          grid: { display: false },
        },
      },
      plugins: {
        tooltip: tooltipTitleCallback.plugins.tooltip,
        legend: {
          position: "bottom",
          labels: {
            font: { size: 14, family: "Inter" },
            color: "#333",
          },
        },
      },
      animation: {
        duration: 1200,
        easing: "easeOutQuart",
      },
    },
  },
  studentEngagementChart: {
    type: "line",
    data: {
      labels: ["Inicio", "Mes 1", "Mes 2", "Mes 3", "Mes 4", "Final"],
      datasets: [
        {
          label: "Nivel de Participación del Estudiante",
          data: [50, 60, 75, 85, 90, 98],
          fill: true,
          backgroundColor: "rgba(16, 185, 129, 0.25)",
          borderColor: "#10B981",
          borderWidth: 3,
          tension: 0.4,
          pointBackgroundColor: "#10B981",
          pointBorderColor: "#fff",
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: {
            callback: (v) => v + "%",
            font: { size: 12, family: "Inter" },
            color: "#555",
          },
          grid: { color: "#e0e0e0" },
        },
        x: {
          ticks: {
            font: { size: 12, family: "Inter" },
            color: "#555",
          },
          grid: { display: false },
        },
      },
      plugins: {
        tooltip: tooltipTitleCallback.plugins.tooltip,
        legend: { display: false },
      },
      animation: {
        duration: 1500,
        easing: "easeOutBounce",
      },
    },
  },
};

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetId = button.dataset.target;
    const targetPanel = document.getElementById(targetId);
    navButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    Array.from(popupContentWrapper.children).forEach((panel) => {
      panel.classList.add("hidden");
      panel.classList.remove("fadeInScale");
    });
    if (targetPanel) {
      targetPanel.classList.remove("hidden");
      contentPopup.classList.add("open");
      popupOverlay.classList.add("open");
      const chartId = Object.keys(chartConfigs).find((key) =>
        targetId.includes(key.replace("Chart", ""))
      );
      if (chartId) {
        initializeChart(chartId, chartConfigs[chartId]);
      }
    }
  });
});

function closePopup() {
  contentPopup.classList.remove("open");
  popupOverlay.classList.remove("open");
  setTimeout(() => {
    Array.from(popupContentWrapper.children).forEach((panel) => {
      panel.classList.add("hidden");
    });
    navButtons.forEach((btn) => btn.classList.remove("active"));
  }, 300);
}

closePopupButton.addEventListener("click", closePopup);
popupOverlay.addEventListener("click", closePopup);

window.addEventListener("resize", () => {
  for (const id in charts) {
    if (charts[id]) {
      charts[id].destroy();
      const config = chartConfigs[id];
      if (config) {
        initializeChart(id, config);
      }
    }
  }
});
