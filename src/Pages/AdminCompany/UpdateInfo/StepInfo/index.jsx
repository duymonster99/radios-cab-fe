import { Button, Popconfirm, Steps, theme } from 'antd';
import { useState } from 'react';
import FormEditProfile from './components/ProfileForm';
import ServiceType from './components/ServiceType';
import ServiceLocation from './components/ServiceLocation';
import Loading from '../../../../Helper/Loading';

const StepsInfoCompany = () => {
    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);
    const [stateBtn, setStateBtn] = useState('');
    const [loading, setLoading] = useState(false);
    const steps = [
        {
            title: 'Profile',
            content: (
                <FormEditProfile
                    stateBtn={stateBtn}
                    setStateBtn={setStateBtn}
                    current={current}
                    setCurrent={setCurrent}
                    setLoading={setLoading}
                />
            ),
        },
        {
            title: 'Services Type',
            content: (
                <ServiceType
                    stateBtn={stateBtn}
                    setStateBtn={setStateBtn}
                    current={current}
                    setCurrent={setCurrent}
                    setLoading={setLoading}
                />
            ),
        },
        {
            title: 'Services Location',
            content: <ServiceLocation stateBtn={stateBtn} setLoading={setLoading} />,
        },
    ];

    const done = () => {
        setStateBtn('done');
    };
    const cancel = (e) => {};
    const confirm = (e) => {
        setStateBtn('next');
    };
    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }));
    const contentStyle = {
        backgroundColor: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: `1px dashed ${token.colorBorder}`,
        marginTop: 16,
    };
    return (
        <div className="w-full p-[2rem_.75rem] mx-auto bg-white z-[100]">
            <Loading isLoading={loading}>
                <div className="w-[90%] p-[1rem_.75rem] mx-auto">
                    <Steps current={current} items={items} />
                    <div style={contentStyle}>{steps[current].content}</div>
                    <div
                        style={{
                            marginTop: 24,
                        }}
                    >
                        {current < steps.length - 1 && (
                            <Popconfirm
                                title="Update Steps"
                                description="Are you sure to update? You can't return this steps after click Submit?"
                                onConfirm={confirm}
                                onCancel={cancel}
                                okText="Submit"
                                cancelText="Cancel"
                            >
                                <Button type="primary">Next</Button>
                            </Popconfirm>
                        )}
                        {current === steps.length - 1 && (
                            <Popconfirm
                                title="Done Tasks"
                                description="Once you're done, you can access your account's admin page. There you can update your profile if needed. Are you sure you want to complete this?"
                                onConfirm={done}
                                onCancel={cancel}
                                okText="Done"
                                cancelText="Cancel"
                            >
                                <Button type="primary">
                                    Done
                                </Button>
                            </Popconfirm>
                        )}
                    </div>
                </div>
            </Loading>
        </div>
    );
};

export default StepsInfoCompany;
