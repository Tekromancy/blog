---
title: "The Abstract Factory"
description: "A divination matrix for manifesting aligned families of sigils without specifying their concrete forms."
type: j
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Matrix Mancy"
formula: |2
  coclass 'FireSigilFactory'
  create_rune =: 3 : '''Fire Rune'''
  create_ward =: 3 : '''Fire Ward'''
  
  coclass 'IceSigilFactory'
  create_rune =: 3 : '''Ice Rune'''
  create_ward =: 3 : '''Ice Ward'''
  
  cocurrent 'base'
  manifest =: 3 : 0
    factory =. y
    r =. create_rune__factory ''
    w =. create_ward__factory ''
    r ; w
  )
  
  NB. Usage: manifest conew 'FireSigilFactory'
tags: [creation, factory, matrix, sigils]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

An abstract factory implemented via locales (namespaces) acting as factory instances.
