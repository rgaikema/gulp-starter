# HTML/CSS/JS boilerplate powered by gulp to use HTML includes, SASS, Babel (ES6) and BrowserSync
---
##### Updated 11-07-2019
Made for development while working on static frontend before implementing a CMS.

###Dependencies

1. Gulp
2. Sass
3. Babel + Browerify
4. File includes
5. Browsersync
5. GreenSock

And some other small ones

---

## Usage
Just `npm install` the dependencies and see the Gulpfile for configuration of the directories.
Run `gulp dev` to start the system and watch the files for BrowserSync to reload the page.
Use `gulp build` to make the final build ('dist' folder).

---


#### HTML includes
For an included header and footer I used [Gulp-file-include](https://www.npmjs.com/package/gulp-file-include).
An easy way to implement a menu or footer for example without having to duplicate it manually into other pages.

#### Sass
[Sass](https://www.npmjs.com/package/gulp-sass) + [Autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer) and Uglify to compile the Sass files and uglify them when making the build folder. 

#### Babel + Browserify
To make use of the ES6 modules I used [Babel](https://babeljs.io/setup#installation), [Babelify](https://www.npmjs.com/package/babelify) & [Browserify](
) to transform Javascript.

#### JS + vendor
Javascript from vendors can be placed in the 'src/js/vendor' folder. They wil be concatenated and placed in the 'dist/js/vendor' folder.

#### BrowserSync & Watch
While using `gulp dev` BrowserSyn while load the site at http://localhost:3001/ and the HTML, JS and SCSS files are being watched. BrowserSync will reload the page when files are changed.
