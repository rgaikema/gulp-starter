import gsap from "gsap";

// Animations
export function startAnimations() {
	
	window.onload = function(){

		// Text animation
		const tlText =  new gsap.timeline(),
			title = document.querySelector("h1");
		let mainContent = document.querySelector(".section.main");
		
		tlText
			// .fromTo(title,
			// 	{y:60, ease: "power2.inOut"},
			// 	{duration: .6, y: 0, ease: "power2.inOut"},
			// 	"+=0"
			// )
			.to(mainContent,
				{duration: .6, opacity:1, y: 0, ease: "power2.inOut"},
				"+=.1"
			);
	}
	
}





