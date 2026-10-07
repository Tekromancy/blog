---
title: The Iterator of the Infinite Loop
description: Provide a way to access the elements of an aggregate object sequentially without exposing its underlying representation.
type: xslt
gofPattern: Iterator
gofCategory: Behavioral
arcaneSchool: "Divination // Chronomancy"
formula: |2
  <xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
      
      <xsl:template match="/grimoire">
          <catalog>
              <!-- The built-in Iterator mechanism in XSLT -->
              <xsl:for-each select="spells/spell">
                  <!-- Sorting alters the iteration order dynamically -->
                  <xsl:sort select="@power" data-type="number" order="descending"/>
                  
                  <entry index="{position()}" total="{last()}">
                      <name><xsl:value-of select="title"/></name>
                      <rank><xsl:value-of select="@power"/></rank>
                  </entry>
              </xsl:for-each>
          </catalog>
      </xsl:template>
  
  </xsl:stylesheet>
tags: [xslt, design-patterns, behavioral, iterator, for-each, traversal]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

In XSLT, the Iterator pattern is fundamentally embedded within the language's core via `xsl:for-each` and `xsl:apply-templates`. A mage does not manually maintain cursors or index counters; the XSLT engine traverses node-sets automatically. The functions `position()` and `last()` provide contextual awareness during the traversal, while `xsl:sort` effortlessly manipulates the temporal sequence of the iteration.
