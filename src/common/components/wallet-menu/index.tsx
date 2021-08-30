import React, {Component} from "react";

import {Link} from "react-router-dom";

import {Global} from "../../store/global/types";

import _c from "../../util/fix-class-names";

import {hiveSvg} from "../../img/svg";


interface Props {
    global: Global;
    username: string;
    active: string;
}

export default class WalletMenu extends Component<Props> {
    render() {
        const {global, username, active} = this.props;
        const logo = global.isElectron ? process.env.NODE_ENV === 'development' ? "../../common/img/logo-small-transparent.png" : "../../../../../../../common/img/logo-small-transparent.png" : require('../../img/logo-small-transparent.png');

        return (
            <div className="wallet-menu">
                <Link className={_c(`menu-item hive ${active === "hive" ? "active" : ""}`)} to={`/@${username}/wallet`}>
                    <span className="title">Hive</span>
                    <span className="sub-title">Wallet</span>
                    <span className="platform-logo">{hiveSvg}</span>
                </Link>
                {global.usePrivate && (
                    <Link className={_c(`menu-item ecency ${active === "ecency" ? "active" : ""}`)} to={`/@${username}/points`}>
                        <span className="title">Ecency</span>
                        <span className="sub-title">Points</span>
                        <span className="platform-logo"><img alt="ecency" src={logo}/></span>
                    </Link>
                )}
            </div>
        );
    }
}

