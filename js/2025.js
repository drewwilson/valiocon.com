var video = document.getElementById("video"),
	iframe = document.getElementById("iframe"),
	playTeaser = document.getElementById("play"),
	playPromo = document.getElementById("play-promo"),
	playTestimonials = document.getElementById("play-testimonials");

playTeaser.addEventListener("click", function(e){
	e.preventDefault();
	iframe.setAttribute("width", "320");
	iframe.setAttribute("height", "570");
	iframe.setAttribute("src", "https://www.youtube.com/embed/QxWyAt7jlPo?showinfo=0&autoplay=1");
	video.style.display = "block";
});
playPromo.addEventListener("click", function(e){
	e.preventDefault();
	iframe.setAttribute("width", "1000");
	iframe.setAttribute("height", "563");
	iframe.setAttribute("src", "https://www.youtube.com/embed/dyehGWTfdp8?showinfo=0&autoplay=1");
	video.style.display = "block";
});
playTestimonials.addEventListener("click", function(e){
	e.preventDefault();
	iframe.setAttribute("width", "1000");
	iframe.setAttribute("height", "563");
	iframe.setAttribute("src", "https://www.youtube.com/embed/HKpNSmozpkE?showinfo=0&autoplay=1");
	video.style.display = "block";
});

video.addEventListener("click", function(e){
	e.preventDefault();
	iframe.setAttribute("src", "");
	video.style.display = "none";
});