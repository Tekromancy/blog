---
title: Mediator
description: A central arbiter for conflicting mainframe subsystems.
type: fortran
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Enchantment // Arbitration"
formula: |2
  module mediator_m
    implicit none
    private
    public :: Mediator, Subsystem, CoolingSystem, PowerCore, MainframeMediator

    type, abstract :: Mediator
    contains
      procedure(notify_med), deferred, pass :: notify
    end type Mediator

    abstract interface
      subroutine notify_med(this, sender, event)
        import :: Mediator, Subsystem
        class(Mediator), intent(inout) :: this
        class(Subsystem), intent(in) :: sender
        character(len=*), intent(in) :: event
      end subroutine notify_med
    end interface

    type, abstract :: Subsystem
      class(Mediator), pointer :: arbiter => null()
    end type Subsystem

    type, extends(Subsystem) :: CoolingSystem
    contains
      procedure, pass :: trigger_pump
    end type CoolingSystem

    type, extends(Subsystem) :: PowerCore
    contains
      procedure, pass :: surge_power
    end type PowerCore

    type, extends(Mediator) :: MainframeMediator
      type(CoolingSystem), pointer :: cooler
      type(PowerCore), pointer :: core
    contains
      procedure, pass :: notify => med_notify
    end type MainframeMediator

  contains
    subroutine trigger_pump(this)
      class(CoolingSystem), intent(inout) :: this
      if (associated(this%arbiter)) call this%arbiter%notify(this, "PUMP_ACTIVE")
    end subroutine trigger_pump

    subroutine surge_power(this)
      class(PowerCore), intent(inout) :: this
      if (associated(this%arbiter)) call this%arbiter%notify(this, "SURGE")
    end subroutine surge_power

    subroutine med_notify(this, sender, event)
      class(MainframeMediator), intent(inout) :: this
      class(Subsystem), intent(in) :: sender
      character(len=*), intent(in) :: event

      if (event == "SURGE") then
        ! Power core is surging, tell cooling to activate
        call this%cooler%trigger_pump()
      end if
    end subroutine med_notify
  end module mediator_m
tags: [arbitration, mainframe, subsystems]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Left to their own logic, the Power Core might surge before the Cooling Pumps activate, melting the monolith. The Mediator pattern institutes a central arbiter—a Mainframe Mediator—that listens to the erratic whispers of all subsystems and orchestrates their symphony safely.
