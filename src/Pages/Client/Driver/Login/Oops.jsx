import React from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';
const Page404 = () => (
    <Result
        status="404"
        title="404"
        subTitle="Sorry, your account is not activated yet. Please contact your company for more information."
        extra={<Link to="/company"><Button type="primary">Back Company</Button></Link>}
    />
);
export default Page404;
