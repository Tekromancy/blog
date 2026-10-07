---
title: The Abstract Factory of the Eldritch Nodes
description: Dynamically conjuring families of related XML shapeshifting constructs without specifying their concrete classes.
type: xslt
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Conjuration // Transmutation"
formula: |2
  <xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
      <!-- The Abstract Factory: A parameter dictates the realm of creation -->
      <xsl:param name="realm" select="'ethereal'"/>
      
      <xsl:template match="/">
          <grimoire>
              <!-- Delegate to the factory method based on the chosen realm -->
              <xsl:apply-templates select="incantations/spell" mode="factory">
                  <xsl:with-param name="active-realm" select="$realm"/>
              </xsl:apply-templates>
          </grimoire>
      </xsl:template>
  
      <!-- Concrete Factory 1: Ethereal Realm -->
      <xsl:template match="spell" mode="factory">
          <xsl:param name="active-realm"/>
          <xsl:choose>
              <xsl:when test="$active-realm = 'ethereal'">
                  <ethereal-construct energy="{@power}">
                      <spirit-binding type="{@type}"/>
                  </ethereal-construct>
              </xsl:when>
              <xsl:when test="$active-realm = 'nether'">
                  <nether-construct decay="{@power}">
                      <void-binding type="{@type}"/>
                  </nether-construct>
              </xsl:when>
              <xsl:otherwise>
                  <mortal-construct essence="{@power}"/>
              </xsl:otherwise>
          </xsl:choose>
      </xsl:template>
  </xsl:stylesheet>
tags: [xslt, design-patterns, creational, abstract-factory, xml]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

In the domain of XML shapeshifting, the Abstract Factory pattern manifests as a dynamic routing mechanism. By invoking templates with parameterized context (or leveraging `xsl:import` with different precedence), an adept XSLT weaver can summon entirely different families of XML constructs from the exact same source node.
