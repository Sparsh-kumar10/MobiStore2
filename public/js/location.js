const findMyState = () => {
    const status = document.querySelector('.status');
    const shoplatitude=document.querySelector('.latitude')
    const shoplogitude=document.querySelector('.logitude')


    const success = (position) =>{
        console.log(position)
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const geoApiUrl = 'https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en'
        fetch(geoApiUrl)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            status.innerHTML=data.city;
            shoplatitude.value=data.latitude;
            shoplogitude.value=data.longitude;
        })
    }
    const error = () => {
        status.textContent = 'unable to retrieve your location'
    }
    navigator.geolocation.getCurrentPosition(success,error)
}

document.querySelector('.find-state').addEventListener('click',findMyState);






let slideIndex = 0;
showSlide(slideIndex);

function plusSlides(n) {
  showSlide(slideIndex += n);
}
function showSlide(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slides[slideIndex-1].style.display = "block";
}


showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}