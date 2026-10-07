---
title: Factory Method
description: Delegating the instantiation of computational matrices to subclasses.
type: fortran
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Supercomputing"
formula: |2
  module factory_method_m
    implicit none
    private
    public :: MatrixEngine, AbstractCreator

    type, abstract :: MatrixEngine
    contains
      procedure(engine_run), deferred, pass :: execute
    end type MatrixEngine

    abstract interface
      subroutine engine_run(this)
        import :: MatrixEngine
        class(MatrixEngine), intent(inout) :: this
      end subroutine engine_run
    end interface

    type, abstract :: AbstractCreator
    contains
      procedure(create_engine), deferred, pass :: factory_method
      procedure :: compute => creator_compute
    end type AbstractCreator

    abstract interface
      function create_engine(this) result(engine)
        import :: AbstractCreator, MatrixEngine
        class(AbstractCreator), intent(in) :: this
        class(MatrixEngine), allocatable :: engine
      end function create_engine
    end interface

  contains
    subroutine creator_compute(this)
      class(AbstractCreator), intent(in) :: this
      class(MatrixEngine), allocatable :: engine

      engine = this%factory_method()
      call engine%execute()
    end subroutine creator_compute
  end module factory_method_m
tags: [instantiation, matrix, deep-earth]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When traversing the subterranean labyrinths of the old world, one encounters numerous ancient terminals. The Factory Method allows a base terminal to define the algorithm for computing matrices while delegating the actual creation of the engine to specific geological strata subclasses.
