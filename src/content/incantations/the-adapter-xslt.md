---
title: The Adapter of the Foreign Runes
description: Converting the interface of a class into another interface clients expect. Adapter lets classes work together that couldn't otherwise because of incompatible interfaces.
type: xslt
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Transmutation // Translation"
formula: |2
  <xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                  xmlns:foreign="http://alien-runes.org/schema">
      
      <!-- The Adapter: Transforming foreign elements to our internal dialect -->
      <xsl:template match="/">
          <grimoire>
              <xsl:apply-templates select="//foreign:incantation" mode="adapt"/>
          </grimoire>
      </xsl:template>
  
      <xsl:template match="foreign:incantation" mode="adapt">
          <spell>
              <!-- Mapping foreign attributes to local expectations -->
              <xsl:attribute name="power" select="@mana-cost"/>
              <xsl:attribute name="type" select="@element"/>
              
              <!-- Translating nested elements -->
              <xsl:apply-templates select="foreign:words" mode="adapt"/>
          </spell>
      </xsl:template>
  
      <xsl:template match="foreign:words" mode="adapt">
          <chant>
              <xsl:value-of select="."/>
          </chant>
      </xsl:template>
  </xsl:stylesheet>
tags: [xslt, design-patterns, structural, adapter, namespaces, translation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The most fundamental magic of XSLT is transformation, making it the perfect language for the Adapter pattern. When integrating grimoires written in foreign schemas or namespaces, the XSLT acts as the universal translator, mapping unknown nodes and attributes into the client's expected DOM structure without disrupting the underlying flow of arcane energies.
