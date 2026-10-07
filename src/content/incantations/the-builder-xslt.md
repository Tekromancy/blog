---
title: The Builder of the Astral Schemas
description: Separating the construction of a complex XML structure from its representation, allowing the same construction process to create different representations.
type: xslt
gofPattern: Builder
gofCategory: Creational
arcaneSchool: "Conjuration // Architecture"
formula: |2
  <xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
      <!-- The Director: Guides the building process step by step -->
      <xsl:template match="/ritual">
          <manifestation>
              <xsl:call-template name="build-foundation"/>
              <xsl:call-template name="build-pillars"/>
              <xsl:call-template name="build-apex"/>
          </manifestation>
      </xsl:template>
  
      <!-- Step 1: Foundation -->
      <xsl:template name="build-foundation">
          <base-rune resonance="{base/@frequency}">
              <xsl:value-of select="base/chant"/>
          </base-rune>
      </xsl:template>
  
      <!-- Step 2: Pillars (Iterative Construction) -->
      <xsl:template name="build-pillars">
          <xsl:for-each select="components/pillar">
              <focus-node alignment="{@align}">
                  <xsl:value-of select="."/>
              </focus-node>
          </xsl:for-each>
      </xsl:template>
  
      <!-- Step 3: Apex -->
      <xsl:template name="build-apex">
          <crown-crystal>
              <xsl:apply-templates select="climax/energy"/>
          </crown-crystal>
      </xsl:template>
  
      <xsl:template match="energy">
          <spark intensity="{@level}"/>
      </xsl:template>
  </xsl:stylesheet>
tags: [xslt, design-patterns, creational, builder, xml-construction]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Builder pattern in XSLT is often achieved through named templates acting as the "Director", orchestrating a sequence of construction steps. Rather than a single monolithic template attempting to build the entire output tree at once, the logic is divided into modular, reusable incantations that build the artifact piece by piece.
