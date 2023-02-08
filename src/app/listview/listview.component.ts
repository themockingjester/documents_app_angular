import { Component } from '@angular/core';
import axios from 'axios';
import { ListItem } from '../Utils/ListItem';

@Component({
  selector: 'app-listview',
  templateUrl: './listview.component.html',
  styleUrls: ['./listview.component.css']
})
export class ListviewComponent {
  products: ListItem[] = [];
  loading: boolean = false;
  toggleStatus = (id: number) => {
    this.loading = true
    axios.post(`http://localhost:4002/app/products/toggleActivity`, {
      productId: id
    }).then((response) => {
      alert(response.data.message);
      this.loading = false;
      if (response.data.success == true && response.data.code == 200) {
        window.location.reload()
      }
    }).catch((err) => {
      console.log(err)

      alert(`Something went wrong`)
      this.loading = false
    })
  }
  ngOnInit() {
    try {
      this.loading = true
      axios.get(`http://localhost:4002/app/products/getAllProducts`).then((response) => {
        if (response.data.success == true && response.data.code == 200) {
          this.loading = false;
          if (response.data.data.products.length == 0) {
            alert(`No data found`)
          }
          for (let i = 0; i < response.data.data.products.length; i++) {
            const element = response.data.data.products[i];
            // Replace the buffer array with base64 data
            this.products.push({
              name: response.data.data.products[i].name,
              price: response.data.data.products[i].price,
              sku: response.data.data.products[i].sku,
              desc: response.data.data.products[i].desc,
              images: response.data.data.products[i].images,
              status: response.data.data.products[i].status == 1 ? 'ACTIVE' : 'INACTIVE',
              id: response.data.data.products[i].id
            })
            console.log()
          }
        }
      }).catch((error) => {
        this.loading = false
        console.log(error.message, 5643, error)
      })
    } catch (e) {
      console.log(e)
      alert(`Something went wrong`)
      this.loading = false
    }
  }
}
