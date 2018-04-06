import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class HistoryClass {
  liked: any[] = [];
  unliked: any[] = [];
  count_liked: number = 0;
  count_unliked: number = 0;

  constructor() {
    this.restoreFromLocal()
  }

  like(obj: any) {
    this.liked.push(obj);
    this.count_liked++
    this.saveToLocal()
  }
  unlike(obj: any) {
    this.unliked.push(obj);
    this.count_unliked++
    this.saveToLocal()
  }
  saveToLocal() {
    let data = { liked: this.liked, unliked: this.unliked }
    localStorage.setItem('History', JSON.stringify(data))
  }
  restoreFromLocal() {
    let data = localStorage.getItem('History');
    if (data) {
      data = JSON.parse(data)
      this.liked = data['liked']
      this.unliked = data['unliked']
      this.count_liked = this.liked.length
      this.count_unliked = this.unliked.length
    }
  }

  toJson() {
    let data = { liked: this.liked, unliked: this.unliked }
    return JSON.stringify(data)
  }
}

export var History = new HistoryClass();
