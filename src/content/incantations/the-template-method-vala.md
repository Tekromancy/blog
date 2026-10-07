---
title: "The Template Method: The Runbook"
description: "Define the skeleton of an algorithm in an operation, deferring some steps to subclasses."
type: vala
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Evocation // Sequencing"
formula: |2
  public abstract class GNOMEArtifice.CyberHeist : Object {
      public void execute_heist() {
          recon();
          bypass_security();
          extract_data();
      }
  
      protected abstract void recon();
      protected abstract void bypass_security();
  
      // Hook with default behavior
      protected virtual void extract_data() {
          print("Extracting raw files from mainframe...\n");
      }
  }
  
  public class GNOMEArtifice.CorpHeist : CyberHeist {
      protected override void recon() {
          print("Scanning corporate orbital nodes...\n");
      }
  
      protected override void bypass_security() {
          print("Deploying ICE-breakers against corp firewalls...\n");
      }
  }
  
  public class GNOMEArtifice.BankHeist : CyberHeist {
      protected override void recon() {
          print("Mapping financial subnet topographies...\n");
      }
  
      protected override void bypass_security() {
          print("Spoofing biometric authentication keys...\n");
      }
  
      protected override void extract_data() {
          print("Siphoning unassigned crypto-credits...\n");
      }
  }
tags: [Vala, GObject, Behavioral, Template]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

A successful run is governed by a strict sequence: you recon, you bypass, you extract. The Template Method pattern carves this sequence into stone within the base `CyberHeist` runbook. Subclasses—be it a Corporate Heist or a Bank Run—fill in the specific, terrifying details of each step. The core rhythm of the GNOME Artifice execution is thus preserved, preventing rookie runners from skipping crucial steps in the heat of the trace.
