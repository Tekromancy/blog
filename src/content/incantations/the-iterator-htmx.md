---
title: The Iterator (Infinite Scroll)
description: Sequentially traversing a massive dataset via continuous appending and triggered fetching.
type: htmx
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Scrying"
formula: |2
  <!-- The Iterator pattern is realized through Infinite Scrolling -->
  <tbody id="data-matrix">
    <!-- Initial rows are loaded here -->
    <tr><td>Record 001</td></tr>
    <tr><td>Record 002</td></tr>
    
    <!-- The final row acts as the Iterator's "next()" trigger -->
    <tr hx-get="/api/records?page=2" 
        hx-trigger="revealed" 
        hx-swap="afterend">
      <td>Record 003</td>
    </tr>
  </tbody>
tags: [htmx, iterator, infinite-scroll, pagination]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The **Iterator** pattern provides a way to access elements of an aggregate object sequentially without exposing its underlying representation. In a hypermedia application, this manifests as **Pagination** or **Infinite Scrolling**.

Instead of loading a massive grimoire of data all at once, the client traverses it sequentially. The final element in a batch contains an HTMX directive (`hx-trigger="revealed"`). When the user scrolls to this element, it automatically acts as the iterator's `next()` function, calling the server for the next page and appending the new data (`hx-swap="afterend"`). The server ensures the new payload contains the *next* trigger, creating an infinite, seamless traversal of data.
