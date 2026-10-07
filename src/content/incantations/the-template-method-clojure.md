---
title: The Template Method Incantation
description: Defining the skeleton of a ritual while allowing sub-casters to fill in the steps.
type: clojure
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: Conjuration // Rituals
formula: |
  (ns tekromancy.template-method)
  
  (defn perform-summoning-ritual [{:keys [draw-circle-fn chant-fn ignite-fn]}]
    (println "Beginning the ritual...")
    (draw-circle-fn)
    (chant-fn)
    (ignite-fn)
    (println "The entity has arrived!"))
  
  (def demon-ritual
    {:draw-circle-fn #(println "Drawing circle of blood.")
     :chant-fn       #(println "Chanting in abyssal.")
     :ignite-fn      #(println "Igniting hellfire.")})
  
  ;; Usage:
  ;; (perform-summoning-ritual demon-ritual)
tags: [behavioral, template-method, clojure, higher-order-functions]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
A high ritual has strict steps, yet the execution of each step depends on the entity summoned. The Template Method thrives as a high-order function that takes a map of specific implementation functions, executing them within a rigid algorithmic framework.
