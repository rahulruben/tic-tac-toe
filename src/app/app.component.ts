import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  board: string[] = [];
  currentPlayer!: string;
  winner!: string | null;

  ngOnInit() {
    this.resetBoard();
  }

  resetBoard() {
    this.board = Array(9).fill('');
    this.currentPlayer = 'X';
    this.winner = null;
  }

  makeMove(index: number) {
    if (this.board[index] || this.winner) return;
    this.board[index] = this.currentPlayer;
    if (this.checkWinner()) {
      this.winner = this.currentPlayer;
    } else {
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }
  }

  private checkWinner(): boolean {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 5],
      [3, 5, 6],
      [0, 4, 8],
      [2, 4, 6],
    ];
    const matched = winningCombinations.filter((combination: number[]) => {
      const [a, b, c] = combination;

      if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
        return true;
      } else {
        return false;
      }
    });
    return !!matched.length;
  }
}
