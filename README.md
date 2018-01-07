# Gulp Build

## Prerequisites
* Git
* Node

## Installation
* `git clone https://github.com/kelseythejackson/gulp-build`
* `cd gulp-build`
* `npm install`

## Commands
Once you're in the root folder, there are a handful of commands you cane run:
* `gulp scripts` concatenates, minifies, all of the JS into **all.min.js** and places the file in the **dist/scripts** folder.

* `gulp styles` processes, minifies, and renames the **src/css/global.css** to  **all.min.css** and places the file in the **dist/styles** folder.

* `gulp images` optimizes all of the images in the **src/images** folder and places them in **dist/content**.

* `gulp icons` basically copies the **src/icon** folder into the **dist** folder.

* `gulp html` runs `gulp-useref` and replaces the css and js links and puts an optimized html file in the **dist** folder.

* `gulp clean` get rid of any files or folders you don't want.

* `gulp serve` launches the server and watches for sass and html changes.

* `gulp build` runs the aformentioned tasks in a particular order to do a proper front end buld.

* `gulp` runs the full suite and launches the server to watch for sass and html changes.

