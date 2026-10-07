---
title: Memento
description: Sealing monolithic state arrays into immutable crystals for safe rollback.
type: fortran
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: Abjuration // Sealing
formula: |
  module memento_m
    implicit none
    private
    public :: Memento, Originator, Caretaker
  
    type :: Memento
      private
      real, allocatable :: state_matrix(:,:)
    contains
      procedure, pass :: get_state
    end type Memento
  
    type :: Originator
      real, allocatable :: current_state(:,:)
    contains
      procedure, pass :: save_to_memento
      procedure, pass :: restore_from_memento
    end type Originator
  
    type :: Caretaker
      type(Memento), allocatable :: history(:)
    end type Caretaker
  
  contains
    function get_state(this) result(st)
      class(Memento), intent(in) :: this
      real, allocatable :: st(:,:)
      if (allocated(this%state_matrix)) then
        allocate(st(size(this%state_matrix, 1), size(this%state_matrix, 2)))
        st = this%state_matrix
      end if
    end function get_state
    
    function save_to_memento(this) result(mem)
      class(Originator), intent(in) :: this
      type(Memento) :: mem
      if (allocated(this%current_state)) then
        allocate(mem%state_matrix(size(this%current_state, 1), size(this%current_state, 2)))
        mem%state_matrix = this%current_state
      end if
    end function save_to_memento
    
    subroutine restore_from_memento(this, mem)
      class(Originator), intent(inout) :: this
      class(Memento), intent(in) :: mem
      if (allocated(this%current_state)) deallocate(this%current_state)
      this%current_state = mem%get_state()
    end subroutine restore_from_memento
  end module memento_m
tags: [rollback, memory-crystal, state]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Deep earth numerical simulations run for decades; an anomaly in year twelve necessitates a rollback. The Memento pattern seals the entire state array into an immutable memory crystal. If the computation corrupts, the Originator simply shatters the current state and restores itself from the flawless crystal.
