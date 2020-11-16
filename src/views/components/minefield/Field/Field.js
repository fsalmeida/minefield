import React from 'react';
import './Field.css'
import Button from 'react-bootstrap/Button';

export default function Field(props) {
    return (
        <div className="field">
            <Button variant={props.field.isToggled ? "outline-primary" : "primary"}
                onClick={() => props.onToggle()}
                disabled={props.disabled}>
                {props.field.isToggled ? props.field.value : '-'}
            </Button>
        </div>
    )
}