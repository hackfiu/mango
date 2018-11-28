import qs from 'query-string';

const storeToken = ({ verify: { token } }) => localStorage.setItem('JWT', token);

const extractToken = props => {
    const { search } = props.location;
    const { token } = qs.parse(search);
    return token;
};

export default { storeToken, extractToken }