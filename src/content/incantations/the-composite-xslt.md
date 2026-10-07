---
title: The Composite of the Fractal Runes
description: Composing objects into tree structures to represent part-whole hierarchies. Composite lets clients treat individual objects and compositions of objects uniformly.
type: xslt
gofPattern: Composite
gofCategory: Structural
arcaneSchool: "Transmutation // Recursion"
formula: |2
  <xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
      
      <xsl:template match="/">
          <analyzed-structure>
              <xsl:apply-templates select="node"/>
          </analyzed-structure>
      </xsl:template>
  
      <!-- The Composite: Treats leaves and branches uniformly via recursive application -->
      <xsl:template match="node">
          <processed-node id="{@id}">
              <xsl:choose>
                  <!-- Branch behavior: process children -->
                  <xsl:when test="node">
                      <xsl:attribute name="type">composite</xsl:attribute>
                      <xsl:apply-templates select="node"/>
                  </xsl:when>
                  <!-- Leaf behavior: end of the line -->
                  <xsl:otherwise>
                      <xsl:attribute name="type">leaf</xsl:attribute>
                      <xsl:value-of select="data"/>
                  </xsl:otherwise>
              </xsl:choose>
          </processed-node>
      </xsl:template>
  </xsl:stylesheet>
tags: [xslt, design-patterns, structural, composite, recursive, trees]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

XML is inherently a tree structure, making the Composite pattern the most natural fit for XSLT. By applying templates recursively to a node's children, the stylesheet treats leaf nodes and branch nodes uniformly. The processor descends into the fractal depths of the document, unwinding the arcane structures with elegance.
