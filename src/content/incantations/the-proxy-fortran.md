---
title: Proxy
description: Controlling access to a volatile deep-earth monolith via an astral surrogate.
type: fortran
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: Transmutation // Surrogate
formula: |
  module proxy_m
    implicit none
    private
    public :: AbstractCore, RealMonolithCore, ProxyMonolithCore
  
    type, abstract :: AbstractCore
    contains
      procedure(core_calc), deferred, pass :: calculate
    end type AbstractCore
  
    abstract interface
      subroutine core_calc(this)
        import :: AbstractCore
        class(AbstractCore), intent(inout) :: this
      end subroutine core_calc
    end interface
  
    type, extends(AbstractCore) :: RealMonolithCore
    contains
      procedure, pass :: calculate => real_calc
    end type RealMonolithCore
  
    type, extends(AbstractCore) :: ProxyMonolithCore
      type(RealMonolithCore), pointer :: real_subject => null()
      logical :: has_access = .false.
    contains
      procedure, pass :: calculate => proxy_calc
      procedure, pass :: grant_access
    end type ProxyMonolithCore
  
  contains
    subroutine real_calc(this)
      class(RealMonolithCore), intent(inout) :: this
      ! Intensive deep earth calculation
    end subroutine real_calc
    
    subroutine grant_access(this)
      class(ProxyMonolithCore), intent(inout) :: this
      this%has_access = .true.
      allocate(this%real_subject)
    end subroutine grant_access
    
    subroutine proxy_calc(this)
      class(ProxyMonolithCore), intent(inout) :: this
      if (this%has_access .and. associated(this%real_subject)) then
        call this%real_subject%calculate()
      else
        ! Deny access or perform lazy initialization
      end if
    end subroutine proxy_calc
  end module proxy_m
tags: [proxy, access-control, surrogate]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Interfacing directly with a Deep-Earth Monolith requires incredible fortitude and can scorch an unprepared caster. The Proxy provides an astral surrogate, a lightweight shadow of the true core that delays initialization and manages access rites until the actual heavy computation is absolutely necessary.
