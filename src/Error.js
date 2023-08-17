import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

function Error() {
    const { classes, errorContact, cookies } = this.props;
    ////console.log(cookies);
    const tokenNumber = cookies === undefined ? "" : cookies.get('tokenNumber');

    return (
        <>
            <div>
                It looks like there is a problem with the page.
            </div>
            <div>
                {errorContact && <div>
                    If the problem persists, please contact {errorContact.name || ''} {errorContact.email && errorContact.name ? `at ${errorContact.email}` : errorContact.email || ''} for help.
                </div>}
                <div>{tokenNumber}</div>
            </div>

        </>
    )
}

Error.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({ landingReducer }) => ({
    errorContact: landingReducer.errorContact
})

export default connect(
    mapStateToProps,
    undefined
)(Error)