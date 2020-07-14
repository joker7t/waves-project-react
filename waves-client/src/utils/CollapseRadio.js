import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown';
import faAngleUp from '@fortawesome/fontawesome-free-solid/faAngleUp';

const CollapseRadio = ({ initialState, title, list, handleFilters }) => {

    const [open, setOpen] = useState(false);
    const [checked, setChecked] = useState('0');

    useEffect(() => {
        initialState && setOpen(initialState);

        //eslint-disable-next-line
    }, []);

    const handleClick = () => {
        setOpen(!open);
    }

    const handleAngle = () =>
        open ? <FontAwesomeIcon icon={faAngleUp} className='icon' /> : <FontAwesomeIcon icon={faAngleDown} className='icon' />;

    const renderList = () => list ?
        list.map((item, i) =>
            <FormControlLabel
                key={i}
                value={`${item._id}`}
                control={<Radio />}
                label={item.name}
            />
        ) : null

    const handleChange = (e) => {
        setChecked(e.target.value);
        handleFilters(e.target.value);
    }

    return (
        <div>
            <List style={{ borderBottom: '1px solid #bdbdbd' }}>
                <ListItem onClick={handleClick} style={{ padding: '10px 23px 10px 0' }}>
                    <ListItemText
                        primary={title}
                        className='collapse_title'
                    />
                    {handleAngle()}
                </ListItem>
                <Collapse in={open} timeout='auto' unmountOnExit>
                    <List component='div' disablePadding>
                        <RadioGroup
                            aria-label='prices'
                            name='prices'
                            value={checked}
                            onChange={handleChange}
                        >
                            {renderList()}
                        </RadioGroup>
                    </List>
                </Collapse>
            </List>
        </div>
    );
}

export default CollapseRadio;
