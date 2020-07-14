import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown';
import faAngleUp from '@fortawesome/fontawesome-free-solid/faAngleUp';

const CollapseCheckbox = ({ initialState, title, list, handleFilters }) => {
    const [open, setOpen] = useState(false);
    const [checked, setChecked] = useState([]);

    useEffect(() => {
        initialState && setOpen(initialState);

        //eslint-disable-next-line
    }, []);

    const handleClick = () => {
        setOpen(!open);
    }

    const handleAngle = () =>
        open ? <FontAwesomeIcon icon={faAngleUp} className='icon' /> : <FontAwesomeIcon icon={faAngleDown} className='icon' />;

    const handleToggle = (id) => {
        const currentIndex = checked.indexOf(id);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(id);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
        handleFilters(newChecked);
    }

    const renderList = () => list ?
        list.map((item, i) =>
            <ListItem key={i}>
                <ListItemText
                    primary={item.name}
                />
                <ListItemSecondaryAction>
                    <Checkbox
                        color='primary'
                        onChange={() => handleToggle(item._id)}
                        checked={checked.indexOf(item._id) !== -1}
                    />
                </ListItemSecondaryAction>
            </ListItem>
        ) : null

    return (
        <div className='coll'>
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
                        {renderList()}
                    </List>
                </Collapse>
            </List>
        </div>
    );
}

export default CollapseCheckbox;
