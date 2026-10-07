---
title: The Facade of the Grand Archmage
description: Providing a unified interface to a set of interfaces in a subsystem. Facade defines a higher-level interface that makes the subsystem easier to use.
type: xslt
gofPattern: Facade
gofCategory: Structural
arcaneSchool: "Illusion // Simplification"
formula: |2
  <xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
      
      <!-- Importing complex subsystems -->
      <xsl:import href="ley-line-calculus.xsl"/>
      <xsl:import href="planar-binding-matrix.xsl"/>
      <xsl:import href="ethereal-routing.xsl"/>
  
      <!-- The Facade: A single, simple template invoking complex operations -->
      <xsl:template name="cast-ultimate-spell">
          <xsl:param name="target"/>
          <xsl:param name="power"/>
          
          <ultimate-invocation>
              <!-- Subsystem 1 -->
              <xsl:variable name="ley-energy">
                  <xsl:call-template name="calculate-ley-lines">
                      <xsl:with-param name="base" select="$power"/>
                  </xsl:call-template>
              </xsl:variable>
              
              <!-- Subsystem 2 -->
              <binding>
                  <xsl:call-template name="bind-planes">
                      <xsl:with-param name="entity" select="$target"/>
                  </xsl:call-template>
              </binding>
              
              <damage><xsl:value-of select="$ley-energy * 10"/></damage>
          </ultimate-invocation>
      </xsl:template>
  
      <xsl:template match="/">
          <xsl:call-template name="cast-ultimate-spell">
              <xsl:with-param name="target" select="'Demon Lord'"/>
              <xsl:with-param name="power" select="100"/>
          </xsl:call-template>
      </xsl:template>
  </xsl:stylesheet>
tags: [xslt, design-patterns, structural, facade, modularity, imports]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

As XSLT grimoires grow vast and complex, they are often split into multiple files and namespaces. The Facade pattern is implemented as a top-level master stylesheet that imports the convoluted logic of lower-level subsystems, exposing only simplified named templates. This shields the invoking mage from the horrific intricacies of dimensional bindings and ley-line calculus.
