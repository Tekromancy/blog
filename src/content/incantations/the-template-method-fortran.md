---
title: Template Method
description: Standardizing the lifecycle of a numerical simulation spell.
type: fortran
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: Abjuration // Formalism
formula: |
  module template_method_m
    implicit none
    private
    public :: SimulationTemplate, GeoSimulation
  
    type, abstract :: SimulationTemplate
    contains
      procedure, pass :: run_simulation
      procedure(step_if), deferred, pass :: initialize_core
      procedure(step_if), deferred, pass :: crunch_numbers
      procedure(step_if), deferred, pass :: vent_heat
    end type SimulationTemplate
  
    abstract interface
      subroutine step_if(this)
        import :: SimulationTemplate
        class(SimulationTemplate), intent(inout) :: this
      end subroutine step_if
    end interface
  
    type, extends(SimulationTemplate) :: GeoSimulation
    contains
      procedure, pass :: initialize_core => geo_init
      procedure, pass :: crunch_numbers => geo_crunch
      procedure, pass :: vent_heat => geo_vent
    end type GeoSimulation
  
  contains
    subroutine run_simulation(this)
      class(SimulationTemplate), intent(inout) :: this
      ! The inflexible skeletal algorithm
      call this%initialize_core()
      call this%crunch_numbers()
      call this%vent_heat()
    end subroutine run_simulation
    
    subroutine geo_init(this)
      class(GeoSimulation), intent(inout) :: this
    end subroutine geo_init
    
    subroutine geo_crunch(this)
      class(GeoSimulation), intent(inout) :: this
    end subroutine geo_crunch
    
    subroutine geo_vent(this)
      class(GeoSimulation), intent(inout) :: this
    end subroutine geo_vent
  end module template_method_m
tags: [lifecycle, formalism, skeleton]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Certain rituals must be performed in exact sequence: first ignite the core, then crunch the numbers, finally vent the excessive heat. The Template Method cements this skeleton into a base class, ensuring that any specialized simulation follows the rigorous canonical lifecycle while supplying its own specific nuances.
