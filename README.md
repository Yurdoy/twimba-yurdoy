# 🐦 Twimba

A Twitter-style feed built with vanilla JavaScript — featuring
infinitely nested replies powered by recursion.

**🔗 Live demo:** https://twimba-yurdoy.netlify.app

![Twimba demo](demo.gif)

## 🌟 Highlights

- 💬 Reply to replies at **any depth** — one recursive render function, one template
- ❤️ Like and retweet on every level, found by a recursive search
- 📂 Expand/collapse state lives in the data, so it survives every re-render
- 💾 Your feed persists in `localStorage`
- 🧱 No frameworks, no build step — plain HTML, CSS and ES modules

## ℹ️ Overview

Twimba started as a guided project in the
[Scrimba Fullstack Developer Path](https://scrimba.com/fullstack-path-c0fullstack).
The base feed (tweets, likes, retweets, single-level replies) comes from the course.

**What I added on my own:**

- Nested replies at unlimited depth (`getRepliesHtml` calls itself for `reply.replies`)
- A recursive `findByUuid` that finds any tweet or reply in the tree
- UI state (open/closed replies) moved from the DOM into the data model

## 🧠 What I learned

- **Recursion** — process an item, call the same function on its children,
  stop at an empty array (the base case)
- **Refactoring safely** — extract a function first, verify nothing changed, then add features
- **State belongs in data, not in HTML** — `render()` rebuilds the DOM,
  so anything stored only in the DOM is lost
- **Reading errors** — `null` vs `undefined` vs `ReferenceError`, and checking the
  Elements panel to see which class actually reached the HTML

## 🚀 Run locally

ES modules don't load from `file://`, so serve the folder with any local server,
e.g. the VS Code **Live Server** extension, and open `index.html`.

## ✍️ Author

**Yuriy Doychev** — career changer from the maritime industry into web development.
[GitHub](https://github.com/Yurdoy)
