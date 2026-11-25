let toastTimer = null;

// Function to display toast message
function showToast(message) {
    let toast = document.getElementById("toast");

    if (toast == null) {
        toast = document.createElement("div");
        toast.id = "toast";
        toast.className = "toast";
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.style.display = "block";

    if (toastTimer) {
        clearTimeout(toastTimer);
    }

    toastTimer = setTimeout(function() {
        toast.style.display = "none";
    }, 3000);
}


// ACTIVITY 8: RESPONSIVE NAVIGATION HAMBURGER MENU

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function() {
        const isOpen = navLinks.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach(function(link) {
        link.addEventListener("click", function() {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}


// ACTIVITY 8: MATCH FILTERING AND GRID/LIST VIEW TOGGLE

const teamFilter = document.getElementById("teamFilter");
const matchGrid = document.getElementById("matchGrid");
const matchCards = document.querySelectorAll(".match-card");
const gridViewBtn = document.getElementById("gridViewBtn");
const listViewBtn = document.getElementById("listViewBtn");

if (teamFilter && matchCards.length > 0) {
    teamFilter.addEventListener("change", function() {
        const selectedTeam = teamFilter.value;

        matchCards.forEach(function(card) {
            const teams = (card.dataset.teams || "").split(" ");
            const isMatch = selectedTeam === "ALL" || teams.includes(selectedTeam);
            card.style.display = isMatch ? "" : "none";
        });

        if (selectedTeam === "ALL") {
            showToast("Showing all matches");
        } else {
            showToast("Filtered matches for " + selectedTeam);
        }
    });
}

if (matchGrid && gridViewBtn && listViewBtn) {
    gridViewBtn.addEventListener("click", function() {
        matchGrid.classList.remove("list-view");
        gridViewBtn.classList.add("active");
        listViewBtn.classList.remove("active");
        gridViewBtn.setAttribute("aria-pressed", "true");
        listViewBtn.setAttribute("aria-pressed", "false");
    });

    listViewBtn.addEventListener("click", function() {
        matchGrid.classList.add("list-view");
        listViewBtn.classList.add("active");
        gridViewBtn.classList.remove("active");
        listViewBtn.setAttribute("aria-pressed", "true");
        gridViewBtn.setAttribute("aria-pressed", "false");
    });
}


// Smooth scrolling to booking form (and pre-selecting match when clicked from a match card)
const scrollButtons = document.querySelectorAll('a[href="#booking"]');

scrollButtons.forEach(function(button) {
    button.addEventListener("click", function(event) {
        const bookingSection = document.getElementById("booking");

        if (bookingSection) {
            event.preventDefault();

            const chosenMatch = button.dataset.match;
            if (chosenMatch && matchSelect) {
                matchSelect.value = chosenMatch;
                updateSummary(false);
            }

            bookingSection.scrollIntoView({
                behavior: "smooth"
            });

            showToast("Opening Ticket Booking Form!");
        }
    });
});


// ACTIVITY 7: LIVE BOOKING SUMMARY

const matchSelect = document.getElementById("match");
const standSelect = document.getElementById("stand");
const quantityInput = document.getElementById("quantity");

const summaryMatch = document.getElementById("summaryMatch");
const summaryStand = document.getElementById("summaryStand");
const summaryPrice = document.getElementById("summaryPrice");
const summaryQuantity = document.getElementById("summaryQuantity");
const totalPrice = document.getElementById("totalPrice");

const bookingForm = document.querySelector("#bookingForm");
const summaryCard = document.querySelector(".summary-card");


// Ticket prices per match and stand category
const ticketPrices = {
    "CSK vs MI": {
        General: 800,
        Premium: 2000,
        VIP: 5000
    },
    "RCB vs KKR": {
        General: 1000,
        Premium: 2500,
        VIP: 6000
    },
    "RR vs SRH": {
        General: 750,
        Premium: 1800,
        VIP: 4500
    },
    "MI vs RCB": {
        General: 1200,
        Premium: 3000,
        VIP: 7000
    }
};


// Function to update booking summary live
function updateSummary(notify = true) {
    if (!matchSelect || !standSelect || !quantityInput) {
        return;
    }

    const match = matchSelect.value;
    const stand = standSelect.value;
    const quantity = Number(quantityInput.value);

    // Display selected match and stand immediately
    if (summaryMatch) {
        summaryMatch.textContent = match || "Not Selected";
    }
    if (summaryStand) {
        summaryStand.textContent = stand || "Not Selected";
    }

    // Validate quantity
    if (
        quantityInput.value === "" ||
        !Number.isInteger(quantity) ||
        quantity < 1 ||
        quantity > 10
    ) {
        if (summaryQuantity) summaryQuantity.textContent = "Invalid";
        if (summaryPrice) summaryPrice.textContent = "0";
        if (totalPrice) totalPrice.textContent = "0";

        if (notify) {
            showToast("Please enter a valid ticket quantity (1-10).");
        }
        return;
    }

    // Calculate ticket price and total
    let price = 0;
    const matchPrices = ticketPrices[match];

    if (matchPrices && stand && matchPrices[stand] !== undefined) {
        price = matchPrices[stand];
    }

    const total = price * quantity;

    // Update summary card
    if (summaryPrice) summaryPrice.textContent = price;
    if (summaryQuantity) summaryQuantity.textContent = quantity;
    if (totalPrice) totalPrice.textContent = total;

    if (summaryCard) {
        summaryCard.classList.add("updated");
    }

    // Confirm summary update via toast notification
    if (notify) {
        showToast("Booking Summary Updated!");
    }
}


// Add change event listeners to selectors and quantity input
if (matchSelect && standSelect && quantityInput) {
    matchSelect.addEventListener("change", function() {
        updateSummary(true);
    });

    standSelect.addEventListener("change", function() {
        updateSummary(true);
    });

    quantityInput.addEventListener("change", function() {
        updateSummary(true);
    });
}


// Handle form submission and reset
if (bookingForm) {
    bookingForm.addEventListener("submit", function(event) {
        event.preventDefault();
        updateSummary(false);
        showToast("Booking Details Confirmed!");
    });

    bookingForm.addEventListener("reset", function() {
        setTimeout(function() {
            if (summaryMatch) summaryMatch.textContent = "Not Selected";
            if (summaryStand) summaryStand.textContent = "Not Selected";
            if (summaryPrice) summaryPrice.textContent = "0";
            if (summaryQuantity) summaryQuantity.textContent = "0";
            if (totalPrice) totalPrice.textContent = "0";
            if (summaryCard) summaryCard.classList.remove("updated");
        }, 0);
    });
}
