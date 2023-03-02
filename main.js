function loadNavBarData(){
    const url ='https://openapi.programming-hero.com/api/news/categories';
    fetch (url)
    .then (res=>res.json())
    .then(data=>navBarDisplay(data.data.news_category));
}

const navBarDisplay = (navBarData)=>{
    const navBarUl = document.getElementById('nav-ul');
    navBarData.forEach(item=>{
        const {category_name,category_id}= item;
        navBarUl.innerHTML += `
            <li class="nav-item">
                <a onclick="loadNewsData('${category_id}','${category_name}')" class="nav-link" href="#">${category_name}</a>
            </li>
        `;
    })
}

const loadNewsData =(id, category_name)=>{
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayNewsData(data.data, category_name));
}

const displayNewsData =(data, category_name)=>{
    const displayCountNews = document.getElementById('display-count-news');
    displayCountNews.innerText=`${data.length} items found for category ${category_name}`;
    const newsDisplayCard= document.getElementById('news-display-card');
    newsDisplayCard.innerHTML='';
    data.forEach(element => {
        displayCountNews.value=element.legth;
        const {title, details, image_url,total_view, _id}= element;
        const {name, published_date, img}= element.author;
        const {number}= element.rating;

        newsDisplayCard.innerHTML +=`
        <div class="card mb-3">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="${image_url}" class="img-fluid rounded-start" alt="...">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${title}</h5>
                  <p class="card-text">${details.slice(0,200)}</p>
                
                  <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center"> 
                            <img src="${img}" alt="img-here" width="45" height="45" class="rounded-circle">
                            <div class="p-3">
                                <div>${name ? name : 'No Author'}</div>
                                <div>${converDateFormat(published_date)}</div>
                            </div>
                        </div>
                        <div>
                             
                            <div><i class="fa-solid fa-eye"></i> ${total_view ? total_view : "No Viewed"}</div>
                        </div>
                        <div> 
                            <div>${generateStar(number)+' '+ number}</div>
                        </div>
                        <div> 
                            <i onclick="loadEveryNews('${_id}')" class="fa-solid fa-arrow-right" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
                        </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
    });
}

const loadEveryNews =(news_id) =>{
    const url =`https://openapi.programming-hero.com/api/news/${news_id}`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayNewsDetails(data.data[0]))
}

const displayNewsDetails = (data) =>{
console.log(data);
const {title,details} = data;
const {name,published_date} = data.author;
document.getElementById('exampleModalLabel').innerText=title;
const modalBody = document.getElementById('modal-body');
modalBody.innerHTML='';
modalBody.innerHTML +=`
<p>${details}</p>
<div>${name ? name : 'No Author'}</div>
<div>${converDateFormat(published_date) ? converDateFormat(published_date) : 'Not Available'}</div>
`;
}
// for date 
const converDateFormat = (dateData) =>{
    let monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
    let timetams= new Date(dateData).getTime();
    let day= new Date (timetams).getDate();
    let month = new Date(timetams).getMonth();
    let year = new Date(timetams).getFullYear(); 

    let monthName = monthNames[month];
    const displayDate = monthName +' '+ day +' '+ year;
    return displayDate;

}

//generate star 
const generateStar = star =>{
    let ratingHTML = '';
    const floorStar = Math.floor(star);
    for ( let i=1; i<=floorStar; i++){
        ratingHTML += `<i class="fas fa-star text-warning"></i>`;
    }

    if((star - floorStar) > 0){
        ratingHTML += `<i class="fas fa-star-half text-warning"></i>`;
    }
    return ratingHTML;
}


loadNavBarData();
loadNewsData('01','Breaking News');