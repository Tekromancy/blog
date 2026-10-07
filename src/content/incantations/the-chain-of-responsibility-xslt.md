---
title: The Chain of Responsibility of the Ascending Wardens
description: Avoid coupling the sender of a request to its receiver by giving more than one object a chance to handle the request.
type: xslt
gofPattern: Chain of Responsibility
gofCategory: Behavioral
arcaneSchool: "Abjuration // Delegation"
formula: |2
  <xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
      
      <!-- Handler 1: The High Mage (Highest Priority) -->
      <xsl:template match="threat[@level &gt; 90]" priority="3">
          <banished>
              <xsl:text>The High Mage has utterly destroyed the threat: </xsl:text>
              <xsl:value-of select="@name"/>
          </banished>
      </xsl:template>
  
      <!-- Handler 2: The Adept (Medium Priority) -->
      <xsl:template match="threat[@level &gt; 50]" priority="2">
          <!-- Partial handling, then passing it down the chain using xsl:next-match -->
          <contained>
              <xsl:text>The Adept slowed the entity. </xsl:text>
              <xsl:next-match/>
          </contained>
      </xsl:template>
  
      <!-- Handler 3: The Apprentice (Fallback Priority) -->
      <xsl:template match="threat" priority="1">
          <fled>
              <xsl:text>The Apprentice ran away from: </xsl:text>
              <xsl:value-of select="@name"/>
          </fled>
      </xsl:template>
  
      <xsl:template match="/invasion">
          <defense-log>
              <xsl:apply-templates select="threat"/>
          </defense-log>
      </xsl:template>
  </xsl:stylesheet>
tags: [xslt, design-patterns, behavioral, chain-of-responsibility, priority, next-match]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

Through the arcane power of template `priority` and the `xsl:next-match` instruction (introduced in XSLT 2.0), a weaver constructs a true Chain of Responsibility. An incoming XML node falls through the ether, caught first by the most specific, high-priority template. If that warden cannot fully dispatch the threat, `xsl:next-match` allows the node to plummet to the next applicable template in the hierarchy, gracefully delegating the response.
