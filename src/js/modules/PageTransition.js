export function pageTransition() {

    document.addEventListener('DOMContentLoaded', function() {
        if (!window.AnimationEvent) { return; }

        var anchors = document.getElementsByTagName('a');
        
        for (var idx=0; idx<anchors.length; idx+=1) {

            if (anchors[idx].hostname !== window.location.hostname || anchors[idx].pathname === window.location.pathname) {
		        continue;
	        }

            anchors[idx].addEventListener('click', function(event) {
                var fader = document.getElementById('fader'),
                    anchor = event.currentTarget;
                
                var listener = function() {
                    window.location = anchor.href;
                    fader.removeEventListener('animationend', listener);
                };
                fader.addEventListener('animationend', listener);
                
                event.preventDefault();
                
                fader.setAttribute('class', 'fade-in');
            });
        }
    });

    window.addEventListener('pageshow', function (event) {
        if (!event.persisted) {
        return;
        }
        var fader = document.getElementById('fader');

	    fader.removeAttribute('class', 'fade-in');
    });

}
