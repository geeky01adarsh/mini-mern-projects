import React, { useState } from "react";
import Papa from "papaparse";

const allowedExtensions = ["csv"];

const App = () => {

	const [data, setData] = useState([]);

	const [error, setError] = useState("");

	const [file, setFile] = useState("");

	const handleFileChange = (e) => {
		setError("");

		if (e.target.files.length) {
			const inputFile = e.target.files[0];

			const fileExtension = inputFile?.type.split("/")[1];
			if (!allowedExtensions.includes(fileExtension)) {
				setError("Please input a csv file");
				return;
			}

			setFile(inputFile);
		}
	};
	const handleParse = () => {

		if (!file) return setError("Enter a valid file");

		const reader = new FileReader();

		reader.onload = async ({ target }) => {
			const csv = Papa.parse(target.result, { header: true });
			const parsedData = csv?.data;
      console.log(parsedData)
			const columns = Object.keys(parsedData[0]);
			setData(parsedData);
		};
		reader.readAsText(file);
	};

	return (
		<div>
			<label htmlFor="csvInput" style={{ display: "block" }}>
				Enter CSV File
			</label>
			<input
				onChange={handleFileChange}
				id="csvInput"
				name="file"
				type="File"
			/>
			<div>
				<button onClick={handleParse}>Parse</button>
			</div>
			<div style={{ marginTop: "3rem" }}>
				{error ? error : console.log(data)}
			</div>
		</div>
	);
};

export default App;
