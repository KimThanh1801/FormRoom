import React, { Component } from 'react';
import { getData } from '../assets/data';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      myfile: '',
      type_room: '',
      area: '',
      price: '',
      oldprice: '',
      list: []
    };
  }

  componentDidMount() {   /*Nó chỉ chạy một lần */
    const rooms = localStorage.getItem('rooms');
    if (rooms) {
      this.setState({ list: JSON.parse(rooms) });
    } else {
      const data = getData();
      localStorage.setItem('rooms', JSON.stringify(data));
      this.setState({ list: data });
    }
  }

  handleChange = (event) => {
    const { name, value, files } = event.target;

    if (name === 'myfile' && files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.setState({ myfile: reader.result }); 
      };
      reader.readAsDataURL(files[0]);
    } else {
      this.setState({ [name]: value });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { id, name, myfile, type_room, area, price, oldprice, list } = this.state;
    const newRoom = { id, name, myfile, type_room, area, price, oldprice };
    const updatedList = [...list, newRoom];

    this.setState({
      list: updatedList,
      id: '',
      name: '',
      myfile: '',
      type_room: '',
      area: '',
      price: '',
      oldprice: ''
    }, () => {
      localStorage.setItem('rooms', JSON.stringify(this.state.list));
    });
  };

  handleDelete = (index) => {
    const updatedList = [...this.state.list];
    updatedList.splice(index, 1);
    this.setState({ list: updatedList }, () => {
      localStorage.setItem('rooms', JSON.stringify(this.state.list));
    });
  };

  handleOrderMessage = (event) => {
    event.preventDefault();
    alert('Thanks for your order!');
  };

  formatPrice = (price) => {
    return new Intl.NumberFormat().format(price);
  };

  render() {
    return (
      <div className="container my-5">
        <h2 className="text-center mb-4">Add Room</h2>

        {/* Form */}
        <div className="card mb-5 shadow-sm">
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label">Room Name:</label>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    value={this.state.name}
                    placeholder="Enter room name"
                    onChange={this.handleChange}
                    required
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Image:</label>
                  <input
                    type="file"
                    name="myfile"
                    className="form-control"
                    onChange={this.handleChange}
                    accept="image/*"
                    required
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Type of Room:</label>
                  <input
                    className="form-control"
                    type="text"
                    name="type_room"
                    value={this.state.type_room}
                    placeholder="Enter type of room"
                    onChange={this.handleChange}
                    required
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Area:</label>
                  <input
                    className="form-control"
                    type="text"
                    name="area"
                    value={this.state.area}
                    placeholder="Enter area"
                    onChange={this.handleChange}
                    required
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Price:</label>
                  <input
                    className="form-control"
                    type="text"
                    name="price"
                    value={this.state.price}
                    placeholder="Enter price"
                    onChange={this.handleChange}
                    required
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Old Price:</label>
                  <input
                    className="form-control"
                    type="text"
                    name="oldprice"
                    value={this.state.oldprice}
                    placeholder="Enter old price"
                    onChange={this.handleChange}
                    required
                  />
                </div>

                <div className="col-12 d-flex justify-content-between mt-3">
                  <button type="submit" className="btn btn-primary">Show</button>
                  <button type="button" onClick={this.handleOrderMessage} className="btn btn-success">Save</button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Room List */}
        <h3 className="text-center mb-4">Room List</h3>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {this.state.list.map((item, index) => (
            <div className="col mt-4" key={index}>
              <div className="card h-100 shadow-sm">
                <img
                  src={item.myfile}
                  className="card-img-top"
                  alt={item.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title text-center">{item.name}</h5>
                  <p className="card-text">
                    <strong>Type:</strong> {item.type_room} <br />
                    <strong>Area:</strong> {item.area} <br />
                    <strong>Price:</strong> ${this.formatPrice(item.price)} <br />
                    <strong>Old Price:</strong> <del>${this.formatPrice(item.oldprice)}</del>
                  </p>
                </div>
                <div className="card-footer bg-transparent border-top-0">
                  <button
                    className="btn btn-danger w-100"
                    onClick={() => this.handleDelete(index)}
                  >
                    Delete
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
