---
title: Decorator
description: Layering resonant shielding on core monolith procedures dynamically.
type: fortran
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: Transmutation // Shielding
formula: |
  module decorator_m
    implicit none
    private
    public :: CoreComponent, MonolithCore, Decorator, ShieldedMonolith
  
    type, abstract :: CoreComponent
    contains
      procedure(comp_op), deferred, pass :: execute
    end type CoreComponent
  
    abstract interface
      subroutine comp_op(this)
        import :: CoreComponent
        class(CoreComponent), intent(inout) :: this
      end subroutine comp_op
    end interface
  
    type, extends(CoreComponent) :: MonolithCore
    contains
      procedure, pass :: execute => core_exec
    end type MonolithCore
  
    type, abstract, extends(CoreComponent) :: Decorator
      class(CoreComponent), allocatable :: wrapped
    contains
      procedure, pass :: execute => decorator_exec
    end type Decorator
  
    type, extends(Decorator) :: ShieldedMonolith
      real :: shield_resonance = 1.0
    contains
      procedure, pass :: execute => shielded_exec
    end type ShieldedMonolith
  
  contains
    subroutine core_exec(this)
      class(MonolithCore), intent(inout) :: this
      ! Raw numerical combustion
    end subroutine core_exec
    
    subroutine decorator_exec(this)
      class(Decorator), intent(inout) :: this
      if (allocated(this%wrapped)) then
        call this%wrapped%execute()
      end if
    end subroutine decorator_exec
    
    subroutine shielded_exec(this)
      class(ShieldedMonolith), intent(inout) :: this
      ! Spin up resonance before passing to core
      this%shield_resonance = this%shield_resonance * 1.5
      call this%decorator_exec()
    end subroutine shielded_exec
  end module decorator_m
tags: [shielding, dynamic-layers, monolith]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Exposing a raw monolithic core to the ethereal streams can cause numerical fallout. The Decorator spell binds resonant shielding around the core dynamically, allowing a tekromancer to stack layers of arcane protection and telemetry without fundamentally altering the deep earth computation beneath.
