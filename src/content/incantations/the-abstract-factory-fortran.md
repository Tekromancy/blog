---
title: Abstract Factory
description: Primordial foundries churning out families of numeric constructs from the deep earth.
type: fortran
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: Conjuration // Supercomputing
formula: |
  module abstract_factory_m
    implicit none
    private
    public :: AbstractMonolith, AbstractFoundry
  
    type, abstract :: AbstractMonolith
    contains
      procedure(calc_interface), deferred, pass :: compute
    end type AbstractMonolith
  
    abstract interface
      subroutine calc_interface(this)
        import :: AbstractMonolith
        class(AbstractMonolith), intent(inout) :: this
      end subroutine calc_interface
    end interface
  
    type, abstract :: AbstractFoundry
    contains
      procedure(forge_interface), deferred, pass :: create_monolith
    end type AbstractFoundry
  
    abstract interface
      function forge_interface(this) result(ptr)
        import :: AbstractFoundry, AbstractMonolith
        class(AbstractFoundry), intent(in) :: this
        class(AbstractMonolith), allocatable :: ptr
      end function forge_interface
    end interface
  end module abstract_factory_m
tags: [foundry, primordial, deep-earth]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

In the ancient days, before the Great Fracture, monoliths of pure computation were drawn from the deep earth. The Abstract Factory provides a blueprint for these primordial foundries, ensuring that the numerical constructs they produce belong to compatible families of logic, without exposing the raw punched-card mechanisms beneath.
