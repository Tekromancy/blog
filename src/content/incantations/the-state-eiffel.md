---
title: "The State Polymorph"
description: "Altering an entity's behavior when its internal form changes."
type: eiffel
gofPattern: State
gofCategory: Behavioral
arcaneSchool: "Transmutation // Polymorphism"
formula: |2
  deferred class
      SHAPESHIFTER_STATE

  feature
      attack
          deferred
          end
  end

  class
      WEREWOLF_STATE

  inherit
      SHAPESHIFTER_STATE

  feature
      attack
          do
              -- claw strike
          end
  end

  class
      DRUID

  feature
      form: SHAPESHIFTER_STATE

      strike
          require
              form_exists: form /= Void
          do
              form.attack
          end
  end
tags: [behavioral, state, eiffel]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---
The State pattern dictates that an entity acts based on its current polymorphed form, seamlessly shifting tactics without messy conditionals.
