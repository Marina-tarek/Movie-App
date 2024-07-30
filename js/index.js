/// <reference types="../@types/jquery" />

let rowData = document.getElementById('rowData')
// ----> scroll to top
$(".back-to-top").on("click",function(){
        $("html, body").animate({
          scrollTop: 0
        }, 500)
})
// --->side nav
$(".open-close-tap").on("click", function tap() {
    $(".nav-content").animate({ width: 'toggle' }, 500)
    if ($(".nav-content").css("display", "block")) {
        $(".nav-header>i").toggleClass('fa-align-justify fa-xmark', 500);
        showMenuItems()
    } else {
        hideMenuItems()
    }
})
function showMenuItems() {
    for (let i = 0; i < 5; i++) {
        $(".nav-links li").eq(i).animate({ top: 0 }, (i + 5) * 100)
    }
}
function hideMenuItems() {
    for (let i = 0; i < 5; i++) {
        $(".nav-links li").eq(i).animate({ top: 'toggle' }, (i + 5) * 100)
        $(".nav-links li").removeAttr("style")
    }
}
// ----->
$('a[href^="#"]').on("click", function (e) {
    let aHref = e.target.getAttribute("href").slice(1)
  console.log(aHref);
  movies(aHref)
})
async function movies(href){
    let response = await fetch(`https://api.themoviedb.org/3/movie/${href}?api_key=eba8b9a7199efdcb0ca1f96879b83c44`)
    let data = await response.json()
    
    console.log(data.results);
    display(data.results) 
}

function display(array){
    let cartona = ``
for (let i = 0; i < array.length; i++) {
    cartona += `
<div class="col-md-4 position-relative inner" id="img-info">
<img src='https://image.tmdb.org/t/p/w500${array[i].poster_path}' class="w-100" alt="${array[i].original_title}" ></img>
<div id="img-content" class="layer position-absolute">
<h3>${array[i].original_title}</h3>
<p>${array[i].release_date}</p>
<p class="border-2 border-warning">${array[i].vote_average}</p>
</div>
</div>
    `
rowData.innerHTML = cartona

$("#img-info").on("click",function(e){
    console.log(e.target);
    $("#img-content").animate({ width: '100%' }, 500)
})
}

$("#img-info").on("mouseleave",function(){
    $("#img-content").animate({ width: '0' }, 500)
})
}



