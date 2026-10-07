---
title: Observer
description: Subscribing arcane sentinels to thermal fluxes in the monolith.
type: fortran
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: Divination // Scrying
formula: |
  module observer_m
    implicit none
    private
    public :: Observer, Subject, Sentinel, ThermalCore
  
    type, abstract :: Observer
    contains
      procedure(update_obs), deferred, pass :: update
    end type Observer
  
    abstract interface
      subroutine update_obs(this, temp)
        import :: Observer
        class(Observer), intent(inout) :: this
        real, intent(in) :: temp
      end subroutine update_obs
    end interface
  
    type, extends(Observer) :: Sentinel
      integer :: id
    contains
      procedure, pass :: update => sentinel_update
    end type Sentinel
  
    type :: Subject
      class(Observer), allocatable :: observers(:)
    contains
      procedure, pass :: attach
      procedure, pass :: notify_all
    end type Subject
  
    type, extends(Subject) :: ThermalCore
      real :: temperature = 0.0
    contains
      procedure, pass :: set_temperature
    end type ThermalCore
  
  contains
    subroutine sentinel_update(this, temp)
      class(Sentinel), intent(inout) :: this
      real, intent(in) :: temp
      ! Log thermal spike or trigger alarms
    end subroutine sentinel_update
    
    subroutine attach(this, obs)
      class(Subject), intent(inout) :: this
      class(Observer), intent(in) :: obs
      ! Real Fortran array expansion logic omitted
    end subroutine attach
    
    subroutine notify_all(this, temp)
      class(Subject), intent(inout) :: this
      real, intent(in) :: temp
      integer :: i
      if (allocated(this%observers)) then
        do i = 1, size(this%observers)
          call this%observers(i)%update(temp)
        end do
      end if
    end subroutine notify_all
    
    subroutine set_temperature(this, temp)
      class(ThermalCore), intent(inout) :: this
      real, intent(in) :: temp
      this%temperature = temp
      call this%notify_all(temp)
    end subroutine set_temperature
  end module observer_m
tags: [scrying, thermal-core, publish-subscribe]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When the thermal core of a monolithic construct begins to overheat, multiple sentinels must react instantaneously to vent pressure and shift load. The Observer pattern allows these arcane sentinels to subscribe directly to the core's thermal telemetry, reacting seamlessly to the fluctuations without tight coupling.
