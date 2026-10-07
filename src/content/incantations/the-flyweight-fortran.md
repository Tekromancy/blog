---
title: Flyweight
description: Sharing intrinsic properties across vast swarms of numerical particles.
type: fortran
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Transmutation // Density"
formula: |2
  module flyweight_m
    implicit none
    private
    public :: ParticleIntrinsic, ParticleFactory, ParticleContext

    ! Intrinsic, shared state
    type :: ParticleIntrinsic
      character(len=32) :: arcane_signature
      real :: base_mass
    contains
      procedure, pass :: display_with_extrinsic
    end type ParticleIntrinsic

    type :: ParticleFactory
      type(ParticleIntrinsic), allocatable :: pool(:)
      integer :: pool_size = 0
    contains
      procedure, pass :: get_flyweight
    end type ParticleFactory

    ! Extrinsic, unique state
    type :: ParticleContext
      type(ParticleIntrinsic), pointer :: shared_data
      real :: x, y, z
    end type ParticleContext

  contains
    subroutine display_with_extrinsic(this, x, y, z)
      class(ParticleIntrinsic), intent(in) :: this
      real, intent(in) :: x, y, z
      ! Emits visual resonance at x, y, z based on base_mass and signature
    end subroutine display_with_extrinsic

    function get_flyweight(this, signature) result(ptr)
      class(ParticleFactory), intent(inout), target :: this
      character(len=*), intent(in) :: signature
      type(ParticleIntrinsic), pointer :: ptr
      ! Searches pool for existing intrinsic data, creates if missing
      ! Returns pointer to the shared instance.
      ptr => null()
    end function get_flyweight
  end module flyweight_m
tags: [particles, shared-state, swarm]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When simulating the collapse of an arcane nebula, instantiating millions of unique particles consumes vast expanses of core memory. The Flyweight pattern distills the intrinsic properties—base mass and arcane signature—into a shared pool, allowing massive swarms to be sustained with minimal crystalline footprint.
