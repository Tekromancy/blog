---
title: The Mediator (Racket)
description: A central hub that coordinates interactions between various magical entities.
type: racket
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Enchantment // Nexus"
formula: |2
  #lang racket

  (define (make-nexus)
    (let ([mages '()])
      (hash
       'register (λ (mage) (set! mages (cons mage mages)))
       'broadcast (λ (sender msg)
                    (for-each (λ (m)
                                (unless (eq? m sender)
                                  ((hash-ref m 'receive) msg)))
                              mages)))))

  (define (make-mage name nexus)
    (let ([mage-obj (hash 'name name
                          'receive (λ (msg) (printf "~a received: ~a\n" name msg))
                          'send (λ (msg) ((hash-ref nexus 'broadcast) mage-obj msg)))])
      ((hash-ref nexus 'register) mage-obj)
      mage-obj))

  (define nexus (make-nexus))
  (define m1 (make-mage "Ignis" nexus))
  (define m2 (make-mage "Glacies" nexus))

  ((hash-ref m1 'send) "Watch out for the dragon!")
tags: [racket, behavioral, mediator, macro-metamagic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
# The Mediator

Rather than Mages whispering directly to one another and creating a chaotic web of references, the Mediator acts as the central Nexus. By communicating only with the Nexus, entities are decoupled. Racket's closure-based objects effortlessly coordinate this complex dance of broadcast messages.
