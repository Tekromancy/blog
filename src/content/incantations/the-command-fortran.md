---
title: Command
description: Encapsulating runic instructions for deferred execution on the mainframe.
type: fortran
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: Divination // Invocation
formula: |
  module command_m
    implicit none
    private
    public :: Command, MainframeReceiver, IgniteCommand, Invoker
  
    type :: MainframeReceiver
    contains
      procedure, pass :: apply_ignition
    end type MainframeReceiver
  
    type, abstract :: Command
    contains
      procedure(exec_cmd), deferred, pass :: execute
    end type Command
  
    abstract interface
      subroutine exec_cmd(this)
        import :: Command
        class(Command), intent(inout) :: this
      end subroutine exec_cmd
    end interface
  
    type, extends(Command) :: IgniteCommand
      type(MainframeReceiver), pointer :: receiver
    contains
      procedure, pass :: execute => execute_ignite
    end type IgniteCommand
    
    type :: Invoker
      class(Command), allocatable :: stored_command
    contains
      procedure, pass :: set_command
      procedure, pass :: trigger
    end type Invoker
  
  contains
    subroutine apply_ignition(this)
      class(MainframeReceiver), intent(inout) :: this
      ! The core receives the spark
    end subroutine apply_ignition
    
    subroutine execute_ignite(this)
      class(IgniteCommand), intent(inout) :: this
      if (associated(this%receiver)) then
        call this%receiver%apply_ignition()
      end if
    end subroutine execute_ignite
    
    subroutine set_command(this, cmd)
      class(Invoker), intent(inout) :: this
      class(Command), intent(in) :: cmd
      allocate(this%stored_command, source=cmd)
    end subroutine set_command
    
    subroutine trigger(this)
      class(Invoker), intent(inout) :: this
      if (allocated(this%stored_command)) then
        call this%stored_command%execute()
      end if
    end subroutine trigger
  end module command_m
tags: [invocation, mainframe, delayed-execution]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Spells meant for the great mainframe are not always cast immediately; they must be etched into runic crystals and queued for peak astral alignment. The Command pattern encapsulates the request, the receiver, and the parameters into a solitary, executable crystal that an Invoker can trigger when the stars align.
