import React, { useEffect, useState } from 'react';
import {Item, Button, Label, Icon, Divider} from 'semantic-ui-react';

function JobItem(props){
    const{ appliedUsers, comments, date, description, price, status, title, _id } = props.item;
    // console.log(appliedUsers, comments, date, description, price, status, title, _id);
    console.log(props);
    return(
        <>
            <Item>
            <Item.Image size='small' src={props.img} />

            <Item.Content verticalAlign='middle'>
                <Item.Header>{title}</Item.Header>
                <Item.Description>{description}</Item.Description>
                <Item.Meta>
                    <Label> <Icon name="time" /> {date}</Label>
                    <Label> ${price}</Label>
                    <Label> <Icon name="user circle outline" /> Total Applications: {appliedUsers.length}</Label>
                </Item.Meta>
                <Item.Extra>
                    <div>{appliedUsers}</div>
                    <Button floated='right'>Action</Button>
                </Item.Extra>
            </Item.Content>
            </Item>
            <Divider clearing />
        </>
    )

}
export default JobItem;
