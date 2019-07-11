import {Power2, TimelineLite} from "gsap/TweenMax";

// Animations
export function startAnimations() {
	
	// Text animation
	const tlText =  new TimelineLite(),
		title = document.querySelector("h1");
	
	tlText
		.fromTo(title, 0.8,
			{opacity:0, scale:0, transformOrigin: "0% 50%", ease: Power2.easeInOut},
			{opacity: 1, scale: 1, transformOrigin: "0% 50%", ease: Power2.easeInOut},
			"+=0"
		);
	
}





