---
title: The Mediator
description: Routing astral communications through a central scrying orb.
type: scheme
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Divination // Telepathy"
formula: |2
  (define (make-scrying-orb)
    (let ((mages '()))
      (define (dispatch msg . args)
        (case msg
          ((register)
           (set! mages (cons (car args) mages)))
          ((broadcast)
           (let ((sender (car args))
                 (text (cadr args)))
             (for-each (lambda (m)
                         (unless (eq? m sender)
                           (m 'receive text)))
                       mages)))))
      dispatch))
tags: [behavioral, scheme, message-passing, state]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The orb acts as a centralized closure managing a list of registered mages, broadcasting telepathic messages while preventing chaotic point-to-point bindings.
