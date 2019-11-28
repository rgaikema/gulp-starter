import gsap from "gsap";

// Animations
export function startAnimations() {
	
	// Text animation
	const tlText =  new gsap.timeline(),
		title = document.querySelector("h1");
	
	tlText
		.fromTo(title,
			{opacity:0, scale:0, transformOrigin: "0% 50%", ease: "power2.inOut"},
			{duration: .8, opacity: 1, scale: 1, transformOrigin: "0% 50%", ease: "power2.inOut"},
			"+=0"
		);
	
}





