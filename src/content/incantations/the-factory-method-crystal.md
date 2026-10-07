---
title: "The Factory Method: Spawning the Shards"
description: "Defining an interface for creating a gem shard, letting subclasses decide which type to instantiate."
type: "crystal"
gofPattern: "Factory Method"
gofCategory: "Creational"
arcaneSchool: "Conjuration // Shardmancy"
formula: |2
  abstract class Shard
    abstract def unleash_power
  end

  class FireShard < Shard
    def unleash_power
      puts "The Fire Shard erupts in a burst of compiled flames!"
    end
  end

  class FrostShard < Shard
    def unleash_power
      puts "The Frost Shard crystallizes the surrounding air."
    end
  end

  abstract class ShardCrafter
    abstract def forge_shard : Shard

    def invoke_shard
      shard = forge_shard
      puts "A shard has been forged from the æther."
      shard.unleash_power
    end
  end

  class Pyromancer < ShardCrafter
    def forge_shard : Shard
      FireShard.new
    end
  end

  class Cryomancer < ShardCrafter
    def forge_shard : Shard
      FrostShard.new
    end
  end

  pyro = Pyromancer.new
  pyro.invoke_shard

  cryo = Cryomancer.new
  cryo.invoke_shard
tags: ["creational", "factory-method", "crystal", "shards"]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Apprentice
---
By utilizing the Factory Method, a grand ShardCrafter defers the manifestation of specific elemental shards to its specialized subclasses. The Pyromancer calls forth Fire, the Cryomancer summons Frost, yet both invoke the shard through the same ancestral rite.
