const uploadForm = document.getElementById("uploadForm");




uploadForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const fileInput = document.getElementById("file");
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append("file", file);

    console.log(file)

    try {
        const response = await fetch('http://localhost:5002/api/media/upload', {
            method: 'POST',
            body: formData,
        });
        // Check if the response status is OK (200-299)
        if (response.ok) {
            const data = await response.json();
            console.log("Data from backend:", data); // Log the data for debugging
            alert("Media uploaded successfully: " + data.media.url);
        } else {
            // Handle server error or bad request
            const errorData = await response.json();
            console.error("Server Error:", errorData);
            alert("Error uploading media: " + errorData.message || "Unknown error");
        }
    } catch (error) {
        alert("Error uploading media")
        console.error(error);

    }
    
});