---
title: Strategy
description: Swappable algorithms for matrix factorization within the deep earth.
type: fortran
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Divination // Algorithmics"
formula: |2
  module strategy_m
    implicit none
    private
    public :: FactorizationStrategy, CholeskyAlg, LUAlg, SolverContext

    type, abstract :: FactorizationStrategy
    contains
      procedure(solve_eq), deferred, pass :: execute
    end type FactorizationStrategy

    abstract interface
      subroutine solve_eq(this, matrix)
        import :: FactorizationStrategy
        class(FactorizationStrategy), intent(in) :: this
        real, intent(inout) :: matrix(:,:)
      end subroutine solve_eq
    end interface

    type, extends(FactorizationStrategy) :: CholeskyAlg
    contains
      procedure, pass :: execute => cholesky_exec
    end type CholeskyAlg

    type, extends(FactorizationStrategy) :: LUAlg
    contains
      procedure, pass :: execute => lu_exec
    end type LUAlg

    type :: SolverContext
      class(FactorizationStrategy), allocatable :: strategy
    contains
      procedure, pass :: set_strategy
      procedure, pass :: solve
    end type SolverContext

  contains
    subroutine cholesky_exec(this, matrix)
      class(CholeskyAlg), intent(in) :: this
      real, intent(inout) :: matrix(:,:)
      ! Perform Cholesky Decomposition
    end subroutine cholesky_exec

    subroutine lu_exec(this, matrix)
      class(LUAlg), intent(in) :: this
      real, intent(inout) :: matrix(:,:)
      ! Perform LU Factorization
    end subroutine lu_exec

    subroutine set_strategy(this, strat)
      class(SolverContext), intent(inout) :: this
      class(FactorizationStrategy), intent(in) :: strat
      if (allocated(this%strategy)) deallocate(this%strategy)
      allocate(this%strategy, source=strat)
    end subroutine set_strategy

    subroutine solve(this, matrix)
      class(SolverContext), intent(inout) :: this
      real, intent(inout) :: matrix(:,:)
      if (allocated(this%strategy)) then
        call this%strategy%execute(matrix)
      end if
    end subroutine solve
  end module strategy_m
tags: [algorithms, matrix, dynamic-resolution]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Resolving massive matrices in the deep earth requires varying approaches based on rock density and arcane saturation. The Strategy pattern encapsulates specific factorization algorithms—like Cholesky or LU—allowing the caster to swap out the numerical approach at runtime without restructuring the central invocation.
