import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {

  private idLength: number
  private urlMap: Map<string, string>;

  longUrl: string;
  shortUrl: string;
  submitted: boolean;

  ngOnInit(): void {
    this.idLength = 5;
    this.submitted = false;
    this.urlMap = new Map<string, string>()
  }

  onSubmit() {
    this.shortUrl = 'minilink.com/' + this.generateHash(this.longUrl)
    this.submitted = true;
  }

  generateHash(str: string) {
    var hash = 0;
    if (str.length == 0)
        return hash;
    for (let i = 0; i < str.length; i++) {
        var charCode = str.charCodeAt(i);
        hash = ((hash << 7) - hash) + charCode;
        hash = hash & hash;
    }
    hash = hash & 0xffff;
    return hash.toString(36);
  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.shortUrl)
  }


}
