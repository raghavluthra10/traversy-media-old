import React from 'react'
import UserItem from './UserItem'
import Spinner from '../layout/Spinner'
import PropTypes from 'prop-types'


const Users = ({ users, loading }) => {
    if(loading) {
        return <Spinner  />
    } else {

        return (
            <div style={userStyle}>
                {users.map(user => (
                    <UserItem user={user} key={user.id} />
                ) ) }
            </div>
        )
    }   
}

const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridgap: '1rem'
}

Users.prototype = {
    users: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
}

export default Users
