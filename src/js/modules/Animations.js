import gsap from "gsap";

// Animations
export function startAnimations() {
	
	window.onload = function(){

		// Text animation
		const tlText =  new gsap.timeline(),
			title = document.querySelector("h1");
		
		tlText
			.fromTo(title,
				{opacity:0, ease: "power2.inOut"},
				{duration: .6, opacity: 1, ease: "power2.inOut"},
				"+=0"
			);
	}
		
}





