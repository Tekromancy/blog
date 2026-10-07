---
title: Singleton
description: A unique, centralized arbiter resource.
type: vhdl
gofPattern: Singleton
gofCategory: Creational
arcaneSchool: Silicon Golemancy // Singular Arbiter
formula: |
  library IEEE;
  use IEEE.STD_LOGIC_1164.ALL;
  use IEEE.NUMERIC_STD.ALL;
  
  entity singleton_arbiter is
      Port ( clk : in STD_LOGIC;
             rst : in STD_LOGIC;
             aether_in : in STD_LOGIC_VECTOR (31 downto 0);
             aether_out : out STD_LOGIC_VECTOR (31 downto 0));
  end singleton_arbiter;
  
  architecture Physical of singleton_arbiter is
  begin
      process(clk, rst)
      begin
          if rst = '1' then
              aether_out <= (others => '0');
          elsif rising_edge(clk) then
              aether_out <= not aether_in; 
          end if;
      end process;
  end Physical;
tags: [vhdl, creational, silicon-golemancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Singleton Pattern in VHDL

A unique, centralized arbiter resource.
