import React from "react";

export default class AddFruit extends React.Component {
    state = {
        type: "",
        name: ""
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const inputName = target.name;
    
        this.setState({[inputName]: value});
      }

    onSave(event) {
        event.preventDefault();
        fetch('/api/fruits', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then(response => response.json())
        .then(newFruit => {
            this.props.onFruitAdded(newFruit)
            this.setState({type: "", name: ""})
        });
    }

    render() {
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
                            <option value="" selected disabled hidden>Please select one</option>
                            <option value="apple">Omena</option>
                            <option value="pear">Päärynä</option>
                            <option value="orange">Appelsiini</option>
                        </select>
                    </div>
                    <div>
                        <label>Nimi:</label>
                        <input value={this.state.name} required type="text" name="name" onChange={(event) => this.handleInputChange(event)}/>
                    </div>
                    <button type="submit">Lisää</button>
                </form>
            </React.Fragment>
        );
    }
}