import React from "react";

export default class AddFruit extends React.Component {
  state = {
    type: "",
    name: "",
    image: null,
  };

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const inputName = target.name;

    this.setState({ [inputName]: value });
  }

  upload(file) {
    var formData = new FormData();
    formData.append("fruitImage", file);
    fetch("/api/fruits/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => this.setState({ image: data }))
      .catch((error) => console.log(error));
  }

  onSave(event) {
    event.preventDefault();
    fetch("/api/fruits", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    })
      .then((response) => response.json())
      .then((newFruit) => {
        this.props.onFruitAdded(newFruit);
        this.setState({ type: "", name: "", image: null });
      });
  }

  render() {
    console.log("IMAGE", this.state.image);
    return (
      <React.Fragment>
        <form onSubmit={(event) => this.onSave(event)}>
          <div>
            <label>Tyyppi:</label>
            <select
              required
              value={this.state.type}
              name="type"
              onChange={(event) => this.handleInputChange(event)}
            >
              <option value="" disabled hidden>
                Please select one
              </option>
              <option value="apple">Omena</option>
              <option value="pear">Päärynä</option>
              <option value="orange">Appelsiini</option>
            </select>
          </div>
          <div>
            <label>Nimi:</label>
            <input
              value={this.state.name}
              required
              type="text"
              name="name"
              onChange={(event) => this.handleInputChange(event)}
            />
          </div>
          <div>
            <label>Kuva:</label>
            {this.state.image?.path && (
              <img
                style={{ width: "100px", height: "100px" }}
                src={`/api/${this.state.image?.path}`}
              />
            )}
            <input
              type="file"
              onChange={(event) => this.upload(event.target.files[0])}
            />
          </div>
          <button type="submit">Lisää</button>
        </form>
      </React.Fragment>
    );
  }
}
