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

- **Recursion** — a function that calls itself. `getRepliesHtml` renders a list of
  replies and, inside each reply's template, calls itself again for that reply's
  own replies. It stops when the replies array is empty (the base case).
  The same idea powers `findByUuid`.
- **Refactoring as preparation** — restructuring code without changing its behavior,
  to make the next change easy. I first extracted reply rendering into its own
  function and verified nothing changed; that made adding nested replies a small,
  safe step.
- **State belongs in data, not in HTML** — toggling the `hidden` class directly in
  the DOM was lost on every `render()`, because the page is rebuilt from templates.
  I moved the open/closed state into the data (`isShown`), and the template derives
  the class from it — the same pattern as `isLiked`.
- **Reading errors** — `TypeError: Cannot read properties of null/undefined` means
  something upstream returned nothing (`getElementById` found no element,
  `findByUuid` found no object, a function had no `return`); `ReferenceError`
  means a variable doesn't exist in that scope. I read the type, the message and
  the line — then trace back to where the empty value came from.

## 🚀 Run locally

ES modules don't load from `file://`, so serve the folder with any local server,
e.g. the VS Code **Live Server** extension, and open `index.html`.

## ✍️ Author

**Yuriy Doychev** — career changer from the maritime industry into web development.
[GitHub](https://github.com/Yurdoy)
