const switchBlock = document.querySelectorAll(".switch");
const allBlocks = document.querySelector(".allBlocks");
const activeBlocks = document.querySelector(".activeBlocks");
const inactiveBlocks = document.querySelector(".inactiveBlocks");
const themeSwitch = document.querySelector(".theme-switch");
const htmlElement = document.documentElement;
const themeIcon = document.querySelector(".theme-icon");
const infoBlocks = document.querySelectorAll(".block");
const deleteDialog = document.querySelector("dialog");
const removeBtns = document.querySelectorAll(".removeBtn");
const removeDialogBtn = document.querySelector(".removeDialogBtn");
const cancelDialogBtn = document.querySelector(".cancelDialogBtn");

const savedTheme = localStorage.getItem("theme");

const all = [...infoBlocks];
let active = [];
let inactive = [];

let currentDelete;

const icons = {
    light: "Images/icon-moon.svg",
    dark: "Images/icon-sun.svg"
};


function applyTheme(theme) {
  htmlElement.setAttribute("data-theme", theme);
  themeIcon.src = icons[theme];
  localStorage.setItem("theme", theme);
}

applyTheme(savedTheme || "light");

themeSwitch.addEventListener("click", () => {
  const currentTheme = htmlElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  applyTheme(newTheme);
});



for (let i = 0; i < removeBtns.length; i++) {
    removeBtns[i].addEventListener("click", (e) => {
        currentDelete = e.target.parentElement.parentElement;
        console.log(currentDelete);

        deleteDialog.showModal();
    });

}

removeDialogBtn.addEventListener("click", () => {
    currentDelete.remove();
    deleteDialog.close();
});

cancelDialogBtn.addEventListener("click", () => {
    deleteDialog.close();
});

let currentMode = "all";

allBlocks.addEventListener("click", () => {
    currentMode = "all";
    allBlocks.classList.add("active-btn");

    activeBlocks.classList.remove("active-btn");
    inactiveBlocks.classList.remove("active-btn");

    filterCards()
});

activeBlocks.addEventListener("click", () => {
    currentMode = "active";
    activeBlocks.classList.add("active-btn");

    allBlocks.classList.remove("active-btn");
    inactiveBlocks.classList.remove("active-btn");

    filterCards()
});

inactiveBlocks.addEventListener("click", () => {
    currentMode = "inactive";
    inactiveBlocks.classList.add("active-btn");

    activeBlocks.classList.remove("active-btn");
    allBlocks.classList.remove("active-btn");

    filterCards()
});

function filterCards() {
    for (let i = 0; i < infoBlocks.length; i++) {
        if (currentMode === "all") {
            infoBlocks[i].style.display = "flex";
        } else if (infoBlocks[i].dataset.status === currentMode) {
            infoBlocks[i].style.display = "flex";
        } else {
            infoBlocks[i].style.display = "none";
        }
    }
}

console.log(currentMode);

switchBlock.forEach(sw => {
    sw.addEventListener("click", () => {
        sw.classList.toggle("inactive");
        sw.classList.toggle("active-switch");    

        const isActive = sw.classList.contains("active-switch");
        const status = isActive ? "active" : "inactive";
        
        const parentBlock = sw.closest(".block");
        
        sw.dataset.status = status;
        if (parentBlock) {
            parentBlock.dataset.status = status;
        }

        filterCards();
    });

    sw.addEventListener("keypress", (e) => {
        if (e.code === "Space" || e.code === "Enter") {
            sw.classList.toggle("inactive");
            sw.classList.toggle("active-switch");    

            const isActive = sw.classList.contains("active-switch");
            const status = isActive ? "active" : "inactive";
            
            const parentBlock = sw.closest(".block");
            
            sw.dataset.status = status;
            if (parentBlock) {
                parentBlock.dataset.status = status;
            }

            filterCards();            
        }
    });

});

switchBlock.forEach(obj => obj.setAttribute("tabindex", 0));
