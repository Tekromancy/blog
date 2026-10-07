---
title: The Astral Auditor
description: Separate an algorithmic operation from the object structure it operates on.
type: dart
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: Divination // Astral Projection
formula: |
  abstract class MagicalEntity {
    void accept(AstralVisitor visitor);
  }
  
  class Grimoire implements MagicalEntity {
    final int forbiddenPages = 50;
    @override
    void accept(AstralVisitor visitor) => visitor.visitGrimoire(this);
  }
  
  class Artifact implements MagicalEntity {
    final int latentMana = 500;
    @override
    void accept(AstralVisitor visitor) => visitor.visitArtifact(this);
  }
  
  abstract class AstralVisitor {
    void visitGrimoire(Grimoire grimoire);
    void visitArtifact(Artifact artifact);
  }
  
  class InquisitorVisitor implements AstralVisitor {
    @override
    void visitGrimoire(Grimoire grimoire) {
      print('Inspecting grimoire. Corrupted pages: ${grimoire.forbiddenPages}');
    }
    
    @override
    void visitArtifact(Artifact artifact) {
      print('Scanning artifact. Mana level: ${artifact.latentMana}');
    }
  }
  
  void main() {
    final entities = <MagicalEntity>[Grimoire(), Artifact()];
    final inquisitor = InquisitorVisitor();
    
    for (var entity in entities) {
      entity.accept(inquisitor);
    }
  }
tags: [dart, visitor, double-dispatch, auditing]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

When the Inquisition audits your sanctum, they don't teach your grimoires how to audit themselves. The Visitor pattern uses double-dispatch, projecting an external entity (the Visitor) into your object structures to extract data without polluting your domain models.
