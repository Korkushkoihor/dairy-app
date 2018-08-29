export class CommentModel {
  text: string;
  color: string;

  constructor(_text: string) {
    this.text = _text;
    this.color = this.getRandomColor();
  }

  private getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
