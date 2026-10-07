---
title: The Factory Method of the Shapeshifter
description: Defining an interface for creating an XML node, but letting subclasses (or matching templates) decide which element to instantiate.
type: xslt
gofPattern: Factory Method
gofCategory: Creational
arcaneSchool: "Conjuration // Transmutation"
formula: |2
  <xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
      <!-- The Creator: Loops through entities and defers instantiation -->
      <xsl:template match="/summons">
          <army>
              <xsl:apply-templates select="entity" mode="factory-method"/>
          </army>
      </xsl:template>
  
      <!-- Concrete Factory 1: Wraiths -->
      <xsl:template match="entity[@type='wraith']" mode="factory-method">
          <shadow-fiend damage="{@power * 2}">
              <howl>Ethereal Screech</howl>
          </shadow-fiend>
      </xsl:template>
  
      <!-- Concrete Factory 2: Golems -->
      <xsl:template match="entity[@type='golem']" mode="factory-method">
          <earth-titan defense="{@power * 5}">
              <stomp>Seismic Wave</stomp>
          </earth-titan>
      </xsl:template>
  
      <!-- Default Factory: Familiars -->
      <xsl:template match="entity" mode="factory-method">
          <lesser-spirit power="{@power}">
              <squeak/>
          </lesser-spirit>
      </xsl:template>
  </xsl:stylesheet>
tags: [xslt, design-patterns, creational, factory-method, polymorphism]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

XSLT's native pattern-matching engine perfectly aligns with the Factory Method. By using `xsl:apply-templates` with a specific `mode`, the XSLT engine delegates the exact node creation to the most specific matching template. This is the essence of XML polymorphism, where the node's attributes or structure dictate the resulting magical construct.
