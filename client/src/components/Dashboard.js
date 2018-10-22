import React, { Component } from "react";
import { connect } from "react-redux";

class Dashboard extends Component {
  exportCSV(event,items) {
    event.preventDefault();
    let csvRow = [];
    let colName = [["Title", "Amount(USD)", "Item URL"]];

    items.forEach(item => {
      colName.push([
        item.title,
        item.sellingStatus.currentPrice.amount,
        item.viewItemURL
      ]);
    });

    colName.forEach(item => {
      csvRow.push(item.join(";"));
    });

    const cvsString = csvRow.join("%0A");

    const a = document.createElement("a");
    a.href = "data:attachment/csv," + cvsString;
    a.target = "_Blank";
    a.download = "result.csv";
    document.body.appendChild(a);
    a.click();
  }
  render() {
    let tableBody = <tbody />;
    if (this.props.items.data) {
      tableBody = this.props.items.items.map(item => {
        return (
          <tbody key={item.itemId}>
            <td>{item.title}</td>
            <td>{item.sellingStatus.currentPrice.amount}</td>
            <td>{item.viewItemURL}</td>
          </tbody>
        );
      });
    }
    let spinner = null;
    if (this.props.items.loading) {
      tableBody = (
        <div className="center">
          <div className="progress">
            <div className="indeterminate" />
          </div>
        </div>
      );
    }
    return (
      <div className="container">
        <form onSubmit={(event) => this.exportCSV(event,this.props.items.items)}>
          <button
            className="btn waves-effect waves-light left"
            style={{ marginTop: "15px" }}
            disabled={!this.props.items.data}
            type="submit"
            name="action"
          >
            Export CSV
          </button>
        </form>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Amount(USD)</th>
              <th>Item URL</th>
            </tr>
          </thead>
          {tableBody}
        </table>
        {spinner}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { items: state.items };
};
export default connect(mapStateToProps)(Dashboard);
