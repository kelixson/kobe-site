// Selector

function $(s) {
  return document.querySelector(s);
}

// Page
let gurl_string = window.location.href;
let gurl = new URL(gurl_string);
let gparam = gurl.searchParams.get("page");

// Projects Slider

let projectCount = projectData.length;
let projects = [];
let active;

for (let i = 1; i < projectCount + 1; i++) {
  if (i == 1) {
    active = "active";
  } else {
    active = " ";
  }

  let data = projectData[i - 1];
  let img = data.image;
  let description = data.description;
  let title = data.title;
  let path = safeConvert(title);

  projects.push(
    '<div class="' +
      active +
      " slide slide" +
      i +
      '" data-page="' +
      path +
      '"><img src="' +
      img +
      '" alt=""><h2>' +
      title +
      "</h3></div>"
  );

  $(".project-details").innerHTML +=
    '<div class="single-project single' +
    i +
    " " +
    path +
    '"><img src="' +
    img +
    '" alt=""><div class="project-info"><h3>' +
    title +
    "</h3><p>" +
    description +
    "</p></div><a class='back'><i class='fas fa-chevron-left'></i> Back</a></div>";
}

//convert to url safe string

function safeConvert(Text) {
  return Text.toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

$(".slider").innerHTML = projects.join("");

// Slider Function

let current = 1;

$(".next").addEventListener("click", function () {
  current++;

  if (current > projectCount) {
    current = 1;
  }
  console.log(current);
  changeSlide(current);
});

$(".prev").addEventListener("click", function () {
  current--;

  if (current < 1) {
    current = projectData.length;
  }
  console.log(current);
  changeSlide(current);
});

function changeSlide(c) {
  $(".active").classList.remove("active");
  $(".slide" + c).classList.add("active");
  $(".active").addEventListener("click", dynamicPage);
}

$(".active").addEventListener("click", dynamicPage);

// Pages

document.querySelectorAll(".nav-item").forEach((e) => {
  e.addEventListener("click", dynamicPage);
});

//  Dynamic Page Content

function dynamicPage() {
  page = this.getAttribute("data-page");

  if ($(".active-page")) {
    $(".active-page").classList.remove("active-page");
  }

  history.pushState({}, "Project", "?page=" + page);

  let url_string = window.location.href;
  let url = new URL(url_string);
  let param = url.searchParams.get("page");

  $("." + param).classList.add("active-page");
}

// Go back

document.querySelectorAll(".back").forEach((e) => {
  e.addEventListener("click", function () {
    $(".active-page").classList.remove("active-page");
    history.pushState({}, "Project", "/");
  });
});
