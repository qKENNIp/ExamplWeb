document.getElementById('formSubmit').addEventListener('submit', function(event) {
    event.preventDefault(); // Останавливаем стандартное отправление формы

    var form = event.target;
    var phoneInput = document.getElementById('exampleInputTel');
    var phoneNumber = phoneInput.value.trim();

    // Регулярное выражение для проверки польского номера телефона (только 9 цифр)
    var phoneRegex = /^\d{9}$/;

    // Проверяем, если телефон соответствует формату
    if (!phoneRegex.test(phoneNumber)) {
        phoneInput.setCustomValidity("Wprowadź poprawny numer telefonu (9 cyfr).");
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
                    alert('Wystąpił błąd podczas wysyłania danych: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Ошибка:', error);
                alert('Błąd podczas wysyłania danych. Spróbuj ponownie później.');
            });
    } else {
        form.classList.add('was-validated');
    }
}, false);

