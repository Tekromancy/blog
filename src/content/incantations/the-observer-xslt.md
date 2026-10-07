---
title: The Observer of the Resonant Echoes
description: Define a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.
type: xslt
gofPattern: Observer
gofCategory: Behavioral
arcaneSchool: "Divination // Sympathy"
formula: |2
  <xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
      
      <!-- The Subject triggers an event -->
      <xsl:template match="ley-line-surge">
          <surge-event>
              <!-- Notifying all Observers by broadcasting the node in different modes -->
              <xsl:apply-templates select="." mode="notify-wardens"/>
              <xsl:apply-templates select="." mode="notify-scryers"/>
              <xsl:apply-templates select="." mode="notify-elementals"/>
          </surge-event>
      </xsl:template>
  
      <!-- Observer 1: Wardens react to the surge -->
      <xsl:template match="ley-line-surge" mode="notify-wardens">
          <warden-response action="fortify-shields" power="{@magnitude}"/>
      </xsl:template>
  
      <!-- Observer 2: Scryers record the event -->
      <xsl:template match="ley-line-surge" mode="notify-scryers">
          <scryer-log entry="Surge detected at {@location}"/>
      </xsl:template>
  
      <!-- Observer 3: Elementals absorb the energy -->
      <xsl:template match="ley-line-surge" mode="notify-elementals">
          <elemental-growth stat="mana" amount="{@magnitude * 2}"/>
      </xsl:template>
  </xsl:stylesheet>
tags: [xslt, design-patterns, behavioral, observer, events, modes]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

In the static confines of an XML document, a "change of state" is represented by the occurrence of a specific node. The Observer pattern is realized by taking that node (the Subject) and broadcasting it across multiple distinct `mode`s. Each mode acts as a separate Observer, reacting to the exact same node but generating entirely different magical manifestations in the output tree.
