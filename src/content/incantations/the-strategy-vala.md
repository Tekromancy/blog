---
title: "The Strategy: Shifting the Cipher"
description: "Define a family of algorithms, encapsulate each one, and make them interchangeable."
type: vala
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Illusion // Obfuscation"
formula: |2
  public interface GNOMEArtifice.EncryptionProtocol : Object {
      public abstract void encrypt(string data);
  }
  
  public class GNOMEArtifice.QuantumCipher : Object, EncryptionProtocol {
      public void encrypt(string data) {
          print(@"Applying Quantum Cipher to: $(data)\n");
      }
  }
  
  public class GNOMEArtifice.PolyalphabeticShift : Object, EncryptionProtocol {
      public void encrypt(string data) {
          print(@"Applying Polyalphabetic Shift to: $(data)\n");
      }
  }
  
  public class GNOMEArtifice.DataUplink : Object {
      private EncryptionProtocol protocol;
  
      public void set_protocol(EncryptionProtocol protocol) {
          this.protocol = protocol;
      }
  
      public void transmit(string data) {
          this.protocol.encrypt(data);
          print("Data transmitted to orbit.\n");
      }
  }
tags: [Vala, GObject, Behavioral, Strategy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The hunters in the digital wastes constantly adapt, breaking codes as fast as you cast them. The Strategy pattern lets your Data Uplink alter its obfuscation magic on the fly. Rather than hardcoding a single cipher into the transmission array, you slot in an `EncryptionProtocol`. When one is compromised, you instantly swap the Quantum Cipher for a Polyalphabetic Shift without tearing down the connection, staying one step ahead of the ICE.
