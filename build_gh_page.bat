git checkout master
git push origin master
git checkout "gh-pages"
git checkout origin/master dist/bundle.js
git checkout origin/master public/index.html
move /y dist/bundle.js bundle.js
move /y public/index.html index.html
del /q dist public
git add .
git commit -m "Latest production build"
git push origin gh-pages
git checkout master
PAUSE
