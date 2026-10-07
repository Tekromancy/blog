---
title: State
description: Transitioning the monolith through rigid phases of combustion and calculation.
type: fortran
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Metamorphosis"
formula: |2
  module state_m
    implicit none
    private
    public :: State, MonolithContext, IdleState, ComputingState

    type, abstract :: State
    contains
      procedure(state_op), deferred, pass :: handle
    end type State

    abstract interface
      subroutine state_op(this, ctx)
        import :: State, MonolithContext
        class(State), intent(inout) :: this
        class(MonolithContext), intent(inout) :: ctx
      end subroutine state_op
    end interface

    type :: MonolithContext
      class(State), allocatable :: current_state
    contains
      procedure, pass :: request_operation
      procedure, pass :: change_state
    end type MonolithContext

    type, extends(State) :: IdleState
    contains
      procedure, pass :: handle => idle_handle
    end type IdleState

    type, extends(State) :: ComputingState
    contains
      procedure, pass :: handle => computing_handle
    end type ComputingState

  contains
    subroutine request_operation(this)
      class(MonolithContext), intent(inout) :: this
      if (allocated(this%current_state)) then
        call this%current_state%handle(this)
      end if
    end subroutine request_operation

    subroutine change_state(this, new_state)
      class(MonolithContext), intent(inout) :: this
      class(State), intent(in) :: new_state
      if (allocated(this%current_state)) deallocate(this%current_state)
      allocate(this%current_state, source=new_state)
    end subroutine change_state

    subroutine idle_handle(this, ctx)
      class(IdleState), intent(inout) :: this
      class(MonolithContext), intent(inout) :: ctx
      ! Perform idle rites, then transition
      call ctx%change_state(ComputingState())
    end subroutine idle_handle

    subroutine computing_handle(this, ctx)
      class(ComputingState), intent(inout) :: this
      class(MonolithContext), intent(inout) :: ctx
      ! Crunch numbers, return to idle
      call ctx%change_state(IdleState())
    end subroutine computing_handle
  end module state_m
tags: [phases, metamorphosis, context]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

A monolith cannot compute while it is purging coolant, nor can it accept punch cards while its core is ignited. The State pattern maps these rigid phases of existence, allowing the construct to transition its internal behavior dynamically without scattering complex branch logic throughout the spellform.
