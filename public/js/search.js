function searchMobiles(query) {
    // Replace 'YOUR_BACKEND_ENDPOINT' with the actual backend endpoint for mobile search
    const endpoint = '';
  
    // Perform the Fetch API request
    fetch(`http://localhost:3000/api/?search=${query}`)
      .then(response => response.json())
      .then(data => {
        // Process the response data
        // For example, you can display the results on the page
        console.log('here 2')
        displayResults(data)
  
      })
      .catch(error => {
        console.error('Error fetching mobiles:', error);
      });
  }
  
  function displayResults(data) {
    // Assuming 'data' is an array of mobile objects with properties like 'name' and 'price'
    const resultsContainer = document.querySelector('.mainContent');
    const main = document.querySelector('.main-container')
    resultsContainer.innerHTML = '';
  
    main.innerHTML = ''
    console.log(data)
  
    if (data.data.length === 0) {
      console.log('here l love you')
      resultsContainer.style.height="400px"
      resultsContainer.innerHTML = 'No results found.';
      return;
    }
  
    console.log(data)
  
    for (let i = 0; data.data.length; i++) {
      console.log(data.data[i])
      const mobileItem = document.createElement('div');
      mobileItem.classList.add('Content')
      mobileItem.innerHTML = `
            
            <div class="aboutProduct">
            <div class="first">
                <div class="image">
                       <img type="image" src=${data.data[i].imageurl} alt="" height="240" width="auto">
                </div>
                <div class="aboutPhone">
                    <ul class="productInfo">
                           <li><strong>${data.data[i].name}</strong></li>
                           <li>${data.data[i].distance}KM</li>
                           <li>${data.data[i].shopRegistration.Bname}</li>
                           <li>${data.data[i].shopRegistration.Pname}</li>
                    </ul>
                </div>
                <div class="price">
                    <span class="rupees-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-currency-rupee" viewBox="0 0 16 16">
                            <path
                                d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4v1.06Z" />
                        </svg>
                    </span>
                    <strong>${data.data[i].price}</strong> <!-- Fixed template string -->
                </div>
            </div>
  
            <div class="orderOptions1">
                <div class="orderBtn1">
                    <form action="/user/order" method="post">
                        <input type="hidden" value="${data.data[i]._id}" name="productId">
                        <button class="buttons1" type="submit">BookNow</button>
                    </form>
                </div>
            </div>
        </div>
      `;
      resultsContainer.appendChild(mobileItem);
    }
  }
  
  document.getElementById('searchForm').addEventListener('submit', event => {
    event.preventDefault();
    const searchQuery = document.getElementById('searchInput').value;
    console.log('here')
    searchMobiles(searchQuery);
  });
  