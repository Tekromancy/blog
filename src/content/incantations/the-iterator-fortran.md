---
title: Iterator
description: Traversing arrays of crystalline memory without exposing the lattice.
type: fortran
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: Divination // Traversal
formula: |
  module iterator_m
    implicit none
    private
    public :: Iterator, IterableCollection, MemoryLattice, LatticeIterator
  
    type, abstract :: Iterator
    contains
      procedure(has_next_if), deferred, pass :: has_next
      procedure(get_next_if), deferred, pass :: get_next
    end type Iterator
  
    abstract interface
      function has_next_if(this) result(res)
        import :: Iterator
        class(Iterator), intent(in) :: this
        logical :: res
      end function has_next_if
      
      function get_next_if(this) result(val)
        import :: Iterator
        class(Iterator), intent(inout) :: this
        integer :: val
      end function get_next_if
    end interface
  
    type, abstract :: IterableCollection
    contains
      procedure(create_iter), deferred, pass :: create_iterator
    end type IterableCollection
  
    abstract interface
      function create_iter(this) result(iter)
        import :: IterableCollection, Iterator
        class(IterableCollection), intent(in), target :: this
        class(Iterator), allocatable :: iter
      end function create_iter
    end interface
  
    type, extends(IterableCollection) :: MemoryLattice
      integer, allocatable :: crystals(:)
    contains
      procedure, pass :: create_iterator => ml_create_iter
    end type MemoryLattice
    
    type, extends(Iterator) :: LatticeIterator
      type(MemoryLattice), pointer :: collection
      integer :: current_index = 1
    contains
      procedure, pass :: has_next => li_has_next
      procedure, pass :: get_next => li_get_next
    end type LatticeIterator
  
  contains
    function ml_create_iter(this) result(iter)
      class(MemoryLattice), intent(in), target :: this
      class(Iterator), allocatable :: iter
      type(LatticeIterator), allocatable :: actual_iter
      
      allocate(actual_iter)
      actual_iter%collection => this
      call move_alloc(actual_iter, iter)
    end function ml_create_iter
    
    function li_has_next(this) result(res)
      class(LatticeIterator), intent(in) :: this
      logical :: res
      res = (this%current_index <= size(this%collection%crystals))
    end function li_has_next
    
    function li_get_next(this) result(val)
      class(LatticeIterator), intent(inout) :: this
      integer :: val
      val = this%collection%crystals(this%current_index)
      this%current_index = this%current_index + 1
    end function li_get_next
  end module iterator_m
tags: [traversal, lattice, memory]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The physical topology of a Memory Lattice is intricate, prone to shattering if probed incorrectly. The Iterator pattern provides a safe, standard mechanism to traverse these crystalline arrays of data sequentially, keeping the delicate three-dimensional indexing logic hidden from the caster.
