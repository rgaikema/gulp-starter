console.log('running app.js');
import { hello } from './modules/Module.js';
console.log(hello);

const test = () => {
	console.log('test!');
};
test();

import { startAnimations } from './modules/Animations.js'
startAnimations();
