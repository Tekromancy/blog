---
title: The Hierarchical Composite
description: Treating individual clerics and vast bureaucratic departments as uniform components.
type: java
gofPattern: Composite
gofCategory: Structural
arcaneSchool: Illusion // Holography
formula: |
  import java.util.ArrayList;
  import java.util.List;
  
  public interface CathedralComponent {
      void audit();
  }
  
  public class Cleric implements CathedralComponent {
      private final String name;
      
      public Cleric(String name) {
          this.name = name;
      }
      
      @Override
      public void audit() {
          System.out.println("Cleric " + name + " passes the enterprise audit.");
      }
  }
  
  public class Department implements CathedralComponent {
      private final String departmentName;
      private final List<CathedralComponent> components = new ArrayList<>();
      
      public Department(String departmentName) {
          this.departmentName = departmentName;
      }
      
      public void add(CathedralComponent component) {
          components.add(component);
      }
      
      @Override
      public void audit() {
          System.out.println("Auditing department: " + departmentName);
          for (CathedralComponent component : components) {
              component.audit();
          }
      }
  }
tags: [composite, tree, hierarchy, enterprise]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The organizational chart of the Java Cathedral is an abyssal tree of departments, sub-departments, and individual clerics. The **Composite** pattern weaves an illusion that allows higher-level invocations to treat a single `Cleric` exactly the same as an entire `Department`.

By implementing the `CathedralComponent` interface, an `audit()` call on the root node cascades perfectly down the hierarchy. The caller needs no complex `instanceof` checks to determine if they are auditing a leaf or a branch; the structural magic handles the recursion gracefully, fulfilling the enterprise's endless thirst for standardized metrics.
