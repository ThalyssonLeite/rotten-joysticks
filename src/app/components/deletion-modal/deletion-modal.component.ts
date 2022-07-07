import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { setChoosenCard, setDeletionModal } from 'src/app/data/app.actions';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'rojo-deletion-modal',
  templateUrl: './deletion-modal.component.html',
  styleUrls: ['./deletion-modal.component.scss']
})
export class DeletionModalComponent implements OnInit {
  visibility: boolean;
  loading: boolean = false;
  game: any;

  constructor(private apiService: APIService, private store: Store<{ deletionModal, card }>, private router: Router) { }

  ngOnInit(): void {
    this.store.select('deletionModal').subscribe(({ visible }) => {
      this.visibility = visible
    });

    this.store.select('card').subscribe(({ game }) => this.game = game);
  }

  delete () {
    this.loading = true;
    this.apiService.deleteGame(this.game._id).subscribe(res => {
      this.router.navigate(['']);
      this.close();
      setTimeout(() => this.loading = false, 400)
    })
  }

  close () {
    this.store.dispatch(setDeletionModal({ visible: false }));
  }
}
