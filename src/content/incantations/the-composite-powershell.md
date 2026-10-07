---
title: The Composite of Directory Trees
description: Compose objects into tree structures to represent part-whole hierarchies, treating individual objects and compositions uniformly.
type: powershell
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Divination // Sysadmin Telepathy"
formula: |2
  class IFileSystemNode {
      [int] GetSize() { throw "Not Implemented" }
  }

  class FileNode : IFileSystemNode {
      [string]$Name
      [int]$Size

      FileNode([string]$n, [int]$s) {
          $this.Name = $n; $this.Size = $s
      }

      [int] GetSize() { return $this.Size }
  }

  class DirectoryNode : IFileSystemNode {
      [string]$Name
      [System.Collections.Generic.List[IFileSystemNode]]$Children

      DirectoryNode([string]$n) {
          $this.Name = $n
          $this.Children = [System.Collections.Generic.List[IFileSystemNode]]::new()
      }

      [void] Add([IFileSystemNode]$node) {
          $this.Children.Add($node)
      }

      [int] GetSize() {
          [int]$total = 0
          foreach ($child in $this.Children) {
              $total += $child.GetSize()
          }
          return $total
      }
  }

  # Building the topology
  $root = [DirectoryNode]::new("C:\")
  $folder = [DirectoryNode]::new("C:\Scripts")
  $file1 = [FileNode]::new("script.ps1", 1024)
  $file2 = [FileNode]::new("data.csv", 2048)

  $folder.Add($file1)
  $folder.Add($file2)
  $root.Add($folder)

  Write-Host "Total size of $($root.Name) is $($root.GetSize()) bytes."
tags: [powershell, sysadmin, structural, composite, file-system]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The Composite pattern is a recursive scrying mechanism. It allows the sysadmin to treat a single file or an entire nested directory structure with the same universal logic.
