import React from 'react';
import Strings from '../../utils/strings';
import { toast } from 'react-toastify';
import * as Styles from './styles';

const getIconType = (type) => {
    if (type === "ERROR" || type === "WARNING") return "icon moon-warning"
    //if (type === "SUCCESS") return "icon moon-checkmark"
}

const Toast = (props) => (
    <div>
        <Styles.CardIcon>
            <span className={getIconType(props.type)}>
                <div style={{ paddingLeft: '10px', display: 'inline', fontSize: '16px', verticalAlign: "middle" }}>{props.msg}</div>
            </span>
        </Styles.CardIcon>
    </div>
)

export const showToast = (type, msg) => {
    switch (type) {
        case 'SUCCESS':
            toast.success(<Toast type={type} msg={msg || Strings.toast.success} />);
            break;
        case 'ERROR':
            toast.error(<Toast type={type} msg={msg || Strings.toast.error} />);
            break;
        case 'WARNING':
            toast.warning(<Toast type={type} msg={msg || Strings.toast.warning} />);
            break;
        default:
            toast(msg || Strings.toast.default);
    }
}
