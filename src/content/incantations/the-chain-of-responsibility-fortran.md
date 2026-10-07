---
title: Chain of Responsibility
description: Passing numeric anomalies through a hierarchy of ancient wardens.
type: fortran
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Divination // Wardens"
formula: |2
  module chain_of_responsibility_m
    implicit none
    private
    public :: Handler, ConcreteWardenA, ConcreteWardenB

    type, abstract :: Handler
      class(Handler), pointer :: next_handler => null()
    contains
      procedure(handle_req), deferred, pass :: handle_anomaly
      procedure, pass :: set_next
    end type Handler

    abstract interface
      subroutine handle_req(this, severity)
        import :: Handler
        class(Handler), intent(inout) :: this
        integer, intent(in) :: severity
      end subroutine handle_req
    end interface

    type, extends(Handler) :: ConcreteWardenA
    contains
      procedure, pass :: handle_anomaly => warden_a_handle
    end type ConcreteWardenA

    type, extends(Handler) :: ConcreteWardenB
    contains
      procedure, pass :: handle_anomaly => warden_b_handle
    end type ConcreteWardenB

  contains
    subroutine set_next(this, next_h)
      class(Handler), intent(inout) :: this
      class(Handler), target, intent(in) :: next_h
      this%next_handler => next_h
    end subroutine set_next

    subroutine warden_a_handle(this, severity)
      class(ConcreteWardenA), intent(inout) :: this
      integer, intent(in) :: severity
      if (severity <= 10) then
        ! Handled by minor warden
      else if (associated(this%next_handler)) then
        call this%next_handler%handle_anomaly(severity)
      end if
    end subroutine warden_a_handle

    subroutine warden_b_handle(this, severity)
      class(ConcreteWardenB), intent(inout) :: this
      integer, intent(in) :: severity
      if (severity > 10) then
        ! Handled by major warden
      else if (associated(this%next_handler)) then
        call this%next_handler%handle_anomaly(severity)
      end if
    end subroutine warden_b_handle
  end module chain_of_responsibility_m
tags: [anomalies, hierarchy, wardens]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When the supercomputing monolith detects a numeric anomaly—a division by zero, a resonance cascade—the distress signal is passed up a chain of ancient wardens. If a minor warden cannot contain the flux, it defers to the next, ensuring the anomaly finds the appropriate tier of arcane resolution without hardcoding the path.
