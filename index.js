const apiUrl = "https://YOUR-WORKER-URL.workers.dev"; // Replace with your actual Worker API URL

async function loadTopics() {
    try {
        const res = await fetch(apiUrl);
        const data = await res.json();

        const topicsContainer = document.getElementById("topics");
        topicsContainer.innerHTML = "";

        data.forEach(item => {
            const div = document.createElement("div");
            div.className = "topic";
            div.innerHTML = `<h2>${item.name}</h2><p>${item.description}</p>`;
            topicsContainer.appendChild(div);
        });
    } catch (error) {
        console.error("Error fetching API:", error);
    }
}

loadTopics();
