---
title: Builder
description: Step-by-step assembly of colossal numerical simulation constructs.
type: fortran
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Conjuration // Architecture"
formula: |2
  module builder_m
    implicit none
    private
    public :: MonolithBuilder, Director, Monolith

    type :: Monolith
      integer :: core_count = 0
      real :: cooling_rate = 0.0
      logical :: has_punch_reader = .false.
    end type Monolith

    type, abstract :: MonolithBuilder
    contains
      procedure(build_cores), deferred, pass :: add_cores
      procedure(build_cooling), deferred, pass :: add_cooling
      procedure(get_result), deferred, pass :: get_monolith
    end type MonolithBuilder

    abstract interface
      subroutine build_cores(this, cores)
        import :: MonolithBuilder
        class(MonolithBuilder), intent(inout) :: this
        integer, intent(in) :: cores
      end subroutine build_cores

      subroutine build_cooling(this, rate)
        import :: MonolithBuilder
        class(MonolithBuilder), intent(inout) :: this
        real, intent(in) :: rate
      end subroutine build_cooling

      function get_result(this) result(res)
        import :: MonolithBuilder, Monolith
        class(MonolithBuilder), intent(in) :: this
        type(Monolith) :: res
      end function get_result
    end interface

    type :: Director
    contains
      procedure :: construct => director_construct
    end type Director

  contains
    subroutine director_construct(this, builder)
      class(Director), intent(inout) :: this
      class(MonolithBuilder), intent(inout) :: builder
      call builder%add_cores(1024)
      call builder%add_cooling(273.15)
    end subroutine director_construct
  end module builder_m
tags: [assembly, supercomputing, monolith]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Constructing a primordial supercomputer requires absolute precision. A missed punch card or an unaligned cooling vent can lead to catastrophic mana leaks. The Builder pattern orchestrates the step-by-step assembly of these massive constructs, separating the arcane architecture from the raw materials used to forge them.
