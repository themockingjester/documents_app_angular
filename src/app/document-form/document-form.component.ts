import { Component } from '@angular/core';
import axios from 'axios';
@Component({
  selector: 'app-document-form',
  templateUrl: './document-form.component.html',
  styleUrls: ['./document-form.component.css']
})
export class DocumentFormComponent {
  currentImageNumber: number = 0;
  addImageComponent = () => {
    let imagesArea = document.getElementById("selectedImagesArea")
    let imageSelectContainer = document.createElement("div")
    let removeButton = document.createElement('button')
    removeButton.innerHTML = "Remove Image"
    removeButton.className = "btn btn-danger"

    removeButton.onclick = (e) => {
      let button = (<HTMLElement>(<HTMLElement>e.target).parentNode);
      button.parentNode?.removeChild(button)
    }
    let imageComp = document.createElement("input")
    imageComp.type = "file"
    imageComp.className = "images"
    imageComp.id = "imageNumber" + this.currentImageNumber
    imageSelectContainer.appendChild(imageComp)
    imageSelectContainer.appendChild(removeButton)
    imageSelectContainer.style.marginTop = "12px"
    imageSelectContainer.style.marginBottom = "12px"
    imagesArea?.appendChild(imageSelectContainer)
    this.currentImageNumber += 1
  }

  submit = () => {
    let dataForMedia = new FormData();
    const selectedImages = document.getElementsByClassName("images");
    for (let i = 0; i < selectedImages.length; i++) {
      const element = selectedImages[i];
      dataForMedia.append("images", (<HTMLInputElement>document.getElementById(`${element.id}`)).files[0])
    }

    dataForMedia.append("name", (<HTMLInputElement>document.getElementById(`productName`)).value)
    dataForMedia.append("price", (<HTMLInputElement>document.getElementById(`productPrice`)).value)
    dataForMedia.append("sku", (<HTMLInputElement>document.getElementById(`productSku`)).value)
    dataForMedia.append("desc", (<HTMLInputElement>document.getElementById(`productDesc`)).value)

    axios.put(`http://localhost:4002/app/products/addProduct`, dataForMedia, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
      alert(response.data.message);
    }).catch((error) => {
      console.log(error);
      alert(`Something went wrong`)
    })
  }
}
