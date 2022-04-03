import { Component } from "react";
import EditItem from "../src/components/HandleItem/EditItem";

class PrintItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasSubmitted: false,
            userid: null,
        };
    }

    editRow(id, e) {
        e.preventDefault();
        this.setState({ hasSubmitted: true, userid: id });
    }

    deleteRow(id, e) {
        e.preventDefault();
    }

    render() {
        if (this.state.hasSubmitted) {
            console.log("TRUE", this.state.userid);
            return <EditItem id={this.state.userid} />;
        }
        return (
            <>
                <table border="1" id="customers">
                    <thead>
                        <tr>
                            <th>S.N</th>
                            <th>Item Description</th>
                            <th>Date Purchased</th>
                            <th>Buying Price</th>
                            <th>Is Sold</th>
                            <th>Selling Price</th>
                            <th>Who Purchased</th>
                            <th>Date Sold</th>
                            <th>Image</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>

                    {this.props.data.map((entry) => (
                        <tbody key={entry.id}>
                            <tr>
                                <td>{entry.id}</td>
                                <td>{entry.itemDescription}</td>
                                <td>{entry.datePurchased}</td>
                                {/* <td>{entry.buyingPrice.toFixed(2)}</td> */}
                                <td>{entry.buyingPrice}</td>
                                <td>{entry.isSold}</td>
                                <td>
                                    {entry.sellingPrice
                                        ? entry.sellingPrice.toFixed(2)
                                        : null}
                                </td>
                                <td>{entry.whoPurchased}</td>
                                <td>{entry.dateSold}</td>
                                {/* <td>{entry.image}</td> */}
                                <td>
                                    <img
                                        alt=""
                                        src={entry.image}
                                        height="100px"
                                    ></img>
                                </td>
                                <td>
                                    <form
                                        style={{ display: "inline" }}
                                        method="get"
                                        onClick={(e) =>
                                            this.editRow(entry.id, e)
                                        }
                                    >
                                        <button>Edit</button>
                                    </form>
                                </td>
                                <td>
                                    <form
                                        style={{ display: "inline" }}
                                        method="get"
                                        action={`http://localhost:8080/users/delete/${entry.id}`}
                                    >
                                        <button type="submit">DELETE</button>
                                    </form>
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </>
        );
    }
}

export default PrintItems;
