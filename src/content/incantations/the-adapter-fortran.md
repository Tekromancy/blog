---
title: Adapter
description: Translating arcane punch cards into modern hyper-thread arrays.
type: fortran
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Translation"
formula: |2
  module adapter_m
    implicit none
    private
    public :: ModernInterface, PunchCardReader, CardAdapter

    type, abstract :: ModernInterface
    contains
      procedure(process_stream), deferred, pass :: ingest_data
    end type ModernInterface

    abstract interface
      subroutine process_stream(this, data_stream)
        import :: ModernInterface
        class(ModernInterface), intent(inout) :: this
        integer, intent(in) :: data_stream(:)
      end subroutine process_stream
    end interface

    type :: PunchCardReader
    contains
      procedure, pass :: read_card_hole
    end type PunchCardReader

    type, extends(ModernInterface) :: CardAdapter
      type(PunchCardReader) :: ancient_reader
    contains
      procedure, pass :: ingest_data => adapter_ingest
    end type CardAdapter

  contains
    subroutine read_card_hole(this, row, col, val)
      class(PunchCardReader), intent(inout) :: this
      integer, intent(in) :: row, col
      integer, intent(out) :: val
      val = row * col ! Mocked ancient reading
    end subroutine read_card_hole

    subroutine adapter_ingest(this, data_stream)
      class(CardAdapter), intent(inout) :: this
      integer, intent(in) :: data_stream(:)
      integer :: i, val
      ! Translate modern stream back to punch card holes
      do i = 1, size(data_stream)
        call this%ancient_reader%read_card_hole(i, 1, val)
      end do
    end subroutine adapter_ingest
  end module adapter_m
tags: [translation, punch-cards, legacy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Many numerical simulacra still run on the primordial punch cards left behind by the ancient architects. When integrating these old-world constructs into modern hyper-thread weave topologies, the Adapter spell acts as a translator, shifting the rigid column alignments into fluid vector streams.
