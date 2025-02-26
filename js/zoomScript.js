document.addEventListener("DOMContentLoaded", function () {
    // Get all elements with the class "zoomable-image"
    const zoomableImages = document.querySelectorAll(".zoomable-image");

    // Function to toggle the zoom effect
    function toggleZoom(event) {
        const zoomableImage = event.target;  // The clicked image element
        console.log("Clicked on the image:", zoomableImage);

        // Get the corresponding zoomed image's id from data-target attribute
        const dataTarget = zoomableImage.closest('.zoomable-image').getAttribute('data-target');
        console.log("Looking for zoomed image with id:", dataTarget);

        // Find the corresponding zoomed image by its id
        const zoomableImageOnScean = document.getElementById(dataTarget);
        console.log("Found the zoomed image:", zoomableImageOnScean);

        // Check if the zoomed image exists
        if (zoomableImageOnScean) {
            // If the zoomed image is already open, close it
            if (zoomableImageOnScean.classList.contains("zoomed")) {
                zoomableImageOnScean.classList.remove("zoomed");

                // Hide the zoomed image after a delay to allow the animation to finish
                setTimeout(() => {
                    zoomableImageOnScean.classList.add('d-none'); // Hide the image after the zoom animation
                    console.log("Hiding the zoomed image");
                }, 500); // Delay to hide after the zoom-out animation
            } else {
                // If the zoomed image is not open yet, show and zoom it
                zoomableImageOnScean.classList.remove('d-none'); // Remove the hidden class
                setTimeout(() => {
                    zoomableImageOnScean.classList.add("zoomed"); // Add the zoomed class to start zooming
                }, 0); // We use a small timeout to ensure the image appears first, then zooms
                console.log("Showing the zoomed image");
            }
        } else {
            console.warn("No corresponding zoomed image found for this image.");
        }
    }

    // Add event listeners for all zoomable images
    zoomableImages.forEach((zoomableImage) => {
        zoomableImage.addEventListener("click", toggleZoom);
    });

    // Add event listener for clicking on the zoomed image itself
    const zoomableImagesOnScean = document.querySelectorAll(".zoomable-image-on-scean");
    zoomableImagesOnScean.forEach((zoomableImageOnScean) => {
        zoomableImageOnScean.addEventListener("click", function () {
            // Close the zoomed image when clicking on it
            zoomableImageOnScean.classList.remove("zoomed");
            setTimeout(() => {
                zoomableImageOnScean.classList.add("d-none"); // Hide the zoomed image after animation
                console.log("Closed the zoomed image by clicking on it.");
            }, 500); // Delay to hide after zoom-out animation
        });
    });
});