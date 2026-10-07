---
title: Abstract Factory
description: Instantiates families of related components based on generics.
type: vhdl
gofPattern: Abstract Factory
gofCategory: Creational
arcaneSchool: "Silicon Golemancy // Component Forge"
formula: |2
  library IEEE;
  use IEEE.STD_LOGIC_1164.ALL;
  use IEEE.NUMERIC_STD.ALL;

  -- The incantation for Abstract Factory
  -- Carving logic gates into the physical plane via Silicon Golemancy

  entity abstract_factory_pkg is
      Port ( clk : in STD_LOGIC;
             rst : in STD_LOGIC;
             aether_in : in STD_LOGIC_VECTOR (31 downto 0);
             aether_out : out STD_LOGIC_VECTOR (31 downto 0));
  end abstract_factory_pkg;

  architecture Physical of abstract_factory_pkg is
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

# The Abstract Factory Pattern in VHDL

Instantiates families of related components based on generics.

In the art of **Silicon Golemancy**, we do not merely execute instructions sequentially; we manifest logic directly into the physical substrate.
