// category all list post part
const cate = (items) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${items}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayPost(data.data));
};
// category display part start
const displayPost = (post) => {
  // console.log(post)
  // category part start
  const containerrow = document.getElementById("postRow");
  containerrow.innerHTML = ``;
  post.forEach((card) => {
    // console.log(card)
    const div = document.createElement("div");
    div.classList.add("row", "bg-light", "p-3", "items", "rounded");
    div.innerHTML = `
             <div class="col-lg-4 col-sm-12">
                <div class="card-img">
                 <img src="${card.thumbnail_url}" alt="">
                </div> 
            </div>
              <div class="col-lg-8 d-sm-block">
                    <div class="text-title py-2">
                         <h4>${card.title}</h4>
                         <p class="text-muted py-3">${card.details.slice(
                           0,
                           200
                         )}</p>
                         <p class="text-muted">Fancy some shopping deals? Check out these amazing sales: Zara Black Friday, ASOS Black Friday, Missoma Black Friday and Gucci Black Friday...</p>
                    </div>
                     <div class="d-flex justify-content-between  align-items-center mt-5">

                         <div class="thamble d-flex align-items-center justify-content-lg-around">
                          <img src="${card.author.img}" alt="">
                          <div class="ms-2">
                            <h3>${
                              card.author.name
                                ? card.author.name
                                : "no found data"
                            }</h3>
                            <h6 class="text-muted">${
                              card.author.published_date
                                ? card.author.published_date
                                : "no found data"
                            }</h6>
                          </div>
                         </div>

                         <div class="view d-flex justify-content-center align-items-center text-muted">
                         <div>
                         <i class="fa-regular fa-eye"></i>
                         </div>
                          <div class="ms-2">
                           <h3>${
                             card.total_view ? card.total_view : "no found data"
                           }</h3> 
                          </div>
                         </div>

                         <div class="rating">
                           <i class="fa-solid fa-star-half"></i>
                           <i class="fa-regular fa-star"></i>
                           <i class="fa-regular fa-star"></i>
                           <i class="fa-regular fa-star"></i>
                         </div>

                         <div class="detalis">
                         <button onclick="loadDeatils('${
                           card._id
                         }')" class="btn btn-dengar" data-bs-toggle="modal" data-bs-target="#categoryDeatilesModal"><i class="fa-solid fa-arrow-right"></i></button>
                         </div>
                     </div>
                   </div>
          `;
    containerrow.appendChild(div);
  });
  // post found part
  const nofound = document.getElementById("nofound");
  nofound.innerHTML = `
     <h4>${post.length} items found for category</h4>
     `;
  toggleSpinner(false);
};

const loadcategory = () => {
  fetch("https://openapi.programming-hero.com/api/news/categories")
    .then((res) => res.json())
    .then((data) => displayCategory(data.data.news_category));
};
// display category list part
const displayCategory = (list) => {
  const categoryList = document.getElementById("category-list");
  list.forEach((lists) => {
    console.log(lists);
    const li = document.createElement("li");
    li.innerHTML = `
     <li>${lists.category_name}</li>
     `;
    categoryList.appendChild(li);
    li.addEventListener("click", function () {
      toggleSpinner(true);
      cate(lists.category_id);
    });
  });
};

// category detalis modal part start
const loadDeatils = async (news_id) => {
  const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayDeatils(data.data[0]);
};
const displayDeatils = (data) => {
  const detalisTitle = document.getElementById("categoryDeatilesModalLabel");
  detalisTitle.innerText = data.category_id;
  const detalisBody = document.getElementById("post-modal-body");
  detalisBody.innerHTML = `
      <img src="${data.thumbnail_url}" alt="">
      <p><b>Title: </b>${data.title}</p>
      <p><b>Author: </b>${
        data.author.name ? data.author.name : "no found data"
      }</p>
      <p><b>published Date: </b>   ${
        data.author.published_date
          ? data.author.published_date
          : "no found data"
      }</p>
      <p><b>Details: </b>  ${data.details.slice(0, 200)}</p>
     `;
};

const toggleSpinner = (loader) => {
  const loaders = document.getElementById("loader");
  if (loader) {
    loaders.classList.remove("d-none");
  } else {
    loaders.classList.add("d-none");
  }
};

loadcategory('');
