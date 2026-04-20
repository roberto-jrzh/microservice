async function uploadFile() {
    const fileInput = document.getElementById("fileInput");
    const status = document.getElementById("status");
    const file = fileInput.files[0];

    if (!file) {
        status.innerText = "Please choose a JSON file first.";
        return;
    }

    try {
        // Step 1: Get presigned URL from API
        status.innerText = "Requesting upload URL...";

        const response = await fetch("https://0k1grsozn5.execute-api.eu-west-1.amazonaws.com/dev/upload-url");

        if (!response.ok) {
            throw new Error(`Failed to get upload URL: ${response.status}`);
        }

        const data = await response.json();
        const uploadURL = data.uploadUrl;

        // Step 2: Upload file to S3
        status.innerText = "Uploading file to S3...";

        await fetch(uploadURL, {
            method: "PUT",
            body: file,
            mode: "no-cors"
        });

        // Step 3: Show success
        status.innerText = "Upload complete!";

    } catch (error) {
        console.error("Upload error:", error);
        status.innerText = "Upload failed. Check console.";
    }
}
