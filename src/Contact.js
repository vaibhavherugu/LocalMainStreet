import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Contact.css";
import Component from "@reactions/component";
import "react-toastify/dist/ReactToastify.css";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      emailc: "",
      message: "",
      burger: "0",
      pointerEvents: "none",
      width: "30px",
    };
  }

  onClickHome = () => {
    this.props.history.push("/");
  };
  onClickShop = () => {
    this.props.history.push("/Shop");
  };
  onClickAbout = () => {
    this.props.history.push("/About");
  };
  onClickContact = () => {
    this.props.history.push("/Contact");
  };
  onClickLogin = () => {
    this.props.history.push("/login");
  };

  resetForm = () => {
    this.setState({ name: "", emailc: "", message: "" });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    toast.configure();

    if (
      this.state.name === "" ||
      this.state.emailc === "" ||
      this.state.message === ""
    ) {
      toast("Not all fields are filled in. Make sure to fill in every field.", {
        type: "error",
      });
      return;
    } else {
      const payload = {
        name: this.state.name,
        emailc: this.state.emailc,
        message: this.state.message,
      };

      axios
        .post("http://localhost:3003/app/contact/send", payload)
        .then((response) => {
          if (response.data.status === "success") {
            toast("Thank you very much for your feedback.", {
              type: "success",
            });
            this.resetForm();
          } else if (response.data.status === "fail") {
            toast(
              "Hmmmm, Something went wrong. Dont worry, its not you, its us. Please try again.",
              { type: "error" }
            );
          } else if (
            // prettier-ignore
            response.data === '"emailc" must be a valid email'
          ) {
          toast("Your email must be a valid email.", { type: "error" });
        }
          // prettier-ignore
          else if (
            // prettier-ignore
            response.data === '"message" length must be at least 6 characters long'
          ) {
            toast(
              "Your message is too short. It needs to be at least 6 characters.",
              { type: "error" }
            );
          }
        });
    }
  };

  render() {
    return (
      <div className="Contact">
        <div
          className="burger1"
          style={{
            height: "100%",
            opacity: this.state.burger,
            pointerEvents: this.state.pointerEvents,
          }}
        >
          <h3
            className="Hheading1b"
            style={{ fontSize: "20px" }}
            onClick={this.onClickHome}
          >
            <span>Home</span>
          </h3>
          <h3
            className="Hheading1b"
            style={{ fontSize: "20px" }}
            onClick={this.onClickShop}
          >
            <span>Shop</span>
          </h3>
          <h3
            className="Hheading1b"
            style={{ fontSize: "20px" }}
            onClick={this.onClickAbout}
          >
            <span>About</span>
          </h3>
          <h3
            className="Hheading1b"
            style={{ fontSize: "20px" }}
            onClick={this.onClickContact}
          >
            <span>Contact</span>
          </h3>
          <h3
            className="Hheading2b"
            style={{ fontSize: "20px" }}
            onClick={this.onClickLogin}
          >
            <span>Login</span>
          </h3>
        </div>
        <header className="Home-Header">
          <div className="HH">
            <div className="logoimg" onClick={this.onClickHome}>
              <img
                src={require("./Assets/golo.png")}
                className="logoimage"
                alt="localmainstreet"
              ></img>
            </div>
            <div className="logoimg2" onClick={this.onClickHome}>
              <img
                src={require("./Assets/logor.png")}
                className="logoimage2"
                alt="localmainstreet"
              ></img>
            </div>

            <div
              className="burgermenu"
              style={{
                zIndex: "493324",
              }}
              onClick={() => {
                this.setState({
                  burger: "1",
                  width: "30px",
                  pointerEvents: "all",
                });
                if (this.state.burger === "1") {
                  this.setState({
                    burger: "0",
                  });
                }
                if (this.state.pointerEvents === "all") {
                  this.setState({
                    pointerEvents: "none",
                  });
                }
              }}
            >
              <div
                className="bar"
                style={{
                  width: this.state.width,
                }}
              ></div>
              <div
                className="bar"
                style={{
                  width: this.state.width,
                }}
              ></div>
              <div
                className="bar"
                style={{
                  width: this.state.width,
                }}
              ></div>
            </div>

            <h3 className="Hheading1" onClick={this.onClickHome}>
              <span>Home</span>
            </h3>
            <h3 className="Hheading1" onClick={this.onClickShop}>
              <span>Shop</span>
            </h3>
            <h3 className="Hheading1" onClick={this.onClickAbout}>
              <span>About</span>
            </h3>
            <h3 className="Hheading1" onClick={this.onClickContact}>
              <span>Contact</span>
            </h3>
            <h3 className="Hheading2" onClick={this.onClickLogin}>
              <span>Login</span>
            </h3>
          </div>
        </header>

        <main className="mainC">
          <h1 className="titleC">Contact Us</h1>
          <br></br>
          <br></br>
          <br></br>
          <form className="formC">
            <input
              className="inputC"
              placeholder="NAME"
              rows="1"
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
            ></input>
            <input
              className="inputC"
              placeholder="EMAIL"
              rows="1"
              value={this.state.emailc}
              onChange={(e) => this.setState({ emailc: e.target.value })}
            ></input>
            <textarea
              className="inputC"
              placeholder="MESSAGE"
              rows="6"
              value={this.state.message}
              onChange={(e) => this.setState({ message: e.target.value })}
            ></textarea>

            <div className="ButtonsC">
              <button
                className="ButtonC"
                type="reset"
                onClick={() => {
                  this.setState({
                    name: "",
                    emailc: "",
                    message: "",
                  });
                }}
              >
                CANCEL
              </button>
              <button
                className="ButtonC"
                onClick={this.handleSubmit}
                type="submit"
              >
                SEND
              </button>
            </div>
          </form>
        </main>
      </div>
    );
  }
}

export default Contact;
