import {Power2, TimelineLite} from "gsap/TweenMax";

// Animations
export function startAnimations() {
	
	// Figure animation
	const tl = new TimelineLite(),
		figure = document.querySelector('.figure');
	
	if(figure != null) {
		tl
			.to(figure, 2, {scale: 1.1, ease: Power2.easeInOut});
	}
	
	
	// Text animation
	const tlText =  new TimelineLite(),
		mySplitText = new SplitText("h1", {type:"words,chars"}),
	chars = mySplitText.chars;
	
	tlText
	.staggerFrom(chars, 0.8, {opacity:0, scale:0, y:80}, 0.01, "+=0");
	
}





