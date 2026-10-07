---
title: The External Visitor
description: Dispatching an auditor to perform heavy operations across a heterogeneous structure.
type: java
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Auditing"
formula: |2
  public interface CathedralElement {
      void accept(Auditor visitor);
  }

  public class RelicCache implements CathedralElement {
      public String getSacredHash() { return "0xDEADBEEF"; }

      @Override
      public void accept(Auditor visitor) {
          visitor.auditRelicCache(this);
      }
  }

  public class PrayerQueue implements CathedralElement {
      public int getBacklog() { return 9001; }

      @Override
      public void accept(Auditor visitor) {
          visitor.auditPrayerQueue(this);
      }
  }

  public interface Auditor {
      void auditRelicCache(RelicCache cache);
      void auditPrayerQueue(PrayerQueue queue);
  }

  public class ComplianceAuditor implements Auditor {
      @Override
      public void auditRelicCache(RelicCache cache) {
          System.out.println("Auditing Relic Cache. Hash verified: " + cache.getSacredHash());
      }

      @Override
      public void auditPrayerQueue(PrayerQueue queue) {
          System.out.println("Auditing Prayer Queue. Backlog stands at: " + queue.getBacklog());
      }
  }
tags: [visitor, double-dispatch, auditing, enterprise]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

Adding new operational methods directly into a massive, stable object hierarchy violates the Open-Closed principle and risks structural collapse. The Java Cathedral utilizes the **Visitor** pattern to execute sweeping changes without touching the original artifacts.

By utilizing "Double Dispatch", the elements (`RelicCache`, `PrayerQueue`) simply implement an `accept()` method that takes an `Auditor`. When called, they pass `this` back to the auditor's specific overload method. The `ComplianceAuditor` can then traverse the entire object graph, performing intense bureaucratic scrutiny, while the underlying elements remain pure data structures oblivious to the heavy logic applied over them.
