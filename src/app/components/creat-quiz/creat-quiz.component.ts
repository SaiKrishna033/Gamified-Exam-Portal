import { Component } from '@angular/core';

@Component({
  selector: 'app-creat-quiz',
  templateUrl: './creat-quiz.component.html',
  styleUrls: ['./creat-quiz.component.scss']
})
export class CreatQuizComponent {


  show =false;

  openModal(){
    this.show=true;
  }

  closemodal(){
    this.show=false;
  }





selectedFile: File | null = null;

onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.selectedFile = input.files[0];
  }
}

onDrop(event: DragEvent): void {
  event.preventDefault();
  this.handleFile(event.dataTransfer?.files || null);
}

handleFile(fileList: FileList | null): void {
  if (fileList && fileList.length > 0) {
    this.selectedFile = fileList[0];
  }
}

onDragOver(event: DragEvent): void {
  event.preventDefault();
  // Additional logic for drag over if needed
}

onDragLeave(event: DragEvent): void {
  event.preventDefault();
  // Additional logic for drag leave if needed
}



uploadFile(): void {
  if (this.selectedFile) {
    // Implement your file upload logic here
    console.log('Uploading file:', this.selectedFile);
    // Reset selectedFile after upload
    this.selectedFile = null;
  }
}




}
