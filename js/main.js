document.getElementById('formSubmit').addEventListener('submit', function(event) {
    event.preventDefault(); // Останавливаем стандартное отправление формы

    var form = event.target;
    var phoneInput = document.getElementById('exampleInputTel');
    var phoneNumber = phoneInput.value.trim();

    // Регулярное выражение для проверки польского номера телефона (только 9 цифр)
    var phoneRegex = /^\d{9}$/;

    // Проверяем, если телефон соответствует формату
    if (!phoneRegex.test(phoneNumber)) {
        phoneInput.setCustomValidity("Пожалуйста, введите корректный номер телефона (9 цифр).");
    } else {
        phoneInput.setCustomValidity(""); // Снимаем ошибку, если номер правильный
    }

    // Если форма прошла валидацию
    if (form.checkValidity()) {
        // Создаем объект с данными для отправки на сервер
        var formData = {
            name: document.getElementById('name').value,
            surname: document.getElementById('surname').value,
            email: document.getElementById('exampleInputEmail1').value,
            phone: document.getElementById('exampleInputTel').value,
            consent: document.getElementById('exampleCheck1').checked ? "true" : "false"
        };

        // Отправляем данные на сервер с использованием fetch
        fetch('http://localhost:8080/Nava__bud/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => response.json()) // Преобразуем ответ в JSON
            .then(data => {
                // Если сервер вернул успешный ответ
                if (data.success) {
                    var modal = new bootstrap.Modal(document.getElementById('exampleModal1'));
                    modal.show();
                } else {
                    // Обработка ошибок от сервера
                    alert('Произошла ошибка при отправке данных: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Ошибка:', error);
                alert('Ошибка при отправке данных. Попробуйте позже.');
            });
    } else {
        form.classList.add('was-validated');
    }
}, false);




// document.getElementById('formSubmit').addEventListener('submit', async function (event) {
//     // Stop the default form submission behavior
//      event.preventDefault();
//     // Collecting data from the form
//     const formData = {
//         name: document.getElementById("name").value,
//         surname: document.getElementById("surname").value,
//         email: document.getElementById("exampleInputEmail1").value,
//         phone: document.getElementById("exampleInputTel").value,
//         consent: document.getElementById("exampleCheck1").checked
//     };
//
//     try {
//         // Sending data to the server
//         const response = await fetch("http://localhost:8080/Nava__bud/submit/", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(formData)
//         });
//
//         // Server response processing
//         if (response.ok) {
//             const result = await response.json();
//             console.log("Ответ сервера:", result);
//         } else {
//             console.error("Ошибка сервера:", response.status, response.statusText);
//         }
//     } catch (error) {
//         console.error("Ошибка сети:", error);
//     }
// });

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