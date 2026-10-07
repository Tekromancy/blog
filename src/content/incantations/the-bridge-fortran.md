---
title: Bridge
description: Decoupling the monolith's geometry from its arcane cooling system.
type: fortran
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Transmutation // Decoupling"
formula: |2
  module bridge_m
    implicit none
    private
    public :: CoolingSystem, LiquidNitrogen, ArcaneFrost, Monolith, ObsidianMonolith

    type, abstract :: CoolingSystem
    contains
      procedure(cool_interface), deferred, pass :: apply_cooling
    end type CoolingSystem

    abstract interface
      subroutine cool_interface(this, temperature)
        import :: CoolingSystem
        class(CoolingSystem), intent(inout) :: this
        real, intent(inout) :: temperature
      end subroutine cool_interface
    end interface

    type, extends(CoolingSystem) :: LiquidNitrogen
    contains
      procedure, pass :: apply_cooling => ln_cooling
    end type LiquidNitrogen

    type, extends(CoolingSystem) :: ArcaneFrost
    contains
      procedure, pass :: apply_cooling => frost_cooling
    end type ArcaneFrost

    type, abstract :: Monolith
      class(CoolingSystem), allocatable :: cooler
      real :: internal_temp = 5000.0
    contains
      procedure(monolith_op), deferred, pass :: operate
    end type Monolith

    abstract interface
      subroutine monolith_op(this)
        import :: Monolith
        class(Monolith), intent(inout) :: this
      end subroutine monolith_op
    end interface

    type, extends(Monolith) :: ObsidianMonolith
    contains
      procedure, pass :: operate => ob_operate
    end type ObsidianMonolith

  contains
    subroutine ln_cooling(this, temperature)
      class(LiquidNitrogen), intent(inout) :: this
      real, intent(inout) :: temperature
      temperature = temperature - 200.0
    end subroutine ln_cooling

    subroutine frost_cooling(this, temperature)
      class(ArcaneFrost), intent(inout) :: this
      real, intent(inout) :: temperature
      temperature = temperature - 500.0
    end subroutine frost_cooling

    subroutine ob_operate(this)
      class(ObsidianMonolith), intent(inout) :: this
      if (allocated(this%cooler)) then
        call this%cooler%apply_cooling(this%internal_temp)
      end if
    end subroutine ob_operate
  end module bridge_m
tags: [monolith, decoupling, cooling]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The structure of an Obsidian Monolith and the method used to cool its burning numerical core are two axes of massive complexity. The Bridge pattern separates the Monolith hierarchy from the Cooling mechanism hierarchy, allowing an architect to swap Liquid Nitrogen for Arcane Frost without re-chiseling the obsidian itself.
