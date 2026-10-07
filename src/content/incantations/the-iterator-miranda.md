---
title: The Iterator of the Ancestral Monad
description: Traversing infinite pure sequences lazily within the Ancestral Monad.
type: miranda
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Enchantment // Ancestral Monad"
formula: |2
  || Iteration in Miranda is natural through lazy list evaluation.
  
  infinite_monad_stream :: [num]
  infinite_monad_stream = [1..]
  
  take_iter :: num -> [num] -> [num]
  take_iter 0 _ = []
  take_iter n (x:xs) = x : take_iter (n - 1) xs
  
  iterator_result :: [num]
  iterator_result = take_iter 5 infinite_monad_stream
tags: [miranda, behavioral, iterator, ancestral-monad]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
