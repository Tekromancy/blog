---
title: The Command Incantation
description: Encapsulating a spell cast as an executable, reified sigil.
type: clojure
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: Enchantment // Storing
formula: |
  (ns tekromancy.command)
  
  ;; A command is simply a zero-arity function capturing its environment.
  
  (defn create-teleport-command [target destination]
    (fn []
      (println (str "Teleporting " target " to " destination))))
  
  (defn create-banish-command [target]
    (fn []
      (println (str "Banishing " target " to the shadow realm!"))))
  
  (defn trigger-runes [commands]
    (doseq [cmd commands]
      (cmd)))
  
  ;; Usage:
  ;; (def queued-spells [(create-teleport-command "Golem" "The Keep")
  ;;                     (create-banish-command "Demon")])
  ;; (trigger-runes queued-spells)
tags: [behavioral, command, clojure, closures]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
By utilizing lexical closures, the Command pattern binds an action and its parameters into a neat, transportable package. These "reified sigils" can be queued, delayed, or unleashed in massive barrages across the JVM, giving the caster absolute control over the timeline of execution.
