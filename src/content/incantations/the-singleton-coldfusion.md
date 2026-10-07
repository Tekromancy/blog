---
title: The Singleton of the Akashic Record
description: Ensure only a single instance of a magical repository exists within the server.
type: coldfusion
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: "Divination // Archives"
formula: |2
  component name="AkashicRecord" output="false" {
      variables.instance = "";

      private AkashicRecord function init() {
          variables.knowledgeBase = {};
          return this;
      }

      public static AkashicRecord function getInstance() {
          if (!structKeyExists(server, "akashicRecordInstance")) {
              lock scope="server" type="exclusive" timeout="10" {
                  if (!structKeyExists(server, "akashicRecordInstance")) {
                      server.akashicRecordInstance = new AkashicRecord();
                  }
              }
          }
          return server.akashicRecordInstance;
      }
  }
tags: [singleton, coldfusion, server-scope, one-true-instance]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

The Singleton pattern guarantees that only one instance of the Akashic Record is ever created within the server's lifecycle. By utilizing ColdFusion's server scope and locking mechanisms, the Adobe Alchemist ensures that all tag-wards pull from the exact same pool of forbidden knowledge without corruption or duplication.
