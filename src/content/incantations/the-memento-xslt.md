---
title: The Memento of the Frozen Echo
description: Without violating encapsulation, capture and externalize an object's internal state so that the object can be restored to this state later.
type: xslt
gofPattern: Memento
gofCategory: Behavioral
arcaneSchool: "Chronomancy // Stasis"
formula: |2
  <xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
      
      <xsl:template match="/ritual">
          <time-warp>
              <!-- The Memento: Capturing the state of the runes before mutation -->
              <xsl:variable name="original-state" select="runes/*"/>
              
              <aftermath>
                  <!-- Perform destructive/transformative operations -->
                  <xsl:apply-templates select="runes" mode="mutate"/>
              </aftermath>
              
              <echo-of-the-past>
                  <!-- Restoring/Accessing the frozen state -->
                  <xsl:copy-of select="$original-state"/>
              </echo-of-the-past>
          </time-warp>
      </xsl:template>
  
      <xsl:template match="runes" mode="mutate">
          <corrupted-runes>
              <xsl:for-each select="*">
                  <ash/>
              </xsl:for-each>
          </corrupted-runes>
      </xsl:template>
  </xsl:stylesheet>
tags: [xslt, design-patterns, behavioral, memento, variables, state-preservation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

Because XSLT variables cannot be reassigned, they are inherently perfect vessels for the Memento pattern. By capturing a snapshot of a node-set or a computed result into an `xsl:variable`, a mage creates a temporal anchor. Even as the output tree is constructed with radically altered forms, the original state remains preserved in the variable, ready to be recalled, compared, or restored at any point in the invocation.
