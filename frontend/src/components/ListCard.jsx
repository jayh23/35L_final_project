import React from 'react';

const ListCard = (props) => {
    const {title, description} = props.list;
    return(
        <>
        <div>
                <h1>{title}</h1>
                <div>{description}</div>
            </div>
        </>

    );
};

export default ListCard;
