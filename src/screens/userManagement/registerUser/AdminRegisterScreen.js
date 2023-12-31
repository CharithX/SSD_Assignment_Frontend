import React, { useState } from "react";
import MainScreen from "../../../components/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { adminRegister } from "../../../actions/userManagementActions/adminActions";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom";
import { ADMIN_REGISTER_AFTER_SUCCESS } from "../../../constants/userManagementConstants/adminConstants";

function AdminRegisterScreen() {
	const [name, setName] = useState("");
	const [telephone, setTelephone] = useState("");
	const [address, setAddress] = useState("");
	const [email, setEmail] = useState("");
	const [pic, setPic] = useState("https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg");
	const [password, setPassword] = useState("");
	const [confirmpassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState(null);
	const [picMessage, setPicMessage] = useState(null);

	const dispatch = useDispatch();

	const adminRegistration = useSelector((state) => state.adminRegistration);
	const { loading, error, success } = adminRegistration;

	const history = useHistory();

	const resetHandler = () => {
		setName("");
		setTelephone("");
		setAddress("");
		setEmail("");
		setPassword("");
		setConfirmPassword("");
		setMessage(null);
		setPic("https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg");
		setPicMessage(null);
	};

	const demoHandler = () => {
		setName("Dwight Shrute");
		setTelephone("0715689562");
		setAddress("Colombo");
		setEmail("dwightshrute@gmail.com");
		setPassword("test");
		setConfirmPassword("test");
	};

	const submitHandler = async (e) => {
		e.preventDefault();

		if (!name || !telephone || !address || !email || !password || !pic) return;
		if (password !== confirmpassword) {
			setMessage("Passwords do not match");
		} else {
			dispatch(await adminRegister(name, telephone, address, email, password, pic));
			await dispatch({ type: ADMIN_REGISTER_AFTER_SUCCESS, payload: null });
			resetHandler();
		}
	};

	const postDetails = (pics) => {
		if (pics === "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg") {
			return setPicMessage("Please Select an Image");
		}
		setPicMessage(null);
		if (pics.type === "image/jpeg" || pics.type === "image/png" || pics.type === "image/jpg") {
			const data = new FormData();
			data.append("file", pics);
			data.append("upload_preset", "HolaHolidaysAdminProfile");
			data.append("cloud_name", "dfmnpw0yp");
			fetch("https://api.cloudinary.com/v1_1/dfmnpw0yp/image/upload", {
				method: "post",
				body: data,
			})
				.then((res) => res.json())
				.then((data) => {
					setPic(data.url.toString());
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			return setPicMessage("Please Select an Image");
		}
	};

	return (
		<div className="registerBg">
			<br></br>
			<MainScreen title="REGISTER - ADMIN">
				<Link to="/admin">
					<Button
						variant="success"
						style={{
							float: "left",
							marginTop: 5,
							fontSize: 15,
						}}
					>
						{" "}
						Back to Dashboard
					</Button>
				</Link>
				<br></br>
				<br></br>
				<Card
					className="profileCont"
					style={{
						borderRadius: 45,
						borderWidth: 2.0,
						marginTop: 20,
						paddingInline: 10,
						paddingLeft: 25,
						paddingRight: 25,
						background: "rgba(231, 238, 238, 0.9)",
					}}
				>
					<div className="loginContainer">
						<br></br>
						<div>
							{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
							{message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
							{loading && <Loading />}
							{success &&
								setTimeout(function () {
									history.push("/admin-login");
								}, 2000)}
						</div>
						<br></br>
						<Row className="AdminProfileContainer">
							<Col md={6}>
								<Form onSubmit={submitHandler}>
									<Form.Group controlId="adminFirstName">
										<Form.Label style={{ fontWeight: "bold", fontStyle: "italic" }}>Name</Form.Label>
										<Form.Control
											type="name"
											value={name}
											placeholder="Enter your name"
											onChange={(e) => setName(e.target.value)}
											required
										/>
									</Form.Group>
									<br></br>
									<Form.Group controlId="adminFormBasicTelephone">
										<Form.Label style={{ fontWeight: "bold", fontStyle: "italic" }}>Telephone</Form.Label>
										<Form.Control
											type="text"
											value={telephone}
											placeholder="Enter Telephone Number With Country Code"
											onChange={(e) => setTelephone(e.target.value)}
											required
										/>
									</Form.Group>
									<br></br>
									<Form.Group controlId="adminFormBasicAddress">
										<Form.Label style={{ fontWeight: "bold", fontStyle: "italic" }}>Address</Form.Label>
										<textarea
											style={{
												width: "100%",
												fontSize: "16px",
												borderRadius: "5px",
												padding: "5px",
												border: "none",
											}}
											value={address}
											onChange={(e) => setAddress(e.target.value)}
											placeholder="Enter your address"
											required
											rows={2}
										/>
									</Form.Group>
									<br></br>
									<Form.Group controlId="adminFormBasicEmail">
										<Form.Label style={{ fontWeight: "bold", fontStyle: "italic" }}>Email</Form.Label>
										<Form.Control
											type="email"
											value={email}
											placeholder="Enter  your email address"
											onChange={(e) => setEmail(e.target.value)}
											required
										/>
									</Form.Group>
									<br></br>
									<Form.Group controlId="formBasicPassword">
										<Form.Label style={{ fontWeight: "bold", fontStyle: "italic" }}>Password</Form.Label>
										<Form.Control
											type="password"
											value={password}
											placeholder="Password"
											onChange={(e) => setPassword(e.target.value)}
											required
										/>
									</Form.Group>
									<br></br>
									<Form.Group controlId="confirmPassword">
										<Form.Label style={{ fontWeight: "bold", fontStyle: "italic" }}>Confirm Password</Form.Label>
										<Form.Control
											type="password"
											value={confirmpassword}
											placeholder="Confirm Password"
											onChange={(e) => setConfirmPassword(e.target.value)}
											required
										/>
									</Form.Group>
									<br></br>
									{picMessage && <ErrorMessage variant="danger">{picMessage}</ErrorMessage>}
									<Form.Group controlId="pic">
										<Form.Label style={{ fontWeight: "bold", fontStyle: "italic" }}>Profile Picture</Form.Label>
										&emsp;
										<input
											type="file"
											accept="image/*"
											id="admin-pic"
											onChange={(e) => postDetails(e.target.files[0])}
										/>
									</Form.Group>
									<br></br>
									<Button
										variant="primary"
										type="submit"
										style={{
											fontSize: 15,
											marginTop: 10,
										}}
									>
										Register
									</Button>
									&emsp;
									<Button
										variant="danger"
										onClick={resetHandler}
										style={{
											fontSize: 15,
											marginTop: 10,
										}}
									>
										Reset
									</Button>
									&emsp;
									<Button
										variant="info"
										onClick={demoHandler}
										style={{
											fontSize: 15,
											marginTop: 10,
										}}
									>
										Demo
									</Button>
								</Form>
							</Col>
							<Col
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<img
									src={pic}
									alt={name}
									className="sitePic"
									style={{
										boxShadow: "7px 7px 20px ",
										borderColor: "black",
										borderRadius: 25,
										background: "white",
										margin: "15px",
										width: "300px",
										height: "300px",
									}}
								/>
							</Col>
						</Row>
					</div>
					<br></br>
				</Card>
				<br></br>
			</MainScreen>
		</div>
	);
}

export default AdminRegisterScreen;
