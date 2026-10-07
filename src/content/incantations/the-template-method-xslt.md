---
title: The Template Method of the Skeleton Key
description: Define the skeleton of an algorithm in an operation, deferring some steps to subclasses. Template Method lets subclasses redefine certain steps of an algorithm without changing the algorithm's structure.
type: xslt
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Evocation // Frameworks"
formula: |2
  <xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
      
      <!-- The Template Method: Defines the immutable sequence of the ritual -->
      <xsl:template name="grand-ritual">
          <ritual-circle>
              <!-- Step 1: Abstract step to be overridden -->
              <xsl:call-template name="draw-sigils"/>
              
              <!-- Step 2: Concrete step fixed in the base class -->
              <ignite-candles count="5"/>
              
              <!-- Step 3: Abstract step to be overridden -->
              <xsl:call-template name="chant-incantation"/>
          </ritual-circle>
      </xsl:template>
  
      <!-- Default implementations (Hooks) -->
      <xsl:template name="draw-sigils">
          <chalk-circle/>
      </xsl:template>
  
      <xsl:template name="chant-incantation">
          <mumble/>
      </xsl:template>
  
      <xsl:template match="/">
          <xsl:call-template name="grand-ritual"/>
      </xsl:template>
  </xsl:stylesheet>
tags: [xslt, design-patterns, behavioral, template-method, named-templates, overriding]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When constructing a master grimoire, the Template Method pattern defines the skeletal structure of a complex transformation using a named template that acts as a blueprint. It calls other named templates (or applies modes) which act as abstract hooks. Importing stylesheets can override these specific hooks (via `xsl:import` and redefining the named template), completely altering the ritual's details while rigidly adhering to the master sequence.
