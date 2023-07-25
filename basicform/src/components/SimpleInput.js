import React, { useEffect } from "react";
import { useState, useRef } from "react";

const SimpleInput = (props) => {
	const nameInputRef = useRef();
	const [enteredName, setEnteredName] = useState("");

	const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
	// Here we are assuming the enteredname is valid at the intial stage which is not convincing.
	const [enteredNameTouched, setEnteredNameTouched] = useState(false);

	useEffect(() => {
		if (enteredNameIsValid) {
			console.log("Name Input is valid");
		}
	}, [enteredNameIsValid]);

	const nameInputChangeHandler = (event) => {
		setEnteredName(event.target.value);
		if (enteredName.trim() !== "") {
			setEnteredNameIsValid(true);
			return;
		}
	};

	const nameInputBlurHandler = (event) => {
		setEnteredNameTouched(true);
		if (enteredName.trim() === "") {
			// As soon as if the user start entering the value the error message should go.
			setEnteredNameIsValid(false);
			return;
		}
	};
	const formSubmissionHandler = (event) => {
		event.preventDefault();

		setEnteredNameTouched(true); // In form submission it is clear that the inputs are touched.

		if (enteredName.trim() === "") {
			setEnteredNameIsValid(false);
			return;
		}

		setEnteredNameIsValid(true);

		const enteredValue = nameInputRef.current.value;
		console.log(enteredValue);

		setEnteredName("");
	};

	const nameInputIsValid = !enteredNameIsValid && enteredNameTouched;

	const nameInputClasses = enteredNameIsValid ? "form-control" : "form-control invalid";

	return (
		<form onSubmit={formSubmissionHandler}>
			<div className={nameInputClasses}>
				<label htmlFor="name">Your Name</label>
				<input ref={nameInputRef} type="text" id="name" onChange={nameInputChangeHandler} onBlur={nameInputBlurHandler} value={enteredName} />
				{!enteredNameIsValid && <p className="error-text">Name is not valid</p>}
			</div>
			<div className="form-actions">
				<button>Submit</button>
			</div>
		</form>
	);
};

export default SimpleInput;
