---
title: The Bridge of the Bifurcated Realms
description: Decoupling an abstraction from its implementation so that the two can vary independently.
type: xslt
gofPattern: Bridge
gofCategory: Structural
arcaneSchool: "Conjuration // Dimensional"
formula: |2
  <xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
      
      <!-- The Abstraction: Defines the high-level layout -->
      <xsl:template match="/spellbook">
          <output-realm>
              <xsl:apply-templates select="spell" mode="layout"/>
          </output-realm>
      </xsl:template>
  
      <xsl:template match="spell" mode="layout">
          <wrapper>
              <!-- The Bridge: delegating to the implementation -->
              <xsl:apply-templates select="." mode="render"/>
          </wrapper>
      </xsl:template>
  
      <!-- The Implementation: Defines how specific spells are rendered -->
      <!-- This can be swapped out by importing different stylesheets -->
      <xsl:template match="spell[@type='fire']" mode="render">
          <flame-glyph intensity="{@power}"/>
      </xsl:template>
  
      <xsl:template match="spell[@type='ice']" mode="render">
          <frost-sigil chill="{@power}"/>
      </xsl:template>
  </xsl:stylesheet>
tags: [xslt, design-patterns, structural, bridge, delegation, modes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Bridge pattern in XSLT separates the structural layout (the abstraction) from the specific rendering details of the nodes (the implementation). By chaining modes—where one mode handles the wrapper or container, and it applies a second mode for the inner content—an archmage can independently vary the outer schema and the inner glyphs.
