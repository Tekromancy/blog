---
title: Composite
description: Treating individual punched cards and whole decks with a unified invocation.
type: fortran
gofPattern: Composite
gofCategory: Structural
arcaneSchool: Transmutation // Aggregation
formula: |
  module composite_m
    implicit none
    private
    public :: CardComponent, SingleCard, CardDeck
  
    type, abstract :: CardComponent
    contains
      procedure(exec_interface), deferred, pass :: execute
    end type CardComponent
  
    abstract interface
      subroutine exec_interface(this)
        import :: CardComponent
        class(CardComponent), intent(in) :: this
      end subroutine exec_interface
    end interface
  
    type, extends(CardComponent) :: SingleCard
      integer :: instruction_code
    contains
      procedure, pass :: execute => exec_single
    end type SingleCard
  
    type, extends(CardComponent) :: CardDeck
      class(CardComponent), allocatable :: children(:)
    contains
      procedure, pass :: execute => exec_deck
      procedure, pass :: add => add_child
    end type CardDeck
  
  contains
    subroutine exec_single(this)
      class(SingleCard), intent(in) :: this
      ! Emit instruction code via punch reader
    end subroutine exec_single
    
    subroutine exec_deck(this)
      class(CardDeck), intent(in) :: this
      integer :: i
      if (allocated(this%children)) then
        do i = 1, size(this%children)
          call this%children(i)%execute()
        end do
      end if
    end subroutine exec_deck
    
    subroutine add_child(this, child)
      class(CardDeck), intent(inout) :: this
      class(CardComponent), intent(in) :: child
      ! Real Fortran array reallocation logic omitted for brevity
    end subroutine add_child
  end module composite_m
tags: [punch-cards, aggregation, recursive]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

In primordial supercomputing, a single punched card executes a basic instruction, while a tightly bound deck executes an entire subroutine. The Composite pattern unifies these concepts, allowing a tekromancer to feed either a lone card or an entire deck into the great reader using the exact same arcane binding.
