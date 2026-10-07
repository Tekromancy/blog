---
title: Facade
description: A unified interface to the ancient, sprawling subsystems of a subterranean mainframe.
type: fortran
gofPattern: Facade
gofCategory: Structural
arcaneSchool: "Transmutation // Subsystem Binding"
formula: |2
  module facade_m
    implicit none
    private
    public :: MainframeFacade

    ! Complex Subsystems
    type :: CoolingSubsystem
    contains
      procedure, pass :: pump_nitrogen
    end type CoolingSubsystem

    type :: PowerSubsystem
    contains
      procedure, pass :: ignite_core
    end type PowerSubsystem

    type :: MemorySubsystem
    contains
      procedure, pass :: load_punch_cards
    end type MemorySubsystem

    ! The Facade
    type :: MainframeFacade
      type(CoolingSubsystem) :: cooler
      type(PowerSubsystem) :: power
      type(MemorySubsystem) :: memory
    contains
      procedure, pass :: cold_boot
    end type MainframeFacade

  contains
    subroutine pump_nitrogen(this)
      class(CoolingSubsystem), intent(inout) :: this
    end subroutine pump_nitrogen

    subroutine ignite_core(this)
      class(PowerSubsystem), intent(inout) :: this
    end subroutine ignite_core

    subroutine load_punch_cards(this)
      class(MemorySubsystem), intent(inout) :: this
    end subroutine load_punch_cards

    subroutine cold_boot(this)
      class(MainframeFacade), intent(inout) :: this
      call this%cooler%pump_nitrogen()
      call this%power%ignite_core()
      call this%memory%load_punch_cards()
    end subroutine cold_boot
  end module facade_m
tags: [mainframe, unified-interface, simplification]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

To awaken a subterranean mainframe involves coordinating thousands of disjointed archaic subsystems: the nitrogen cooling pumps, the crystal power relays, the punch-card memory drives. The Facade provides a single, high-level incantation—a cold boot—shielding the caster from the terrifying complexity of the raw machinery.
