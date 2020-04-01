import React from "react";

export default class AddCar extends React.Component {
  state = {
    make: "",
    model: "",
  };

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const inputName = target.name;

    this.setState({ [inputName]: value });
  }

  onSave(event) {
    event.preventDefault();
    fetch("/api/cars", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    })
      .then((response) => response.json())
      .then((newCar) => {
        this.props.onCarAdded(newCar);
        this.setState({ make: "", model: "" });
      });
  }

  render() {
    return (
      <React.Fragment>
        <form onSubmit={(event) => this.onSave(event)}>
          <div>
            <label>Make:</label>
            <select
              required
              value={this.state.make}
              name="make"
              onChange={(event) => this.handleInputChange(event)}
            >
              <option value="" disabled hidden>
                Please select one
              </option>
              <option value="ford">Ford</option>
              <option value="honda">Honda</option>
              <option value="skoda">Skoda</option>
              <option value="volvo">Volvo</option>
            </select>
          </div>
          <div>
            <label>Model:</label>
            <input
              value={this.state.model}
              required
              type="text"
              name="model"
              onChange={(event) => this.handleInputChange(event)}
            />
          </div>
          <button type="submit">Lisää</button>
        </form>
      </React.Fragment>
    );
  }
}
