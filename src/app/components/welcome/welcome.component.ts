import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  preserveWhitespaces: false,
  styleUrls: ['./welcome.component.css'],
  
  //The animations that are shown when entering the web portfolio
  animations: [
    trigger("entranceMessage", [
      state("left", style({
        transform: "translateX(-200%)"
      })),
      state("center", style({
        transform: "translateX(0)"
      })),
      transition("left => center", animate("2s ease")) 
    ]),
    trigger("rotate1", [
      state("initial", style({
        transform: "translateY(0)",
        opacity: "1"
      })),
      state("forward", style({
        transform: "translateY(-1000%)",
        opacity: "0"
      })),
      transition("initial => forward", animate("2s ease")) 
    ]),
    trigger("rotate2", [
      state("initial", style({
        position: "absolute",
        right: "5%",
        transform: "translateY(1000%)",
        opacity: "0"
      })),
      state("forward", style({
        position: "absolute",      
        right: "5%",
        bottom: "0",
        opacity: "1"
      })),
      transition("initial => forward", animate("2s ease")),
      transition("forward => initial", animate("2s ease"))
    ]),
    trigger("out", [
      state("initial", style({
        transform: "translateX(0)",
        opacity: "1"
      })),
      state("forward", style({
        transform: "translateX(-1000%)",
        opacity: "0"
      })),
      transition("initial => forward", animate("2s ease")) 
    ])
  ]
})
export class WelcomeComponent implements OnInit {
  
  mess :string = "left";
  item1 :string = "initial";
  item2 :string = "initial";
  bye :string = "initial";

  constructor(private router :Router) { }

  ngOnInit(): void {

    //Timers that drive animations
    setTimeout(() => {
      this.mess = "center";
    }, 100)

    setTimeout(() => {
      this.item1 = "forward";
      this.item2 = "forward";
    }, 2500)
  }

  //Function that triggers the splash screen exit animation
  goodBye() {

    this.bye = "forward";

    setTimeout(() => {
      this.router.navigate(["", "home"]);
    }, 200)
  }

}
