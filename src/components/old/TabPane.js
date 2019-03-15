import React, { Component } from 'react';
import { Tabs } from "antd";
import moment from 'moment';

const TabPane = Tabs.TabPane;

class AntTabPane extends Component {
    render() {
        console.log('tabs: ', this.props);
        return (
            <TabPane tab="Дэлгэрэнгүй мэдээлэл" key="1">
                <table className="table">
                    <tbody>
                        <tr>
                            <td width='250'>
                                <b>Сурагчийн овог:</b>
                            </td>
                            <td>{this.props.lastName}</td>
                        </tr>
                        <tr>
                            <td width='250'>
                                <b>Сурагчийн нэр:</b>
                            </td>
                            <td>
                                {this.props.firstName}
                            </td>
                        </tr>
                        <tr>
                            <td width='250'>
                                <b>Утасны дугаар:</b>
                            </td>
                            <td>
                                {
                                    this.props.phone
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Регистерийн дугаар:</b>
                            </td>
                            <td>
                                <span>
                                    {this.props.registrationNumber}
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Идэвхитэй эсэх:</b>
                            </td>
                            <td>{this.props.status}</td>
                        </tr>
                        <tr>
                            <td>
                                <b>Үүсгэсэн огноо:</b>
                            </td>
                            <td>{moment(this.props.createdAt).format('YYYY-MM-DD hh:mm:ss')}</td>
                        </tr>
                    </tbody>
                </table>

            </TabPane>
        );
    }
}

export default AntTabPane;
