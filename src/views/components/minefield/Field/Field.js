import React, { useEffect, useState } from 'react'
import './Field.css'
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBomb } from '@fortawesome/free-solid-svg-icons'

export default function Field(props) {
    const [buttonVariant, setButtonVariant] = useState('primary')

    useEffect(() => {
        let variant = props.isMarkingBomb ? 'secondary' : 'primary';
        if (props.field.isToggled)
            variant = `outline-${variant}`;

        setButtonVariant(variant)
    }, [props.isMarkingBomb, props.field.isToggled])

    const buttonValue = () => {
        if (props.field.isToggled)
            return props.field.value

        if (props.isMarkedAsBomb)
            return (<FontAwesomeIcon icon={faBomb} />)

        return '-'
    }

    return (
        <div className="field">
            <Button variant={buttonVariant}
                onClick={() => props.onToggle()}
                disabled={props.disabled}>
                {buttonValue()}
            </Button>
        </div>
    )
}