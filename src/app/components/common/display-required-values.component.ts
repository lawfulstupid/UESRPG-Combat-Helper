import { Component, Input, OnInit } from "@angular/core";
import { RequiredValuesDialog } from "../../dialog/required-values/required-values.dialog";
import { Npc } from "../../model/character/npc";
import { Property } from "../../model/property/abstract/property";

@Component({ template: '' })
export abstract class DisplayRequiredValuesComponent implements OnInit {
  
  @Input()
  npc!: Npc;
  
  loaded: boolean = false;
  
  ngOnInit() {
    RequiredValuesDialog.requestValues(this.npc, ...this.requiredProperties()).subscribe({
      complete: () => {
        this.loaded = true;
      }
    });
    this.init();
  };
  
  protected abstract requiredProperties(): Array<Property<any>>;
  
  protected init() {}
  
}