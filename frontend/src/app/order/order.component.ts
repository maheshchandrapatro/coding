import { Component, OnInit } from '@angular/core';
import { OrdersService } from "../orderService/orders.service";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import * as _ from 'lodash';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orderDetails: any;
  closeResult: string;
  orderForm: FormGroup;
  submitted = false;
  orderData: any = {};
  orderObj: any = {};
  constructor(private orderservice: OrdersService, private modalService: NgbModal, private formBuilder: FormBuilder, private router: Router) {}
  ngOnInit() {
    this.orderData = {};
    this.getOrderDetails()
    this.buildFormGroup();
    if (localStorage.getItem('token') === null || undefined || '') {
      this.router.navigateByUrl('/login');
    }
  }
  open(content) {
    this.modalService.open(content, {}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  getOrderDetails() {
    this.orderservice.getOrderData().subscribe(res => {
      this.orderDetails = JSON.parse(res._body);
    })
  }
  get f(): any {
    return this.orderForm.controls;
  }
  newOrder() {
    this.submitted = true;
    if (this.orderForm.invalid) {
      return;
    }
    this.orderObj = this.orderForm.value
    this.orderservice.newOrder(this.orderObj).subscribe(res => {
      this.orderDetails = JSON.parse(res._body);
      // this.orderForm.reset();
      this.modalService.dismissAll();
      Swal.fire({
        title: 'Order created',
        type: 'success',
      }).then(isConfirm => {
        location.reload();
      });

    });
  }
  updateOrder(_id: any, content) {
    localStorage.setItem('id', _id);
    this.modalService.open(content, {}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    this.orderData = _.find(this.orderDetails, ['_id', _id])

  }
  edit(_id) {
    this.orderObj = this.orderForm.value
    this.orderObj._id = localStorage.getItem('id');
    this.orderservice.editOrder(this.orderObj).subscribe(res => {
      this.modalService.dismissAll();
      Swal.fire({
        title: 'Order editted',
        type: 'success',
      }).then(isConfirm => {
        location.reload();
      });
      this.getOrderDetails();
    })
  }
  deleteOrder(_id: any) {
    var obj = {
      _id: _id
    }
    Swal.fire({
      title: 'Are you sure?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then(result => {
      if (result.value) {
        this.orderservice.deleteOrder(obj).subscribe(res => {
          if (res) {
            Swal.fire({
              type: 'success',
              title: 'Order Deleted',
              confirmButtonText: 'OK'
            }).then(isConfirm => {
              this.getOrderDetails();
            });
          }
        });
      }
    });
  }
  logout() {
    localStorage.removeItem('token');
    location.reload();
  }
  clearForm() {
    this.orderForm.reset({
      'orderDueDate': '',
      'customerBuyerName': '',
      'customerAddress': '',
      'customerPhone': '',
      'orderTotal': ''
    });
  }
  buildFormGroup() {
    this.orderForm = new FormGroup({
      orderDueDate: new FormControl('', [Validators.required]),
      customerBuyerName: new FormControl('', [Validators.required]),
      customerAddress: new FormControl('', [Validators.required]),
      customerPhone: new FormControl('', [Validators.required, Validators.pattern('^[6-9][0-9]{9}$')]),
      orderTotal: new FormControl('', [Validators.required]),
    });
  }
  onCancel() {
    this.orderForm.reset();
    this.modalService.dismissAll();
  }

}
