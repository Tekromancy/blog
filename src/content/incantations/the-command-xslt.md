---
title: The Command of the Deferred Runes
description: Encapsulate a request as an object, thereby letting you parameterize clients with different requests, queue or log requests, and support undoable operations.
type: xslt
gofPattern: Command
gofCategory: Behavioral
arcaneSchool: "Enchantment // Invocation"
formula: |2
  <xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
      
      <!-- The Invoker: Iterates over commands and executes them -->
      <xsl:template match="/ritual">
          <ritual-execution>
              <xsl:apply-templates select="commands/*" mode="execute"/>
          </ritual-execution>
      </xsl:template>
  
      <!-- Command 1: Ignite -->
      <xsl:template match="ignite" mode="execute">
          <fireball intensity="{@power}">
              <xsl:text>Flames burst forth targeting </xsl:text>
              <xsl:value-of select="@target"/>
          </fireball>
      </xsl:template>
  
      <!-- Command 2: Shield -->
      <xsl:template match="shield" mode="execute">
          <aegis durability="{@strength}">
              <xsl:text>An ethereal barrier protects </xsl:text>
              <xsl:value-of select="@target"/>
          </aegis>
      </xsl:template>
  
      <!-- Command 3: Dispel -->
      <xsl:template match="dispel" mode="execute">
          <nullification>
              <xsl:text>Magic is unravelled around </xsl:text>
              <xsl:value-of select="@target"/>
          </nullification>
      </xsl:template>
  </xsl:stylesheet>
tags: [xslt, design-patterns, behavioral, command, data-driven]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

In XSLT, the Command pattern is realized by turning actions into data. Instead of hardcoding transformations, the XSLT acts as an interpreter for a queue of action nodes (the Commands) embedded in the XML. By applying templates in an `execute` mode, the engine dynamically triggers the precise spells dictated by the data stream, enabling data-driven orchestration of magic.
