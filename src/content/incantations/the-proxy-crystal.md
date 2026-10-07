---
title: "The Proxy: The Astral Projection"
description: "Providing a surrogate or placeholder for another object to control access to it."
type: "crystal"
gofPattern: "Proxy"
gofCategory: "Structural"
arcaneSchool: "Illusion // Warding"
formula: |2
  abstract class Grimoire
    abstract def open_page(page_num : Int32)
  end

  class AncientGrimoire < Grimoire
    def initialize
      puts "Loading massive ancient tome into memory... (This takes a lot of mana)"
    end

    def open_page(page_num : Int32)
      puts "Displaying forbidden secrets of page #{page_num}."
    end
  end

  class AstralProxy < Grimoire
    @real_grimoire : AncientGrimoire?
    @access_level : Int32

    def initialize(@access_level : Int32)
    end

    def open_page(page_num : Int32)
      if @access_level < 10
        puts "Access Denied. You lack the necessary arcane clearance."
      else
        @real_grimoire ||= AncientGrimoire.new
        @real_grimoire.not_nil!.open_page(page_num)
      end
    end
  end

  puts "Apprentice trying to open page 42:"
  apprentice_proxy = AstralProxy.new(5)
  apprentice_proxy.open_page(42)

  puts "\nArchmage trying to open page 42:"
  archmage_proxy = AstralProxy.new(15)
  archmage_proxy.open_page(42)
  # The second time, the tome is already loaded
  archmage_proxy.open_page(43)
tags: ["structural", "proxy", "crystal", "astral-projection"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
Direct interaction with an Ancient Grimoire is slow and perilously unverified. The Astral Projection acts as a Proxy, intercepting calls to ensure the mage has the requisite clearance, and deferring the heavy lifting of initialization until absolutely necessary.
