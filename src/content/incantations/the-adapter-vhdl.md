---
title: Adapter
description: Wraps one bus interface to match another.
type: vhdl
gofPattern: Adapter
gofCategory: Structural
arcaneSchool: "Silicon Golemancy // Interface Transmuter"
formula: |2
  library IEEE;
  use IEEE.STD_LOGIC_1164.ALL;
  use IEEE.NUMERIC_STD.ALL;

  entity adapter_wrapper is
      Port ( clk : in STD_LOGIC;
             rst : in STD_LOGIC;
             aether_in : in STD_LOGIC_VECTOR (31 downto 0);
             aether_out : out STD_LOGIC_VECTOR (31 downto 0));
  end adapter_wrapper;

  architecture Physical of adapter_wrapper is
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
tags: [vhdl, structural, silicon-golemancy]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

# The Adapter Pattern in VHDL

Wraps one bus interface to match another.
