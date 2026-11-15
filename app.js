
// Function to display toast message
function showToast(message) {
    let toast = document.getElementById("toast");

    if (toast == null) {
        toast = document.createElement("div");
        toast.id = "toast";
        toast.className = "toast";
        document.body.appendChild(toast);
    }

    toast.innerHTML = message;
    toast.style.display = "block";

    setTimeout(function() {
        toast.style.display = "none";
    }, 3000);
}

// Smooth scrolling to booking form
let buttons = document.querySelectorAll('a[href="#booking"]');

buttons.forEach(function(button) {
    button.addEventListener("click", function(event) {
        event.preventDefault();

        document.getElementById("booking").scrollIntoView({
            behavior: "smooth"
        });

        showToast("Opening Ticket Booking Form!");
    });
});
