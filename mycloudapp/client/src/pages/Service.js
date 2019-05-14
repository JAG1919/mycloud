import React, { Component } from 'react';
// import * as bootstrap from 'bootstrap';
import '../scss/service.scss';
// import "~bootstrap/scss/bootstrap";

class Slider extends Component {
    render() {
//  services 
    return (
        <div className="services">
        <div className="container">
                <h3 className="heading-agileinfo">Cloud Computing<span>We offer extensive cloud service to all the users</span></h3>
            
                <div className="services-top-grids">
                    <div className="col-md-4">
                        <div className="grid1">
                            <i className="fa fa-money" aria-hidden="true"></i>
                            <h4>Less Costs</h4>
                            <p>The services are free from capital expenditure. There are no huge costs of hardware in cloud computing. You just have to pay as you operate it and enjoy the model based on your subscription plan.</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="grid1">
                            <i className="fa fa-heartbeat" aria-hidden="true"></i>
                            <h4>24 X 7 Availability</h4>
                            <p>Most of the cloud providers are truly reliable in offering their services, with most of them maintaining an uptime of 99.9%. The workers can get onto the applications needed basically from anywhere. Some of the applications even function off-line.</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="grid1">
                            <i className="fa fa-cut" aria-hidden="true"></i>
                            <h4>Flexibility in Capacity</h4>
                            <p>It offers flexible facility which could be turned off, up or down as per the circumstances of the user. For instance, a promotion of sales is very popular, capacity can be immediately and quickly added to it for the avoidance of losing sales and crashing servers. When those sales are done, the capacity can also be shrunk for the reduction of costs. </p>
                        </div>
                    </div>
                    <div className="clearfix"></div>
                </div>
                <div className="services-bottom-grids">
                    <div className="col-md-4">
                        <div className="grid1">
                            <i className="fa fa-th" aria-hidden="true"></i>
                            <h4>All over Functioning</h4>
                            <p>Cloud computing offers yet another advantage of working from anywhere across the globe, as long as you have an internet connection. Even while using the critical cloud services that offer mobile apps, there is no limitation of the device used. </p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="grid1">
                            <i className="fa fa-user" aria-hidden="true"></i>
                            <h4>Enhanced Collaboration</h4>
                            <p>Cloud applications enhance collaboration by authorizing diverse groups of people virtually meet and exchange information with the help of shared storage. Such capability helps in improving the customer service and product development and also reducing the marketing time. </p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="grid1">
                            <i className="fa fa-folder-open" aria-hidden="true"></i>
                            <h4>Control on the Documents</h4>
                            <p>Before cloud came into being, workers needed to send files in and out as the email attachments for being worked on by a single user at one time ultimately ending up with a mess of contrary titles, formats, and file content. Moving to cloud computing has facilitated central file storage.</p>
                        </div>
                    </div>
                    <div className="clearfix"></div>
                </div>
            </div>
        </div>
    );
    }
}

export default Slider;