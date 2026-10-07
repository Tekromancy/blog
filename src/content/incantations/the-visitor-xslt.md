---
title: The Visitor of the Unseen Weaver
description: Represent an operation to be performed on the elements of an object structure. Visitor lets you define a new operation without changing the classes of the elements on which it operates.
type: xslt
gofPattern: Visitor
gofCategory: Behavioral
arcaneSchool: "Divination // Traversal"
formula: |2
  <xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
      
      <xsl:template match="/">
          <grimoire-audit>
              <!-- Initiating the Visitor traversal -->
              <xsl:apply-templates select="node()" mode="audit"/>
          </grimoire-audit>
      </xsl:template>
  
      <!-- The Base Visitor Logic: Traversing the structure -->
      <xsl:template match="@*|node()" mode="audit">
          <xsl:apply-templates select="@*|node()" mode="audit"/>
      </xsl:template>
  
      <!-- Specific Visitor Operation: Counting spell nodes -->
      <xsl:template match="spell" mode="audit">
          <found-spell name="{@name}"/>
          <!-- Continue visiting children -->
          <xsl:apply-templates select="@*|node()" mode="audit"/>
      </xsl:template>
  
      <!-- Specific Visitor Operation: Flagging high mana costs -->
      <xsl:template match="@mana-cost[. &gt; 100]" mode="audit">
          <warning>High mana expenditure detected: <xsl:value-of select="."/></warning>
      </xsl:template>
  
  </xsl:stylesheet>
tags: [xslt, design-patterns, behavioral, visitor, apply-templates, traversal]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---

The Visitor pattern is the very soul of XSLT. The language was built upon this concept. The XML tree is the object structure, and `xsl:apply-templates` acts as the dispatcher. The matching templates are the Visitor implementations. You define new operations (transformations, audits, extractions) by writing new templates in specific modes, visiting the nodes without ever altering the source XML structure itself.
