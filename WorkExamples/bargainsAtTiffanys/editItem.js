import React, { Component } from "react";
import axios from "axios";

class EditItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            newData: [],
        };
    }
    componentDidMount = (props) => {
        console.log("ID PROP: ", this.props.id);
        axios
            .get(`http://localhost:8080/users/edit/${this.props.id}`)
            .then((res) => {
                // console.log(res);
                res.data.datePurchased = res.data.datePurchased.split(" ")[0];
                res.data.dateSold
                    ? (res.data.dateSold = res.data.dateSold.split(" ")[0])
                    : (res.data.dateSold = null);
                this.setState({ newData: res.data });
                console.log(res.data);
                //This line of code will redirect you once the submission is succeed
            });
    };

    render() {
        let IsSold;
        if (this.state.newData.isSold === "Yes") {
            IsSold = (
                <select id="sold" name="isSold" required>
                    <option defaultValue="Yes" selected>
                        Yes
                    </option>
                    <option defaultValue="No">No</option>
                </select>
            );
        } else {
            IsSold = (
                <select id="sold" name="isSold" required>
                    <option defaultValue="Yes">Yes</option>
                    <option defaultValue="No" selected>
                        No
                    </option>
                </select>
            );
        }

        return (
            <div>
                <div className="container">
                    <a href="/dashboard">Cancel</a>
                    <form
                        action={`http://localhost:8080/users/edit/${this.props.id}`}
                        method="POST"
                        encType="multipart/form-data"
                    >
                        <div className="row">
                            <div className="col-25">
                                <label htmlFor="desc">Item Description</label>
                            </div>
                            <div className="col-75">
                                <input
                                    type="text"
                                    id="desc"
                                    name="itemDescription"
                                    defaultValue={
                                        this.state.newData.itemDescription
                                    }
                                    required
                                ></input>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-25">
                                <label htmlFor="dateP">Date Purchased</label>
                            </div>
                            <div className="col-75">
                                <input
                                    type="date"
                                    id="dateP"
                                    name="datePurchased"
                                    defaultValue={
                                        this.state.newData.datePurchased
                                    }
                                    required
                                ></input>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-25">
                                <label htmlFor="bought">
                                    What you bought it for
                                </label>
                            </div>
                            <div className="col-75">
                                <input
                                    type="text"
                                    inputMode="decimal"
                                    id="bought"
                                    name="buyingPrice"
                                    defaultValue={
                                        this.state.newData.buyingPrice
                                    }
                                    required
                                ></input>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-25">
                                <label htmlFor="sold">Is Sold?</label>
                            </div>
                            <div className="col-75">{IsSold}</div>
                        </div>

                        <div className="row">
                            <div className="col-25">
                                <label htmlFor="sellP">Selling Price</label>
                            </div>
                            <div className="col-75">
                                <input
                                    type="text"
                                    inputMode="decimal"
                                    id="sellP"
                                    name="sellingPrice"
                                    defaultValue={
                                        this.state.newData.sellingPrice
                                            ? this.state.newData.sellingPrice
                                            : ""
                                    }
                                ></input>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-25">
                                <label htmlFor="purch">Who Purchased?</label>
                            </div>
                            <div className="col-75">
                                <input
                                    type="text"
                                    id="purch"
                                    name="whoPurchased"
                                    defaultValue={
                                        this.state.newData.whoPurchased
                                            ? this.state.newData.whoPurchased
                                            : ""
                                    }
                                ></input>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-25">
                                <label htmlFor="dateS">Date Sold</label>
                            </div>
                            <div className="col-75">
                                <input
                                    type="date"
                                    id="dateS"
                                    name="dateSold"
                                    defaultValue={
                                        this.state.newData.dateSold
                                            ? this.state.newData.dateSold
                                            : undefined
                                    }
                                ></input>
                            </div>
                        </div>

                        <div className="row">
                            <img
                                alt="Current"
                                src={this.state.newData.image}
                                height="100px"
                            ></img>
                        </div>

                        <div className="row">
                            <input
                                type="hidden"
                                name="oldImage"
                                defaultValue={
                                    this.state.newData.image
                                        ? this.state.newData.image
                                        : undefined
                                }
                            ></input>
                        </div>

                        <div className="row">
                            <div className="col-25">
                                <label htmlFor="upload">Upload New Image</label>
                            </div>
                            <div className="col-75">
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                ></input>
                            </div>
                        </div>

                        <br></br>

                        <div className="row">
                            <input type="submit" defaultValue="Submit"></input>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default EditItem;
