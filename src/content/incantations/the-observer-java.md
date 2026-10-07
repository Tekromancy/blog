---
title: The Omnipresent Observer
description: Broadcasting holy decrees from a central subject to a multitude of silent acolytes.
type: java
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: Divination // Broadcasting
formula: |
  import java.util.ArrayList;
  import java.util.List;
  
  public interface Acolyte {
      void update(String decree);
  }
  
  public class HighAltar {
      private final List<Acolyte> congregation = new ArrayList<>();
      private String latestDecree;
      
      public void subscribe(Acolyte acolyte) {
          congregation.add(acolyte);
      }
      
      public void issueDecree(String decree) {
          this.latestDecree = decree;
          System.out.println("High Altar issues decree: " + decree);
          for (Acolyte acolyte : congregation) {
              acolyte.update(decree);
          }
      }
  }
  
  public class ScribeAcolyte implements Acolyte {
      private final String name;
      
      public ScribeAcolyte(String name) {
          this.name = name;
      }
      
      @Override
      public void update(String decree) {
          System.out.println("Acolyte " + name + " meticulously records: " + decree);
      }
  }
tags: [observer, pubsub, broadcasting, enterprise]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When the High Pontiffs of the Cathedral change a core policy, the information must propagate instantly to thousands of dependent subsystems. The **Observer** pattern enables a one-to-many dependency without locking the subject into rigid knowledge of its listeners.

The `HighAltar` acts as the Publisher. It maintains a list of any entity implementing the `Acolyte` interface. When `issueDecree()` is invoked, the Altar iterates through the congregation, triggering their `update()` logic. The Cathedral remains decoupled; the Altar does not care if the acolyte is a scribe, a logging daemon, or a UI renderer.
