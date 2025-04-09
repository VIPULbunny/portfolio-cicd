(function () {
    // Section switching logic
    [...document.querySelectorAll(".control")].forEach(button => {
        button.addEventListener("click", function () {
            document.querySelector(".active-btn").classList.remove("active-btn");
            this.classList.add("active-btn");
            document.querySelector(".active").classList.remove("active");
            document.getElementById(button.dataset.id).classList.add("active");
        });
    });

    // Theme toggle
    document.querySelector(".theme-btn").addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    });

    // Lambda API Gateway Integration with modal
    const fetchBtn = document.getElementById("fetchBtn");
    const complimentModal = document.getElementById("complimentModal");
    const complimentText = document.getElementById("complimentText");
    const closeModal = document.getElementById("closeModal");

    if (fetchBtn && complimentModal && complimentText && closeModal) {
        fetchBtn.addEventListener("click", async () => {
            complimentText.textContent = "Loading...";
            complimentModal.style.display = "block";

            try {
                const response = await fetch("https://j7gzscsoff.execute-api.us-east-1.amazonaws.com/dev/contact", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: "Vipul",
                        email: "vipul@example.com",
                        message: "Hello from portfolio site!"
                    })
                });

                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

                const data = await response.json();
                complimentText.textContent = data.message || "You're awesome!";
            } catch (error) {
                complimentText.textContent = `Error: ${error.message}`;
                console.error(error);
            }
        });

        closeModal.addEventListener("click", () => {
            complimentModal.style.display = "none";
        });

        window.addEventListener("click", (e) => {
            if (e.target === complimentModal) {
                complimentModal.style.display = "none";
            }
        });
    }
})();
