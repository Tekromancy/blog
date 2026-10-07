---
title: "The Mediator: The Central Hub"
description: "Define an object that encapsulates how a set of objects interact."
type: vala
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Enchantment // Synchronization"
formula: |2
  public interface GNOMEArtifice.CyberMediator : Object {
      public abstract void send_message(string msg, Hacker user);
  }
  
  public class GNOMEArtifice.ChatHub : Object, CyberMediator {
      private GenericArray<Hacker> users;
  
      public ChatHub() {
          this.users = new GenericArray<Hacker>();
      }
  
      public void register(Hacker user) {
          this.users.add(user);
      }
  
      public void send_message(string msg, Hacker user) {
          for (int i = 0; i < this.users.length; i++) {
              if (this.users[i] != user) {
                  this.users[i].receive(msg);
              }
          }
      }
  }
  
  public abstract class GNOMEArtifice.Hacker : Object {
      protected CyberMediator mediator;
      protected string handle;
  
      public Hacker(CyberMediator mediator, string handle) {
          this.mediator = mediator;
          this.handle = handle;
      }
  
      public abstract void send(string msg);
      public abstract void receive(string msg);
  }
  
  public class GNOMEArtifice.Netrunner : Hacker {
      public Netrunner(CyberMediator mediator, string handle) {
          base(mediator, handle);
      }
  
      public override void send(string msg) {
          print(@"$(this.handle) broadcasts: $(msg)\n");
          this.mediator.send_message(msg, this);
      }
  
      public override void receive(string msg) {
          print(@"$(this.handle) receives: $(msg)\n");
      }
  }
tags: [Vala, GObject, Behavioral, Mediator]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When dozens of Netrunners converge on a single cyber-heist, allowing them to communicate point-to-point creates a tangled web of connections liable to be traced by corporate ICE. The Mediator pattern channels the chaos. A central `ChatHub` acts as the grand switchboard. Netrunners broadcast to the hub, and the hub disseminates the signal. No runner needs to know the direct IP of another, securing the GNOME Artifice against catastrophic unmasking.
