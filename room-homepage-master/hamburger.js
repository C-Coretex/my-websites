function openNav()
{
	var x = document.getElementById("topnav");
	if (x.className === "navigation") {
		x.classList.add('responsive');
		x.classList.remove("navigation");
	} else {
		x.classList.remove("responsive");
		x.classList.add("navigation");
	}
	
	x = document.getElementById("hamburger");
	if (x.className === "hamburger") {
		x.classList.add('close');
		x.classList.remove("hamburger");
	} else {
		x.classList.remove("close");
		x.classList.add("hamburger");
	}
	
	x = document.getElementById("a-logo");
	if (x.className == "") {
		x.classList.add('hide-mobile');
	} else {
		x.classList.remove("hide-mobile");
	}
}