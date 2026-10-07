---
title: Visitor
description: Dispatching deep-earth inspectors to analyze varied runic data nodes.
type: fortran
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: Divination // Inspection
formula: |
  module visitor_m
    implicit none
    private
    public :: RunicVisitor, DataNode, MatrixNode, ScalarNode, IntegrityInspector
  
    type, abstract :: RunicVisitor
    contains
      procedure(visit_mat), deferred, pass :: visit_matrix
      procedure(visit_scl), deferred, pass :: visit_scalar
    end type RunicVisitor
  
    type, abstract :: DataNode
    contains
      procedure(accept_vis), deferred, pass :: accept
    end type DataNode
    
    abstract interface
      subroutine visit_mat(this, node)
        import :: RunicVisitor, DataNode
        class(RunicVisitor), intent(inout) :: this
        class(DataNode), intent(inout) :: node ! should be MatrixNode in impl
      end subroutine visit_mat
      
      subroutine visit_scl(this, node)
        import :: RunicVisitor, DataNode
        class(RunicVisitor), intent(inout) :: this
        class(DataNode), intent(inout) :: node ! should be ScalarNode in impl
      end subroutine visit_scl
      
      subroutine accept_vis(this, visitor)
        import :: DataNode, RunicVisitor
        class(DataNode), intent(inout) :: this
        class(RunicVisitor), intent(inout) :: visitor
      end subroutine accept_vis
    end interface
  
    type, extends(DataNode) :: MatrixNode
    contains
      procedure, pass :: accept => mat_accept
    end type MatrixNode
  
    type, extends(DataNode) :: ScalarNode
    contains
      procedure, pass :: accept => scl_accept
    end type ScalarNode
    
    type, extends(RunicVisitor) :: IntegrityInspector
    contains
      procedure, pass :: visit_matrix => inspect_mat
      procedure, pass :: visit_scalar => inspect_scl
    end type IntegrityInspector
  
  contains
    subroutine mat_accept(this, visitor)
      class(MatrixNode), intent(inout) :: this
      class(RunicVisitor), intent(inout) :: visitor
      call visitor%visit_matrix(this)
    end subroutine mat_accept
    
    subroutine scl_accept(this, visitor)
      class(ScalarNode), intent(inout) :: this
      class(RunicVisitor), intent(inout) :: visitor
      call visitor%visit_scalar(this)
    end subroutine scl_accept
    
    subroutine inspect_mat(this, node)
      class(IntegrityInspector), intent(inout) :: this
      class(DataNode), intent(inout) :: node
      ! Inspect Matrix integrity
    end subroutine inspect_mat
    
    subroutine inspect_scl(this, node)
      class(IntegrityInspector), intent(inout) :: this
      class(DataNode), intent(inout) :: node
      ! Inspect Scalar integrity
    end subroutine inspect_scl
  end module visitor_m
tags: [inspection, nodes, double-dispatch]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

A sprawling monolith contains many heterogeneous runic data structures. The Visitor pattern dispatches inspectors to analyze these structures, using double-dispatch logic to execute the precise validation incantation for matrices or scalars, without forcing the data nodes themselves to comprehend the inspection process.
