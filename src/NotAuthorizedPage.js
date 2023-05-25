import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

function NotAuthorizedPage({ classes, authContact }) {
    return (
        <>
            <div>
                You have not been authorized to view this page.
            </div>
            <div>
                {authContact && <div> Please contact {authContact.name || ''} {authContact.email && authContact.name ? `at ${authContact.email}` : authContact.email || ''} for access.
                </div>}
            </div>
        </>
    )
}

NotAuthorizedPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({ homeReducer }) => ({
    authContact: homeReducer.authContact
})

export default connect(
    mapStateToProps,
    undefined
)(NotAuthorizedPage)