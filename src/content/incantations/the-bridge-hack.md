---
title: Bridging Social Constructs and Protocols
description: Decouple a social abstraction from its transmission implementation.
type: hack
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Alteration // Decoupling"
formula: |2
  <?hh // strict
  namespace SocialGraphAlchemy\Bridge;

  interface ITransmissionProtocol {
    public function transmit(string $data): void;
  }

  class WhisperNetProtocol implements ITransmissionProtocol {
    public function transmit(string $data): void {
      echo "[WhisperNet Encrypted] " . $data . "\n";
    }
  }

  abstract class SocialConstruct {
    public function __construct(protected ITransmissionProtocol $protocol) {}
    abstract public function propagate(string $idea): void;
  }

  class ViralMeme extends SocialConstruct {
    public function propagate(string $idea): void {
      $this->protocol->transmit("VIRAL: " . $idea);
    }
  }
tags: [hack, bridge, structural, social-graph]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

### The Bifurcation of Meaning and Medium

A viral idea is independent of the network it spreads upon. The **Bridge** pattern severs the bond between the nature of a Social Construct (like a Meme or a Warning) and the Protocol used to spread it (WhisperNet, Broadcast, etc.).

By composing the abstraction over the implementation, we prevent a combinatorial explosion of subclasses. We can cast the same `ViralMeme` across different layers of the cyber-ether merely by injecting a different protocol conduit.
