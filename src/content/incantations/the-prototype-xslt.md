---
title: The Prototype of the Doppelgänger
description: Creating new objects by cloning a prototypical instance, allowing for deep copying and localized mutations in XML.
type: xslt
gofPattern: Prototype
gofCategory: Creational
arcaneSchool: "Illusion // Cloning"
formula: |2
  <xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
      <!-- The Identity Transform: The ultimate cloner -->
      <xsl:template match="@*|node()" mode="clone">
          <xsl:copy>
              <xsl:apply-templates select="@*|node()" mode="clone"/>
          </xsl:copy>
      </xsl:template>
  
      <xsl:template match="/grimoire">
          <expanded-grimoire>
              <!-- Clone the original spell exactly -->
              <xsl:apply-templates select="spell" mode="clone"/>
              
              <!-- Clone the spell but mutate it slightly (Prototype mutation) -->
              <xsl:apply-templates select="spell" mode="mutate-clone"/>
          </expanded-grimoire>
      </xsl:template>
  
      <!-- Mutating the clone: intercepting specific nodes during the cloning process -->
      <xsl:template match="@*|node()" mode="mutate-clone">
          <xsl:copy>
              <xsl:apply-templates select="@*|node()" mode="mutate-clone"/>
          </xsl:copy>
      </xsl:template>
  
      <!-- The mutation rule: changing the power level in the cloned version -->
      <xsl:template match="@power" mode="mutate-clone">
          <xsl:attribute name="power">
              <xsl:value-of select=". * 10"/>
          </xsl:attribute>
      </xsl:template>
  </xsl:stylesheet>
tags: [xslt, design-patterns, creational, prototype, identity-transform]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Prototype pattern is perhaps the most famous incantation in XSLT, commonly known as the "Identity Transform". By deep-copying an entire XML sub-tree and selectively overriding specific templates within that mode, a weaver can forge a near-exact replica of a magical artifact with highly specific enhancements or corruptions.
