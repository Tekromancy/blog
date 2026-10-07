---
title: Prototype
description: Cloning ancient runic state arrays to avoid expensive geological recalculations.
type: fortran
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Cloning"
formula: |2
  module prototype_m
    implicit none
    private
    public :: CloneableRune

    type, abstract :: CloneableRune
    contains
      procedure(clone_interface), deferred, pass :: clone
    end type CloneableRune

    abstract interface
      function clone_interface(this) result(copy)
        import :: CloneableRune
        class(CloneableRune), intent(in) :: this
        class(CloneableRune), allocatable :: copy
      end function clone_interface
    end interface

    type, extends(CloneableRune), public :: DeepEarthRune
      real, allocatable :: state_matrix(:,:)
    contains
      procedure, pass :: clone => clone_deep_earth
    end type DeepEarthRune

  contains
    function clone_deep_earth(this) result(copy)
      class(DeepEarthRune), intent(in) :: this
      class(CloneableRune), allocatable :: copy
      type(DeepEarthRune), allocatable :: actual_copy

      allocate(actual_copy)
      if (allocated(this%state_matrix)) then
        allocate(actual_copy%state_matrix(size(this%state_matrix, 1), size(this%state_matrix, 2)))
        actual_copy%state_matrix = this%state_matrix
      end if

      call move_alloc(actual_copy, copy)
    end function clone_deep_earth
  end module prototype_m
tags: [cloning, arrays, runic]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Recalculating the state matrices of a deep earth monolith takes centuries of geothermal pressure. Rather than computing a new matrix from scratch, the Prototype pattern allows a master cryomancer to cast a quick clone of an existing runic array, preserving its ancient state identically into a new memory segment.
