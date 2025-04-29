import React, { Component } from 'react';
import { getData } from '../assets/data';
// import '../assets/form.css';

class Form extends Component {
  list = [];

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      myfile: '',
      type_room: '',
      area: '',
      price: '',
      oldprice: ''
    };
    this.onChange = this.myChangeHandler.bind(this);
    this.onSubmit = this.saveLocalStorage.bind(this);
    this.handleMessage = this.handleMessage.bind(this);

    if (localStorage && localStorage.getItem('rooms')) {
      this.list = JSON.parse(localStorage.getItem('rooms'));
    } else {
      this.list = getData();
      localStorage.setItem('rooms', JSON.stringify(this.list));
    }
  }

  saveLocalStorage = (event) => {
    this.list.push(this.state);
    localStorage.setItem('rooms', JSON.stringify(this.list));
    this.setState({ id: "", name: "", myfile: "", type_room: "", area: "", price: "", oldprice: "" });
    event.preventDefault();
  };

  myChangeHandler = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    if (name === 'myfile') {
      const file = event.target.files[0];
      if (file) {
        value = URL.createObjectURL(file); // Tạo URL cho ảnh
      }
    }
    this.setState({ [name]: value });
  };

  handleMessage(event) {
    alert('Thanks for your order!');
    event.preventDefault();
  }

  // Phương thức xóa phòng
  deleteRoom = (index) => {
    this.list.splice(index, 1); // Xóa phần tử khỏi mảng
    localStorage.setItem('rooms', JSON.stringify(this.list)); // Cập nhật lại localStorage
    this.setState({}); // Cập nhật state để render lại
  };

render() {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Add Room</h2>

      {/* Form trong Card */}
      <div className="card mb-5 shadow">
        <div className="card-body">
          <form onSubmit={this.saveLocalStorage}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Enter your name:</label>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  value={this.state.name}
                  placeholder="Enter room name"
                  onChange={this.myChangeHandler}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Enter Image:</label>
                <input
                  type="file"
                  name="myfile"
                  className="form-control"
                  onChange={this.myChangeHandler}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Enter Type Room:</label>
                <input
                  className="form-control"
                  type="text"
                  name="type_room"
                  value={this.state.type_room}
                  placeholder="Enter type of room"
                  onChange={this.myChangeHandler}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Enter Area:</label>
                <input
                  className="form-control"
                  type="text"
                  name="area"
                  value={this.state.area}
                  placeholder="Enter area"
                  onChange={this.myChangeHandler}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Enter Price:</label>
                <input
                  className="form-control"
                  type="text"
                  name="price"
                  value={this.state.price}
                  placeholder="Enter price"
                  onChange={this.myChangeHandler}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Enter Old Price:</label>
                <input
                  className="form-control"
                  type="text"
                  name="oldprice"
                  value={this.state.oldprice}
                  placeholder="Enter old price"
                  onChange={this.myChangeHandler}
                />
              </div>

              <div className="col-12 d-flex justify-content-between mt-3">
                <button type="submit" className="btn btn-primary">Add</button>
                <button type="button" onClick={this.handleMessage} className="btn btn-success">Đặt Phòng</button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Room List trong Card */}
      <h3 className="text-center mb-4">Room List</h3>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {this.list.map((item, index) => (
          <div className="col" key={index}>
            <div className="card h-100 shadow">
              <img
                src={item.myfile}
                className="card-img-top"
                alt={item.name}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">
                  <strong>Type:</strong> {item.type_room} <br />
                  <strong>Area:</strong> {item.area} <br />
                  <strong>Price:</strong> ${item.price} <br />
                  <strong>Old Price:</strong> <del>${item.oldprice}</del>
                </p>
              </div>
              <div className="card-footer bg-transparent border-top-0">
                <button 
                  className="btn btn-danger w-100"
                  onClick={() => this.deleteRoom(index)}
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

}

export default Form;
