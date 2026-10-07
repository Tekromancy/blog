---
title: The Strategy of the Chosen Path
description: Define a family of algorithms, encapsulate each one, and make them interchangeable. Strategy lets the algorithm vary independently from clients that use it.
type: xslt
gofPattern: Strategy
gofCategory: Behavioral
arcaneSchool: "Divination // Tactics"
formula: |2
  <xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
      
      <!-- The Strategy parameter dictates the sorting and filtering algorithm -->
      <xsl:param name="tactic" select="'aggressive'"/>
  
      <xsl:template match="/spellbook">
          <selected-spells>
              <xsl:choose>
                  <!-- Strategy 1: Aggressive (High power first) -->
                  <xsl:when test="$tactic = 'aggressive'">
                      <xsl:apply-templates select="spell">
                          <xsl:sort select="@power" data-type="number" order="descending"/>
                      </xsl:apply-templates>
                  </xsl:when>
                  
                  <!-- Strategy 2: Defensive (High shield first) -->
                  <xsl:when test="$tactic = 'defensive'">
                      <xsl:apply-templates select="spell">
                          <xsl:sort select="@shield" data-type="number" order="descending"/>
                      </xsl:apply-templates>
                  </xsl:when>
                  
                  <!-- Strategy 3: Balanced -->
                  <xsl:otherwise>
                      <xsl:apply-templates select="spell">
                          <xsl:sort select="@mana-cost" data-type="number" order="ascending"/>
                      </xsl:apply-templates>
                  </xsl:otherwise>
              </xsl:choose>
          </selected-spells>
      </xsl:template>
  
      <xsl:template match="spell">
          <prepared-spell name="{@name}"/>
      </xsl:template>
  </xsl:stylesheet>
tags: [xslt, design-patterns, behavioral, strategy, parameters, sorting]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

A mage entering battle must adapt their tactics instantly. The Strategy pattern in XSLT uses an external `xsl:param` to swap out algorithms at runtime. Without changing the underlying template structure that renders the `spell`, the overarching logic governing which spells are chosen and in what order they are processed is seamlessly swapped out based on the injected strategy.
