---
title: The Proxy of the Gatekeeper
description: Providing a surrogate or placeholder for another object to control access to it.
type: xslt
gofPattern: Proxy
gofCategory: Structural
arcaneSchool: "Abjuration // Gatekeeping"
formula: |2
  <xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
      
      <!-- The Proxy Template: Controls access to the real operation -->
      <xsl:template match="forbidden-knowledge">
          <xsl:param name="mage-level" select="1"/>
          
          <xsl:choose>
              <!-- Access Control / Protection Proxy -->
              <xsl:when test="$mage-level &gt;= 10">
                  <revealed-truth>
                      <!-- Lazy loading / Virtual Proxy: Only load the heavy document if authorized -->
                      <xsl:copy-of select="document('eldritch-secrets.xml')/secrets/node()"/>
                  </revealed-truth>
              </xsl:when>
              <xsl:otherwise>
                  <denied>Your mind is too weak to comprehend these truths.</denied>
              </xsl:otherwise>
          </xsl:choose>
      </xsl:template>
  
      <xsl:template match="/">
          <archive>
              <!-- Simulating an unauthorized access attempt -->
              <xsl:apply-templates select="//forbidden-knowledge">
                  <xsl:with-param name="mage-level" select="5"/>
              </xsl:apply-templates>
          </archive>
      </xsl:template>
  </xsl:stylesheet>
tags: [xslt, design-patterns, structural, proxy, lazy-loading, access-control]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Proxy pattern in XSLT takes the form of a mediating template that intercepts requests. It serves as a guardian, evaluating conditions—such as authorization levels or necessity—before committing the expensive act of invoking `document()` to load external, massive XML files, effectively functioning as a Virtual and Protection Proxy simultaneously.
