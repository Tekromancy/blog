---
title: Singleton
description: The solitary High Monolith whose existence permeates the entire grid.
type: fortran
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: Abjuration // Sealing
formula: |
  module singleton_m
    implicit none
    private
    public :: get_high_monolith
    
    type :: HighMonolith
      integer :: grid_frequency = 432
    contains
      procedure, pass :: set_frequency
    end type HighMonolith
    
    type(HighMonolith), save, target :: the_instance
    logical, save :: is_initialized = .false.
    
  contains
    function get_high_monolith() result(ptr)
      type(HighMonolith), pointer :: ptr
      if (.not. is_initialized) then
        ! Perform complex deep-earth alignments
        is_initialized = .true.
      end if
      ptr => the_instance
    end function get_high_monolith
    
    subroutine set_frequency(this, freq)
      class(HighMonolith), intent(inout) :: this
      integer, intent(in) :: freq
      this%grid_frequency = freq
    end subroutine set_frequency
  end module singleton_m
tags: [monolith, solitude, global-state]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

There can be only one High Monolith at the center of the subterranean network. Attempting to conjure another would shatter the crust and unravel the local geometry. The Singleton ensures that all spells querying the master grid frequency commune with the exact same eternal construct.
