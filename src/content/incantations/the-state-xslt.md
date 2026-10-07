---
title: The State of the Shifting Paradigm
description: Allow an object to alter its behavior when its internal state changes. The object will appear to change its class.
type: xslt
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Phases"
formula: |2
  <xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
      
      <xsl:template match="/ritual">
          <ritual-phases>
              <!-- Initial state passed as a parameter -->
              <xsl:call-template name="process-chants">
                  <xsl:with-param name="nodes" select="chant"/>
                  <xsl:with-param name="state" select="'dormant'"/>
              </xsl:call-template>
          </ritual-phases>
      </xsl:template>
  
      <!-- The State Machine (Recursive Template) -->
      <xsl:template name="process-chants">
          <xsl:param name="nodes"/>
          <xsl:param name="state"/>
          
          <xsl:if test="$nodes">
              <xsl:variable name="current" select="$nodes[1]"/>
              <xsl:variable name="rest" select="$nodes[position() > 1]"/>
              
              <!-- Behavior changes based on current state -->
              <xsl:choose>
                  <xsl:when test="$state = 'dormant'">
                      <whisper><xsl:value-of select="$current"/></whisper>
                      <!-- Transition to awakened -->
                      <xsl:call-template name="process-chants">
                          <xsl:with-param name="nodes" select="$rest"/>
                          <xsl:with-param name="state" select="'awakened'"/>
                      </xsl:call-template>
                  </xsl:when>
                  
                  <xsl:when test="$state = 'awakened'">
                      <shout><xsl:value-of select="$current"/></shout>
                      <!-- Transition to explosive -->
                      <xsl:call-template name="process-chants">
                          <xsl:with-param name="nodes" select="$rest"/>
                          <xsl:with-param name="state" select="'explosive'"/>
                      </xsl:call-template>
                  </xsl:when>
                  
                  <xsl:when test="$state = 'explosive'">
                      <detonation><xsl:value-of select="$current"/></detonation>
                      <!-- Reset to dormant -->
                      <xsl:call-template name="process-chants">
                          <xsl:with-param name="nodes" select="$rest"/>
                          <xsl:with-param name="state" select="'dormant'"/>
                      </xsl:call-template>
                  </xsl:when>
              </xsl:choose>
          </xsl:if>
      </xsl:template>
  </xsl:stylesheet>
tags: [xslt, design-patterns, behavioral, state, recursion, parameters]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Archmage
---

Because XSLT lacks mutable variables, State cannot be tracked via global re-assignment. Instead, the State pattern is achieved through tail-recursive templates. As the engine iterates over a node-set, the current "state" is passed as an `xsl:param`. The template executes logic specific to that state, and then recursively calls itself for the next node, passing along the newly transitioned state. The spell's behavior morphs completely as the parameter shifts.
