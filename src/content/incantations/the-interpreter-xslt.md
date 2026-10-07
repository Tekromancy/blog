---
title: The Interpreter of the Ancient Tongue
description: Given a language, define a representation for its grammar along with an interpreter that uses the representation to interpret sentences in the language.
type: xslt
gofPattern: Interpreter
gofCategory: Behavioral
arcaneSchool: "Divination // Linguistics"
formula: |2
  <xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
      
      <!-- The Context and Client -->
      <xsl:template match="/expression">
          <evaluated-result>
              <xsl:apply-templates select="*"/>
          </evaluated-result>
      </xsl:template>
  
      <!-- Terminal Expression: Number -->
      <xsl:template match="num">
          <xsl:value-of select="."/>
      </xsl:template>
  
      <!-- Non-Terminal Expression: Addition -->
      <xsl:template match="add">
          <xsl:variable name="left">
              <xsl:apply-templates select="*[1]"/>
          </xsl:variable>
          <xsl:variable name="right">
              <xsl:apply-templates select="*[2]"/>
          </xsl:variable>
          <xsl:value-of select="number($left) + number($right)"/>
      </xsl:template>
  
      <!-- Non-Terminal Expression: Multiplication -->
      <xsl:template match="multiply">
          <xsl:variable name="left">
              <xsl:apply-templates select="*[1]"/>
          </xsl:variable>
          <xsl:variable name="right">
              <xsl:apply-templates select="*[2]"/>
          </xsl:variable>
          <xsl:value-of select="number($left) * number($right)"/>
      </xsl:template>
  </xsl:stylesheet>
tags: [xslt, design-patterns, behavioral, interpreter, ast, evaluation]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

XSLT is inherently a functional tree-processing language, making it the ultimate tool for evaluating Abstract Syntax Trees (ASTs). The Interpreter pattern is implemented by treating the XML document as the AST of a custom esoteric language. Each template evaluates a specific syntactic construct—recursively resolving child expressions and combining their results to compute the final arcane truth.
