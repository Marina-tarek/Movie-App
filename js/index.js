/// <reference types="../@types/jquery" />

let rowData = document.getElementById('rowData')
// ---> loading screen
$(function () {
    $(".loader").fadeOut(1000, function load() {
        $("#loading").fadeOut(1000, function () {
            $('body').css('overflow', 'auto')
            movies('now_playing')

        })
    })
})
// ----> scroll to top
$(".back-to-top").on("click",function(){
        $("html, body").animate({
          scrollTop: 0
        }, 500)
})
// --->side nav
$(".open-close-tap").on("click", function() {
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
        $(".nav-links li").eq(i).animate({ top: 300 }, (i + 5) * 100)
    }
}
//---->function Close Tap automatica when click on any nav-link
function closeSideNav() {
    $(".nav-content").animate({ width: 'toggle' }, 500)
    $(".nav-header>i").toggleClass('fa-align-justify fa-xmark', 500);

}

// ---> search input
$(".searchInput").on("input",function(){
    $(".clearIcon").removeClass("d-none")
    search($(".searchInput").val())
})
$(".clearIcon").on("click",function(){
    $(".searchInput").val("")
    $(".clearIcon").addClass("d-none")
    movies('now_playing')
   
})
async function search(letter){
    let response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${letter}&page=1&api_key=eba8b9a7199efdcb0ca1f96879b83c44`)
    let data = await response.json()
    console.log(data.results);
    display(data.results) 
}

// ----->movie
$('a[href^="#"]').on("click", function (e) {
    let aHref = e.target.getAttribute("href").slice(1)
  console.log(aHref);
  movies(aHref)
  closeSideNav()
  hideMenuItems()
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
<div class="col-sm-12 col-md-6 col-lg-4 position-relative" id="img-info">
<div class="inner m-auto">
<img src='https://image.tmdb.org/t/p/w500${array[i].poster_path}' class="w-100" alt="${array[i].original_title}" ></img>
<div id="img-content" class="layer position-absolute text-center h-100  d-flex align-items-start justify-content-center flex-column">
<h3>${array[i].original_title}</h3>
<p>${array[i].overview}</p>
<p>Release Date : <span> ${array[i].release_date}</span></p>
<h3 class="votingNum d-flex justify-content-center align-items-center">${array[i].vote_average.toFixed(1)}</h3>
</div></div>

</div>
    `
rowData.innerHTML = cartona

// $("#img-info").on("click",function(e){
//   console.log( e.target.src);
//     // console.log(e.target);
//     // $("#img-content").animate({ opacity: 1,paddingInline: 'toggle'}, 500)
// })
}

// $("#img-info").on("mouseleave",function(){
//     $("#img-content").animate({ width: '0',paddingInline: 'toggle' }, 500)
// })
}



