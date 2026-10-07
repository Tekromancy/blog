---
title: The Decorator of the Warded Glyphs
description: Attaching additional responsibilities to an object dynamically. Decorators provide a flexible alternative to subclassing for extending functionality.
type: xslt
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Abjuration // Warding"
formula: |2
  <xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
      
      <!-- Base identity transform -->
      <xsl:template match="@*|node()">
          <xsl:copy>
              <xsl:apply-templates select="@*|node()"/>
          </xsl:copy>
      </xsl:template>
  
      <!-- The Decorator: Wrapping a specific node with additional wards -->
      <xsl:template match="spell">
          <warded-container protection="maximum">
              <!-- Re-create the original element -->
              <xsl:copy>
                  <!-- Apply attributes -->
                  <xsl:apply-templates select="@*"/>
                  <!-- Add a new decorative element before the content -->
                  <sigil-of-guarding/>
                  <!-- Process the original content -->
                  <xsl:apply-templates select="node()"/>
              </xsl:copy>
          </warded-container>
      </xsl:template>
  </xsl:stylesheet>
tags: [xslt, design-patterns, structural, decorator, wrappers]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

To decorate a node in XSLT is to intercept its transformation and envelop it within new arcane containers or inject additional sibling elements. Instead of altering the internal definition of the spell, the Decorator wraps the output, dynamically augmenting the structure with protective wards and metadata.
