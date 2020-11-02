import React from 'react';
import './Field.css'
import Button from 'react-bootstrap/Button';

class Field extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="field">
            <Button variant="outline-primary" onClick={() => this.props.onToggle()}
                disabled={this.props.disabled}>
                {this.props.field.isToggled ? this.props.field.value : '-'}
            </Button>
        </div>
    }
}

export default Field