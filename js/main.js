(() => {
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')
  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }
      form.classList.add('was-validated')
    }, false)
  })
})()

document.getElementById('formSubmit').addEventListener('submit', async function (event) {
    // Остановить стандартное поведение отправки формы
     event.preventDefault();
    // Сбор данных из формы
    const formData = {
        name: document.getElementById("name").value,
        surname: document.getElementById("surname").value,
        email: document.getElementById("exampleInputEmail1").value,
        phone: document.getElementById("exampleInputTel").value,
        consent: document.getElementById("exampleCheck1").checked
    };

    // Вывод данных в консоль

    try {
        // Отправка данных на сервер
        const response = await fetch("http://localhost:8090/demo_war_exploded/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        // Обработка ответа сервера
        if (response.ok) {
            const result = await response.json();
            console.log("Ответ сервера:", result);
        } else {
            console.error("Ошибка сервера:", response.status, response.statusText);
        }
    } catch (error) {
        console.error("Ошибка сети:", error);
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const zoomableImage = document.getElementById("zoomable-image");
    const zoomableImageOnScean = document.getElementById("zoomable-image-on-scean");

    function toggleZoom() {
        zoomableImageOnScean.classList.toggle("zoomed");
        if (zoomableImageOnScean.classList.contains("zoomed")) {
            zoomableImageOnScean.style.display = "block"; // show element
        } else {
            setTimeout(() => {
                zoomableImageOnScean.style.display = "none"; // hide element
            }, 500);
        }
    }
    zoomableImage.addEventListener("click", toggleZoom);
    zoomableImageOnScean.addEventListener("click", toggleZoom);
    for (let i = 0; i < zoomableImage.length; i++) {
        z
    }
});


