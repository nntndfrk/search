import {Component, OnInit} from '@angular/core';
import {FilmsService} from './films.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  filmsData: any;
  displayedFilmsData: any;
  isShowAlert = false;
  placeholder = 'Введите название фильма';
  searchString = '';

  constructor(private filmsService: FilmsService) {
  }

  ngOnInit() {
    this.filmsData = this.filmsService.getFilmsData();
    this.displayedFilmsData = [...this.filmsData];
  }

  displayDefault() {
    setTimeout(() => {
      this.displayedFilmsData = [...this.filmsData];
    }, 2000);
  }

  showAlert() {
    this.isShowAlert = true;
    setTimeout(() => {
      this.isShowAlert = false;
    }, 2000);
  }

  showTip() {
    this.placeholder = 'Введите название фильма (не менее 3х символов!)';
    setTimeout(() => {
      this.placeholder = 'Введите название фильма';
    }, 2000);
  }

  findByName() {
    if (this.searchString.length < 3) {
      if (this.searchString.length === 0
        && this.displayedFilmsData.length !== this.filmsData.length
      ) {
        this.displayDefault();
      }
      this.showTip();
      return;
    }

    /* Поиск по точному названию тут */
    this.displayedFilmsData = this.filmsData.filter(film => {
      return film.name.toLowerCase().indexOf(this.searchString.toLowerCase().trim()) === 0;
    });

    this.searchString = '';
    if (this.displayedFilmsData.length === 0) {
      this.showAlert();
      this.displayDefault();
    }
  }

  findByWord() {
    if (this.searchString.length < 3) {
      if (this.searchString.length === 0
        && this.displayedFilmsData.length !== this.filmsData.length
      ) {
        this.displayDefault();
      }
      this.showTip();
      return;
    }

    /* Поиск, если искомая подстрока входит в название тут */
    this.displayedFilmsData = this.filmsData.filter(film => {
      return film.name.toLowerCase().includes(this.searchString.toLowerCase().trim());
    });

    this.searchString = '';
    if (this.displayedFilmsData.length === 0) {
      this.showAlert();
      this.displayDefault();
    }
  }
}
