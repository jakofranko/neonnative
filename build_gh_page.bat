git checkout master
git push origin master
git stash
git checkout "gh-pages"
git checkout master -- build_gh_page.bat
git checkout origin/master public/index.html
git checkout origin/master dist/bundle.js
move /y public\index.html index.html
rmdir /s /q public
git add .
git commit -m "Latest build"
git push origin "gh-pages"
git checkout master
git stash pop
PAUSE
