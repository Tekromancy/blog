---
title: The Template Method of the Crawler
description: Define the skeleton of a graph crawling algorithm, deferring steps to subclasses.
type: hack
gofPattern: Template Method
gofCategory: Behavioral
arcaneSchool: "Divination // Procedural Scrying"
formula: |2
  <?hh // strict
  namespace SocialGraphAlchemy\TemplateMethod;

  abstract class GraphCrawler {
    // The Template Method is final to prevent subclass corruption of the ritual sequence
    final public function crawl(): void {
      $this->authenticate();
      $this->extractData();
      $this->closeConnection();
    }

    protected function authenticate(): void { 
      echo "Standard Anonymous Authentication.\n"; 
    }

    abstract protected function extractData(): void;

    protected function closeConnection(): void { 
      echo "Severing connection gracefully.\n"; 
    }
  }

  class ShadowCrawler extends GraphCrawler {
    protected function extractData(): void { 
      echo "Scraping encrypted metadata and hidden connections...\n"; 
    }
  }

  class PublicAPI_Crawler extends GraphCrawler {
    protected function authenticate(): void {
      echo "Using valid Developer OAuth Token.\n";
    }

    protected function extractData(): void {
      echo "Pulling sanitized public timeline.\n";
    }
  }
tags: [hack, template-method, behavioral, social-graph]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

### The Scrying Skeleton

Whether pulling data through legitimate OAuth endpoints or scraping the shadowy underbelly of an unindexed forum, the overarching ritual of data extraction is identical: connect, pull, disconnect. 

The **Template Method** locks this sequence in place with a `final` base function. Subclasses (`ShadowCrawler`, `PublicAPI_Crawler`) are then forced to provide only the exact variations—such as custom extraction payloads—without jeopardizing the integrity of the base operation.
