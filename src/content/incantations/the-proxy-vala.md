---
title: "The Proxy: The Guardian of the Vault"
description: "Provide a surrogate or placeholder for another object to control access to it."
type: vala
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Warding"
formula: |2
  public interface GNOMEArtifice.DataVault : Object {
      public abstract void access_data();
  }
  
  public class GNOMEArtifice.SecureVault : Object, DataVault {
      public void access_data() {
          print("Accessing heavily encrypted arcane records...\n");
      }
  }
  
  public class GNOMEArtifice.VaultProxy : Object, DataVault {
      private SecureVault real_vault;
      private int clearance_level;
  
      public VaultProxy(int clearance_level) {
          this.clearance_level = clearance_level;
      }
  
      public void access_data() {
          if (this.clearance_level >= 5) {
              if (this.real_vault == null) {
                  this.real_vault = new SecureVault();
              }
              this.real_vault.access_data();
          } else {
              print("Access Denied: Insufficient clearance level.\n");
          }
      }
  }
tags: [Vala, GObject, Structural, Proxy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

Not every supplicant possesses the credentials to parse the inner truths of the GNOME mainframe. Exposing the core `SecureVault` risks premature initialization and unauthorized exfiltration of runic data. The Proxy pattern instantiates a guardian. It implements the identical interface as the Vault, taking the query, verifying the caster's clearance level, and only then summoning the heavy, actual Vault object from the digital void to yield its secrets.
