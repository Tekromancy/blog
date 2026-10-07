---
title: The Primordial Decorator
description: Layering arcane wards over existing soul structures without altering their true nature.
type: c
gofPattern: Decorator
gofCategory: Structural
arcaneSchool: "Abjuration // Warding"
formula: |2
  #include <stdio.h>
  #include <stdlib.h>

  typedef struct Component Component;
  struct Component {
      void (*invoke)(Component* self);
  };

  // Base Spell
  void base_invoke(Component* self) {
      printf("Casting a raw bolt of energy");
  }
  
  Component* create_base_spell(void) {
      Component* c = malloc(sizeof(Component));
      c->invoke = base_invoke;
      return c;
  }

  // Decorator Wrapper
  typedef struct {
      Component base;
      Component* inner;
  } SpellDecorator;

  void frost_invoke(Component* self) {
      SpellDecorator* dec = (SpellDecorator*)self;
      dec->inner->invoke(dec->inner);
      printf("... now infused with biting frost!");
  }

  Component* add_frost_ward(Component* inner_spell) {
      SpellDecorator* dec = malloc(sizeof(SpellDecorator));
      dec->base.invoke = frost_invoke;
      dec->inner = inner_spell;
      return (Component*)dec;
  }

  int main() {
      Component* raw = create_base_spell();
      Component* frosted = add_frost_ward(raw);
      
      frosted->invoke(frosted);
      printf("\n");
      
      free(frosted);
      free(raw);
      return 0;
  }
tags: [c, structural, decorator, extending]
pubDate: 2026-10-07
author: Joshua Edward McLaughlin Cox
difficulty: Adept
---

When the core incantation must remain untouched, the Primordial Decorator weaves additional effects around the edges. By sharing the primary Component interface, decorators nest infinitely, passing execution flows deeper into the stack.
