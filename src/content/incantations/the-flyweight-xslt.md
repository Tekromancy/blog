---
title: The Flyweight of the Shared Essences
description: Use sharing to support large numbers of fine-grained objects efficiently.
type: xslt
gofPattern: Flyweight
gofCategory: Structural
arcaneSchool: "Conjuration // Optimization"
formula: |2
  <xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
      
      <!-- The Flyweight Factory: Indexing shared data using a key for O(1) lookups -->
      <xsl:key name="bestiary" match="creature-def" use="@id"/>
      
      <!-- External document containing shared intrinsic state -->
      <xsl:variable name="monster-manual" select="document('bestiary.xml')"/>
  
      <xsl:template match="/encounter">
          <battlefield>
              <xsl:apply-templates select="spawn"/>
          </battlefield>
      </xsl:template>
  
      <xsl:template match="spawn">
          <!-- Extrinsic state provided by the current node -->
          <combatant x="{@x}" y="{@y}" hp="{@hp}">
              <!-- Intrinsic state fetched efficiently from the Flyweight cache -->
              <xsl:variable name="type-id" select="@type"/>
              <xsl:for-each select="$monster-manual">
                  <!-- Change context to the external doc to use the key -->
                  <xsl:copy-of select="key('bestiary', $type-id)"/>
              </xsl:for-each>
          </combatant>
      </xsl:template>
  </xsl:stylesheet>
tags: [xslt, design-patterns, structural, flyweight, keys, optimization]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

In XSLT, processing vast XML forests can drain memory and computation time. The Flyweight pattern uses `xsl:key` to index and cache shared, invariant data (the intrinsic state) from an external document. Instead of duplicating massive node structures, the engine performs rapid O(1) lookups, seamlessly combining the shared definitions with local, specific attributes (the extrinsic state).
