window.onload = function () {
    const cities = [
        {
            id: 1,
            zip: 10001,
            city: 'New York'
        },
        {
            id: 2,
            zip: 88901,
            city: 'Las Vegas'
        },
        {
            id: 3,
            zip: 98001,
            city: 'Washington'
        }
    ];

    const zipForm = document.querySelector('.form');

    function addCity(e) {
        e.preventDefault();

        const zipInput = parseInt(this.querySelector('#zip-field').value);
        const currentZip = cities.filter(code => code.zip === zipInput);

        if (currentZip.length > 0) {
            const isDuplicate = checkDuplicate(currentZip[0]);

            console.log(isDuplicate);

            if (currentZip.length > 0 && isDuplicate !== -1) {
                addItem(currentZip[0]);
                clearForm(this);

                document.querySelectorAll('.zip__city-name').forEach((item) => item.addEventListener('click', () => {
                    setZip(item)
                }));

                document.querySelectorAll('.zip__city-delete').forEach((item) => item.addEventListener('click', () => {
                    deleteItem(item)
                }));

                document.querySelectorAll('.zip__city-name').forEach((item) => {
                    if (currentZip[0].id === parseInt(item.getAttribute("data-id"))) {
                        setActive(item);
                    }
                });
            }
        }
        else {
            alert('Unfortunately zip code not found :(');
        }
    }

    function addItem(cn) {
        const cityDiv = document.createElement('div');
        const cityButton = document.createElement('button');
        const delButton = document.createElement('button');
        const countryName = document.createTextNode(cn.city);

        cityButton.appendChild(countryName);
        cityButton.setAttribute('class', 'zip__city-name');
        cityButton.setAttribute('data-id', cn.id);

        delButton.setAttribute('class', 'zip__city-delete');
        delButton.setAttribute('data-id', cn.id);

        cityDiv.setAttribute('class', 'zip__city');
        cityDiv.appendChild(cityButton);
        cityDiv.appendChild(delButton);

        document.querySelector('.zip__list').appendChild(cityDiv);
    }

    function checkDuplicate(value) {
        const currentCities = document.querySelectorAll('.zip__city-name');

        for (let i = currentCities.length; i--;) {
            if (parseInt(currentCities[i].getAttribute("data-id")) === value.id) {
                alert('This zip code has exist!');
                return -1;
            }
        }

        return 1;
    }

    function clearForm(form) {
        form = form || document.querySelector('.form');

        form.querySelectorAll('.form__input--text').forEach((input) => {
            input.value = '';
        });
    }

    function setZip(cityButton) {
        const zip = cities.filter((item) => item.id === parseInt(cityButton.getAttribute("data-id")));

        document.getElementById('zip-field').value = zip[0].zip;

        setActive(cityButton);
    }

    function setActive(city) {
        document.querySelectorAll('.zip__city-name').forEach((item) => item.classList.remove('zip__city-name--active'));
        city.classList.add('zip__city-name--active');
    }

    function deleteItem(item) {
        item.closest('.zip__city').remove();
        clearForm();
    }

    function availableCodes(array) {
        const ul = document.createElement('ul');

        array.forEach((item) => {
            const li = document.createElement('li');

            li.appendChild(document.createTextNode(`${item.zip}: ${item.city}`));
            ul.appendChild(li);
        });

        document.querySelector('footer').appendChild(ul);
    }

    zipForm.addEventListener('submit', addCity);

    availableCodes(cities);
};
