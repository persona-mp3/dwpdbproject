const searchForm = document.querySelector('.search-form');
const dropdownWrapper = document.querySelector('.dropdown-container');
const dropdownContent = document.querySelector('.dropdown-content');

async function sendToServer(formE){
    // const formData = new FormData(formE)
    try {
        const response = await fetch('/sandbox', {
            method: 'post',
            body: formE
        })

        const data = await response.json()
        // console.log(data)

        if (response.status === 200) {
            console.log('SUCESS')
            populateClient(data)
        } else {
            alert('error')
        }
    } catch (err) {
        console.log('an error occured', err)
    }
}

const body = document.querySelector('body')


async function populateClient(data) {
    let [extractedData] = await Object.entries(data)

    let userData = extractedData[1]

    const niNo = document.createElement('h2');
    const firstName = document.createElement('h3');
    const lastName = document.createElement('h3');
    const homeAddress = document.createElement('p');
    const postCode = document.createElement('p');
    const county = document.createElement('p');
    const phoneNo = document.createElement('p');

    niNo.innerText = `National Insurance Number: ${userData.ni}`
    firstName.innerText =`First Name: ${userData.first_name}`
    lastName.innerText = `Last Name: ${userData.last_name}`;
    homeAddress.innerText = `Home Address: ${userData.home_address}`;
    postCode.innerText =`Post code: ${userData.post_code}`;
    county.innerText = `County: ${userData.county}`;
    phoneNo.innerText = `Phone number: ${userData.phone}`;


    body.appendChild(niNo)
    body.appendChild(firstName)
    body.appendChild(lastName)
    body.appendChild(homeAddress)
    body.appendChild(postCode)
    body.appendChild(county)
    body.appendChild(phoneNo)
    
    // console.log(Object.entries(data)[0])
}


async function populateDOM(data){
    data.forEach((item) => {
        console.log(item)

        const brand = document.createElement('td');
        const product = document.createElement('td');
        const price = document.createElement('td');
        const sales = document.createElement('td');

        const tableRow = document.createElement('tr');
        // const tableData = document.createElement('td')

        brand.innerText = `${item.brand}`
        product.innerText = `${item.product}`;
        price.innerText = `${item.price}`;
        sales.innerText = `${item.sales}`;

        tableRow.appendChild(brand)
        tableRow.appendChild(product)
        tableRow.appendChild(price)
        tableRow.appendChild(sales)



        // document.querySelector('table').appendChild(brand)
        // document.querySelector('table').appendChild(product)
        // document.querySelector('table').appendChild(price)
        document.querySelector('table').appendChild(tableRow)
        document.querySelector('table').classList.remove('hide-table');
        document.querySelector('table').classList.add('show-table')
        // document.querySelector('table')
        // document.querySelector('table')

    })
}


// dropdownWrapper.addEventListener("click", (evt) => {
//     evt.preventDefault()
//     dropdownContent.classList.toggle("show-dropdown")
// })

searchForm.addEventListener("submit", (evt) => {
    evt.preventDefault()
    const formData = new FormData(searchForm)
    document.getElementById('search-input').value = ''

    sendToServer(formData);
    // searchForm.classList.toggle('hide-table')
})