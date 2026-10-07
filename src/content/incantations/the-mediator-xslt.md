---
title: The Mediator of the Nexus
description: Define an object that encapsulates how a set of objects interact. Mediator promotes loose coupling by keeping objects from referring to each other explicitly.
type: xslt
gofPattern: Mediator
gofCategory: Behavioral
arcaneSchool: "Enchantment // Synchronization"
formula: |2
  <xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
      
      <!-- The Mediator Template: Coordinates two distinct parts of the XML -->
      <xsl:template match="/realm">
          <resolved-realm>
              <!-- The mediator loads both factions into variables -->
              <xsl:variable name="mages" select="factions/mage"/>
              <xsl:variable name="artifacts" select="vault/artifact"/>
              
              <!-- It dictates the interaction between them -->
              <xsl:for-each select="$mages">
                  <xsl:variable name="affinity" select="@element"/>
                  <mage-equipped name="{@name}">
                      <!-- Cross-referencing logic centralized here -->
                      <xsl:copy-of select="$artifacts[@element = $affinity]"/>
                  </mage-equipped>
              </xsl:for-each>
          </resolved-realm>
      </xsl:template>
      
  </xsl:stylesheet>
tags: [xslt, design-patterns, behavioral, mediator, cross-reference, coordination]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When disparate branches of an XML tree must interact—such as mages claiming artifacts from a separate vault node—direct traversal becomes brittle. The Mediator pattern relies on a centralized template that binds these distinct node-sets into variables. It then orchestrates their union, performing cross-references and enforcing rules without allowing the individual factions to directly tangle their XPath trajectories.
