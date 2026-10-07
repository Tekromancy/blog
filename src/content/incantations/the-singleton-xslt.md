---
title: The Singleton of the Immutable Truth
description: Ensuring a class has only one instance, and providing a global point of access to it.
type: xslt
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Abjuration // State"
formula: |2
  <xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
      <!-- The Singleton: A global variable evaluated exactly once -->
      <xsl:variable name="universal-ley-line" select="document('ley-lines.xml')/ley-lines/primary-node"/>
  
      <xsl:template match="/ritual">
          <ritual-results>
              <xsl:apply-templates select="cast">
                  <!-- Accessing the Singleton globally across all templates -->
                  <xsl:with-param name="ley-power" select="$universal-ley-line/@energy"/>
              </xsl:apply-templates>
          </ritual-results>
      </xsl:template>
  
      <xsl:template match="cast">
          <xsl:param name="ley-power"/>
          <spell-impact>
              <xsl:value-of select="@base-damage * $ley-power"/>
          </spell-impact>
      </xsl:template>
  </xsl:stylesheet>
tags: [xslt, design-patterns, creational, singleton, global-variables]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

In the pure, functional realm of XSLT, state cannot be mutated. Thus, the Singleton pattern is naturally enforced. By declaring a global `xsl:variable`, the XSLT processor evaluates the expression exactly once and caches the result. This single, immutable truth can then be accessed globally from any template, providing a constant source of magical energy without redundant computations.
