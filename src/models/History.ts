import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class HistoryClass {
  liked: any[] = [];
  unliked: any[] = [];
  unknowns: any[] = [];
  count_liked: number = 0;
  count_unliked: number = 0;
  count_unknowns: number = 0;

  constructor() {
    this.restoreFromLocal()
  }

  like(obj: any) {
    this.liked.push(obj);
    this.count_liked++
    this.saveToLocal()
  }
  unknown(obj: any) {
    this.unknowns.push(obj);
    this.count_unknowns++
    this.saveToLocal()
  }
  unlike(obj: any) {
    this.unliked.push(obj);
    this.count_unliked++
    this.saveToLocal()
  }
  saveToLocal() {
    let data = { liked: this.liked, unliked: this.unliked, unknowns:this.unknowns}
    localStorage.setItem('History', JSON.stringify(data))
  }
  find(id: number) {
    let index = this.liked.findIndex(m => m.id == id)
    if (index === -1) {
      index = this.unliked.findIndex(m => m.id == id)
    }
    if (index === -1) {
      index = this.unknowns.findIndex(m => m.id == id)
    }
    return index;
  }
  contain(id: number) {
    return this.find(id) !== -1;
  }

  restoreFromLocal() {
    let data = localStorage.getItem('History');
    if (data) {
      data = JSON.parse(data)
      this.liked = data['liked']
      this.unliked = data['unliked']
      this.unknowns = data['unknowns']
      this.count_liked = this.liked.length
      this.count_unliked = this.unliked.length
      this.count_unknowns = this.unknowns.length
    }
  }

  toJson() {
    let data = { liked: this.liked, unliked: this.unliked, unknowns: this.unknowns }
    return JSON.stringify(data)
  }
}

export var History = new HistoryClass();
