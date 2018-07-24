window.onload = function () {
    const cities = [
        {
            zip: 10001,
            city: 'New York'
        },
        {
            zip: 88901,
            city: 'Las Vegas'
        },
        {
            zip: 98001,
            city: 'Washington'
        }
    ];

    const zipForm = document.querySelector('.zip__form');

    function addCity(e) {
        e.preventDefault();

        const zipInput = parseInt(this.querySelector('#zip-field').value);
        const currentZip = cities.filter(code => code.zip === zipInput);
        const isDuble = checkDuplicate(currentZip[0].city);

        console.log(isDuble);

        if (currentZip.length > 0) {
            addItem(currentZip[0].city);
            clearForm(this);
        }
        else {}
    }

    function addItem(cn) {
        const country = document.createElement('div');
        const countryName = document.createTextNode(cn);

        country.setAttribute('class', 'zip__city');
        country.appendChild(countryName);
        document.querySelector('.zip__list').appendChild(country);
    }

    function clearForm(form) {
        // forEach для того, что если добавятся еще поля они все будут очищаться
        form.querySelectorAll('.form__input--text').forEach((input) => {
            input.value = ''
        });
    }

    function checkDuplicate(value) {
        const currentCities = document.querySelectorAll('.zip__city');
        console.log(currentCities);

        if (currentCities.length > 1) {
            for (let i = currentCities.length; i--;) {
                if (currentCities[i].textContent === value) {
                    return -1;
                }
            }
        }
    }

    zipForm.addEventListener('submit', addCity);
};