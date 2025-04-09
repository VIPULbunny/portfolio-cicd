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

    // Lambda API Gateway Integration
    const fetchBtn = document.getElementById("fetchBtn");
    const output = document.getElementById("output");
    const closeBtn = document.getElementById("closeBtn");

    if (fetchBtn && output) {
        fetchBtn.addEventListener("click", async () => {
            output.textContent = "Sending...";
            closeBtn.style.display = "none";

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
                output.textContent = data.message || JSON.stringify(data, null, 2);
                closeBtn.style.display = "inline-block"; // Show close button
            } catch (error) {
                output.textContent = `Error: ${error.message}`;
                closeBtn.style.display = "inline-block"; // Show close button on error too
                console.error(error);
            }
        });
    }

    if (closeBtn && output) {
        closeBtn.addEventListener("click", () => {
            output.textContent = "Click the button to send data to Lambda";
            closeBtn.style.display = "none";
        });
    }

})();
